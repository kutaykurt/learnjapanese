import React, { useEffect, useState } from "react";
import { fetchJapaneseData } from "../../../fetch";
import { useDispatch, useSelector } from "react-redux";
import {
  addVocabulary,
  removeVocabulary,
} from "../../../redux/vocabularySlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ITEMS_PER_PAGE = 30;

const HiraganaAlphabet = () => {
  const [japaneseData, setJapaneseData] = useState({ hiraganaAlphabet: [] });
  const [currentPageAlphabet, setCurrentPageAlphabet] = useState(1);
  const [selectedHiraganaItem, setSelectedHiraganaItem] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const hiraganaVocabularyList = useSelector(
    (state) => state.vocabulary.hiraganaVocabularyList
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function getJapaneseData() {
      try {
        const data = await fetchJapaneseData();
        setJapaneseData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getJapaneseData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRowClick = (item) => {
    setSelectedHiraganaItem(item);
    if (windowWidth <= 480) {
      setModalShow(true);
    }
  };

  const handleSelectVocabulary = (item) => {
    dispatch(addVocabulary({ newVocabulary: item, scriptType: "hiragana" }));
  };

  const handleModalButtonClick = () => {
    if (
      !hiraganaVocabularyList.some(
        (vocab) => vocab.id === selectedHiraganaItem.id
      )
    ) {
      dispatch(
        addVocabulary({
          newVocabulary: selectedHiraganaItem,
          scriptType: "hiragana",
        })
      );
    } else {
      dispatch(
        removeVocabulary({
          id: selectedHiraganaItem.id,
          scriptType: "hiragana",
        })
      );
    }
    setModalShow(false);
  };

  const renderAlphabetForPage = () => {
    const startIndex = (currentPageAlphabet - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return japaneseData.hiraganaAlphabet
      .slice(startIndex, endIndex)
      .map((item, index) => (
        <tr
          key={index}
          className={`list-items-container equal-column-width ${
            hiraganaVocabularyList.some((vocab) => vocab.id === item.id)
              ? "selected"
              : ""
          }`}
          onClick={() => handleRowClick(item)}
        >
          <td className="td">{item.character}</td>
          <td className="td">{item.pronunciation}</td>
          <td className="td">{item.translation}</td>
          {windowWidth >= 480 && (
            <button
              onClick={() => handleSelectVocabulary(item)}
              className={`add-button ${
                hiraganaVocabularyList.some((vocab) => vocab.id === item.id)
                  ? "selected"
                  : ""
              }`}
            >
              {hiraganaVocabularyList.some((vocab) => vocab.id === item.id)
                ? "X"
                : "Add to Vocabulary"}
            </button>
          )}
        </tr>
      ));
  };

  const handlePrevPageAlphabet = () => {
    if (currentPageAlphabet > 1) {
      setCurrentPageAlphabet(currentPageAlphabet - 1);
    }
  };

  const handleNextPageAlphabet = () => {
    const totalPagesAlphabet = Math.ceil(
      japaneseData.hiraganaAlphabet.length / ITEMS_PER_PAGE
    );
    if (currentPageAlphabet < totalPagesAlphabet) {
      setCurrentPageAlphabet(currentPageAlphabet + 1);
    }
  };

  const totalPagesAlphabet = Math.ceil(
    japaneseData.hiraganaAlphabet.length / ITEMS_PER_PAGE
  );

  const paginationButtonAlphabet = (
    <div className="pagination">
      <button
        onClick={handlePrevPageAlphabet}
        disabled={currentPageAlphabet === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPageAlphabet} of {totalPagesAlphabet}
      </span>
      <button
        onClick={handleNextPageAlphabet}
        disabled={currentPageAlphabet === totalPagesAlphabet}
      >
        Next
      </button>
    </div>
  );

  return (
    <div>
      <table className="my-table">
        <tbody>
          <tr className="tr">
            <th className="th">Hiragana</th>
            <th className="th">Pronunciation</th>
            <th className="th">Translation</th>
          </tr>
          {renderAlphabetForPage()}
        </tbody>
      </table>

      {/** Modal für Bildschirmbreite <= 480px */}
      {selectedHiraganaItem && windowWidth <= 480 && (
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          centered
        >
          <Modal.Header>
            <Modal.Title>
              <p>{selectedHiraganaItem.character}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedHiraganaItem.pronunciation}</p>
            <p>{selectedHiraganaItem.translation}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleModalButtonClick}>
              {hiraganaVocabularyList.some(
                (vocab) => vocab.id === selectedHiraganaItem.id
              )
                ? "Remove"
                : "Add to Vocabulary"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {paginationButtonAlphabet}
    </div>
  );
};

export default HiraganaAlphabet;
