import React, { useContext, useEffect, useState } from "react";
import { fetchJapaneseData } from "../../../../fetch";
import { useParams } from "react-router-dom";
import { VocabularyContext } from "../../../../components/VocabularyProvider";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ITEMS_PER_PAGE = 30;

const KatakanaEnglishVocabulary = () => {
  const [japaneseData, setJapaneseData] = useState({ vocabulary: [] });
  const [currentPageVocabularyEnglish, setCurrentPageVocabularyEnglish] =
    useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const { id } = useParams();
  const { addKatakanaVocabulary, isKatakanaVocabularySelected } =
    useContext(VocabularyContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function getJapaneseData() {
      try {
        const data = await fetchJapaneseData();
        setJapaneseData(data);
      } catch (error) {
        console.error("Error fetching books:", error);
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

  const totalPagesVocabularyEnglish = Math.ceil(
    japaneseData.vocabulary.length / ITEMS_PER_PAGE
  );

  const handleSelectVocabulary = (item, english) => {
    const vocabularyToAdd = {
      japaneseKatakana: item.japaneseKatakana,
      pronunciation: item.pronunciation,
      translation: {
        [english]: item.translation[english],
      },
    };
    addKatakanaVocabulary(vocabularyToAdd);
  };

  const handleRowClick = (item) => {
    console.log("Selected item:", item); // Überprüfen Sie, ob das Element korrekt ausgewählt wurde
    setSelectedItem(item);

    if (windowWidth <= 480) {
      setModalShow(true);
    }
  };

  const renderEnglishVocabularyForPage = () => {
    const startIndex = (currentPageVocabularyEnglish - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const englishVocabularies = japaneseData.vocabulary
      .filter((item) => item.translation.english) // Filtert Vokabeln mit englischer Übersetzung
      .slice(startIndex, endIndex);

    return englishVocabularies.map((item, index) => (
      <tr
        key={index}
        className={`list-items-container equal-column-width ${
          isKatakanaVocabularySelected(item, "english") ? "selected" : ""
        }`}
        onClick={() => handleRowClick(item)}
      >
        <td>{item.japaneseKatakana}</td>
        <td>{item.pronunciation}</td>
        <td>{item.translation.english}</td>
        {windowWidth >= 480 && (
          <button
            onClick={() => handleSelectVocabulary(item, "english")}
            className={`add-button ${
              isKatakanaVocabularySelected(item, "english") ? "selected" : ""
            }`}
          >
            {isKatakanaVocabularySelected(item, "english")
              ? "X"
              : "Add to Vocabulary"}
          </button>
        )}
      </tr>
    ));
  };

  const handlePrevPageVocabularyEnglish = () => {
    if (currentPageVocabularyEnglish > 1) {
      setCurrentPageVocabularyEnglish(currentPageVocabularyEnglish - 1);
    }
  };

  const handleNextPageVocabularyEnglish = () => {
    if (currentPageVocabularyEnglish < totalPagesVocabularyEnglish) {
      setCurrentPageVocabularyEnglish(currentPageVocabularyEnglish + 1);
    }
  };

  const handleModalButtonClick = (item, english) => {
    if (!isKatakanaVocabularySelected(item)) {
      const vocabularyToAdd = {
        japaneseKatakana: item.japaneseKatakana,
        pronunciation: item.pronunciation,
        translation: {
          [english]: item.translation[english],
        },
      };
      addKatakanaVocabulary(vocabularyToAdd);
    }
    setModalShow(false);
  };

  const paginationButtonsVocabularyEnglish = (
    <div className="pagination">
      <button
        onClick={handlePrevPageVocabularyEnglish}
        disabled={currentPageVocabularyEnglish === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPageVocabularyEnglish} of {totalPagesVocabularyEnglish}
      </span>
      <button
        onClick={handleNextPageVocabularyEnglish}
        disabled={currentPageVocabularyEnglish === totalPagesVocabularyEnglish}
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
            <th>Katakana</th>
            <th>Pronounciation</th>
            <th>English</th>
          </tr>
          {renderEnglishVocabularyForPage()}
        </tbody>
      </table>
      {paginationButtonsVocabularyEnglish}

      {selectedItem && windowWidth <= 480 && (
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <p>{selectedItem && selectedItem.japaneseKatakana}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedItem && selectedItem.pronunciation}</p>
            {selectedItem && selectedItem.translation.english}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => handleModalButtonClick(selectedItem, "english")}
            >
              {isKatakanaVocabularySelected(selectedItem, "english")
                ? "Remove"
                : "Add to Vocabulary"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default KatakanaEnglishVocabulary;
