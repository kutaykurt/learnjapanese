import React, { useContext, useEffect, useState } from "react";
import { fetchJapaneseData } from "../../../../fetch";
import { useParams } from "react-router-dom";
import { VocabularyContext } from "../../../../components/VocabularyProvider";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ITEMS_PER_PAGE = 30;

const HiraganaAlphabet = () => {
  const [japaneseData, setJapaneseData] = useState({ hiraganaAlphabet: [] });
  const [currentPageAlphabet, setCurrentPageAlphabet] = useState(1);
  const [selectedHiraganaItem, setSelectedHiraganaItem] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const { id } = useParams();
  const {
    addHiraganaVocabulary,
    isHiraganaVocabularySelected,
    removeHiraganaVocabulary,
    hiraganaVocabularyList,
  } = useContext(VocabularyContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // State für Bildschirmbreite

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
  }, [id]);

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
    addHiraganaVocabulary(item);
  };

  const handleModalButtonClick = () => {
    if (!isHiraganaVocabularySelected(selectedHiraganaItem)) {
      addHiraganaVocabulary(selectedHiraganaItem);
    } else {
      // Find the vocabulary with the same properties as selectedHiraganaItem and get its id
      const existingVocabulary = hiraganaVocabularyList.find((vocab) => {
        return (
          vocab.character === selectedHiraganaItem.character &&
          vocab.japanese === selectedHiraganaItem.japanese &&
          vocab.pronunciation === selectedHiraganaItem.pronunciation &&
          vocab.translation === selectedHiraganaItem.translation
        );
      });

      if (existingVocabulary) {
        removeHiraganaVocabulary(existingVocabulary.id);
      }
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
            isHiraganaVocabularySelected(item) ? "selected" : ""
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
                isHiraganaVocabularySelected(item) ? "selected" : ""
              }`}
            >
              {isHiraganaVocabularySelected(item) ? "X" : "Add to Vocabulary"}
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
            <th className="th">Pronounciation</th>
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
              {isHiraganaVocabularySelected(selectedHiraganaItem)
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
