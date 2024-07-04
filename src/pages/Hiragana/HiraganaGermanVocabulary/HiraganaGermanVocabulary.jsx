import React, { useEffect, useState } from "react";
import { fetchJapaneseData } from "../../../fetch";
import { useDispatch, useSelector } from "react-redux";
import {
  addVocabulary,
} from "../../../redux/vocabularySlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ITEMS_PER_PAGE = 30;

const HiraganaGermanVocabulary = () => {
  const [japaneseData, setJapaneseData] = useState({ vocabulary: [] });
  const [currentPageVocabularyGerman, setCurrentPageVocabularyGerman] =
    useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
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
    setSelectedItem(item);
    if (windowWidth <= 480) {
      setModalShow(true);
    }
  };

  const handleSelectVocabulary = (item, german) => {
    const vocabularyToAdd = {
      japaneseHiragana: item.japaneseHiragana,
      pronunciation: item.pronunciation,
      translation: {
        german: item.translation[german],
      },
    };
    dispatch(
      addVocabulary({ newVocabulary: vocabularyToAdd, scriptType: "hiragana" })
    );
  };

  const handleModalButtonClick = (item, german) => {
    const vocabularyToAdd = {
      japaneseHiragana: item.japaneseHiragana,
      pronunciation: item.pronunciation,
      translation: {
        german: item.translation[german],
      },
    };

    if (!hiraganaVocabularyList.some((vocab) => vocab.id === item.id)) {
      dispatch(
        addVocabulary({
          newVocabulary: vocabularyToAdd,
          scriptType: "hiragana",
        })
      );
    }
    setModalShow(false);
  };

  const renderGermanVocabularyForPage = () => {
    const startIndex = (currentPageVocabularyGerman - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const germanVocabularies = japaneseData.vocabulary
      .filter((item) => item.translation.german)
      .slice(startIndex, endIndex);

    return germanVocabularies.map((item, index) => (
      <tr
        key={index}
        className={`list-items-container equal-column-width ${
          hiraganaVocabularyList.some((vocab) => vocab.id === item.id)
            ? "selected"
            : ""
        }`}
        onClick={() => handleRowClick(item)}
      >
        <td>{item.japaneseHiragana}</td>
        <td>{item.pronunciation}</td>
        <td>{item.translation.german}</td>
        {windowWidth >= 480 && (
          <button
            onClick={() => handleSelectVocabulary(item, "german")}
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

  const handlePrevPageVocabularyGerman = () => {
    if (currentPageVocabularyGerman > 1) {
      setCurrentPageVocabularyGerman(currentPageVocabularyGerman - 1);
    }
  };

  const handleNextPageVocabularyGerman = () => {
    const totalPagesVocabularyGerman = Math.ceil(
      japaneseData.vocabulary.length / ITEMS_PER_PAGE
    );
    if (currentPageVocabularyGerman < totalPagesVocabularyGerman) {
      setCurrentPageVocabularyGerman(currentPageVocabularyGerman + 1);
    }
  };

  const paginationButtonsVocabularyGerman = (
    <div className="pagination">
      <button
        onClick={handlePrevPageVocabularyGerman}
        disabled={currentPageVocabularyGerman === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPageVocabularyGerman} of{" "}
        {Math.ceil(japaneseData.vocabulary.length / ITEMS_PER_PAGE)}
      </span>
      <button
        onClick={handleNextPageVocabularyGerman}
        disabled={
          currentPageVocabularyGerman ===
          Math.ceil(japaneseData.vocabulary.length / ITEMS_PER_PAGE)
        }
      >
        Next
      </button>
    </div>
  );

  return (
    <div>
      <table className="my-table">
        <tbody>
          <tr>
            <th>Hiragana</th>
            <th>Pronunciation</th>
            <th>German</th>
          </tr>
          {renderGermanVocabularyForPage()}
        </tbody>
      </table>
      {paginationButtonsVocabularyGerman}

      {selectedItem && windowWidth <= 480 && (
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <p>{selectedItem && selectedItem.japaneseHiragana}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedItem && selectedItem.pronunciation}</p>
            {selectedItem && selectedItem.translation.german}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => handleModalButtonClick(selectedItem, "german")}
            >
              {hiraganaVocabularyList.some(
                (vocab) => vocab.id === selectedItem.id
              )
                ? "Remove"
                : "Add to Vocabulary"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default HiraganaGermanVocabulary;
