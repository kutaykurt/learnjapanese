import React, { useContext, useEffect, useState } from "react";
import { fetchJapaneseData } from "../../../../fetch";
import { useParams } from "react-router-dom";
import { VocabularyContext } from "../../../../components/VocabularyProvider";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ITEMS_PER_PAGE = 30;

const KatakanaGermanVocabulary = () => {
  const [japaneseData, setJapaneseData] = useState({ vocabulary: [] });
  const [currentPageVocabularyGerman, setCurrentPageVocabularyGerman] =
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

  const handleSelectVocabulary = (item, german) => {
    const vocabularyToAdd = {
      japaneseKatakana: item.japaneseKatakana,
      pronunciation: item.pronunciation,
      translation: {
        [german]: item.translation[german],
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
          isKatakanaVocabularySelected(item, "german") ? "selected" : ""
        }`}
        onClick={() => handleRowClick(item)}
      >
        <td>{item.japaneseKatakana}</td>
        <td>{item.pronunciation}</td>
        <td>{item.translation.german}</td>
        {windowWidth >= 480 && (
          <div>
            <button
              onClick={() => handleSelectVocabulary(item, "german")}
              className={`add-button ${
                isKatakanaVocabularySelected(item, "german") ? "selected" : ""
              }`}
            >
              {isKatakanaVocabularySelected(item, "german")
                ? "X"
                : "Add to Vocabulary"}
            </button>
          </div>
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

  const handleModalButtonClick = (item, german) => {
    if (!isKatakanaVocabularySelected(item)) {
      const vocabularyToAdd = {
        japaneseKatakana: item.japaneseKatakana,
        pronunciation: item.pronunciation,
        translation: {
          [german]: item.translation[german],
        },
      };
      addKatakanaVocabulary(vocabularyToAdd);
    }
    setModalShow(false);
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
            <th>Katakana</th>
            <th>Pronounciation</th>
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
              {isKatakanaVocabularySelected(selectedItem)
                ? "Added"
                : "Add to Vocabulary"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {isKatakanaVocabularySelected(selectedItem)
                ? "This item is already added."
                : "Do you want to add this item to your vocabulary?"}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => handleModalButtonClick(selectedItem, "german")}
            >
              {isKatakanaVocabularySelected(selectedItem, "german")
                ? "Added"
                : "Add to Vocabulary"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default KatakanaGermanVocabulary;
