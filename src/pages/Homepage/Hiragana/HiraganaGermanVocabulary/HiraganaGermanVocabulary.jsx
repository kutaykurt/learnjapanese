import React, { useContext, useEffect, useState } from "react";
import { fetchJapaneseData } from "../../../../fetch";
import { useParams } from "react-router-dom";
import { VocabularyContext } from "../../../../components/VocabularyProvider";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ITEMS_PER_PAGE = 30;

const HiraganaGermanVocabulary = () => {
  const [japaneseData, setJapaneseData] = useState({ vocabulary: [] });
  const [currentPageVocabularyGerman, setCurrentPageVocabularyGerman] =
    useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const { id } = useParams();
  const { addHiraganaVocabulary, isHiraganaVocabularySelected } =
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

  const totalPagesVocabularyGerman = Math.ceil(
    japaneseData.vocabulary.length / ITEMS_PER_PAGE
  );

  const handleSelectVocabulary = (item, german) => {
    const vocabularyToAdd = {
      japaneseHiragana: item.japaneseHiragana,
      pronunciation: item.pronunciation,
      translation: {
        [german]: item.translation[german],
      },
    };
    addHiraganaVocabulary(vocabularyToAdd);
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
          isHiraganaVocabularySelected(item, "german") ? "selected" : ""
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
              isHiraganaVocabularySelected(item, "german") ? "selected" : ""
            }`}
          >
            {isHiraganaVocabularySelected(item, "german")
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
    if (currentPageVocabularyGerman < totalPagesVocabularyGerman) {
      setCurrentPageVocabularyGerman(currentPageVocabularyGerman + 1);
    }
  };

  const handleModalButtonClick = (item, german) => {
    if (!isHiraganaVocabularySelected(item)) {
      const vocabularyToAdd = {
        japaneseHiragana: item.japaneseHiragana,
        pronunciation: item.pronunciation,
        translation: {
          [german]: item.translation[german],
        },
      };
      addHiraganaVocabulary(vocabularyToAdd);
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
        Page {currentPageVocabularyGerman} of {totalPagesVocabularyGerman}
      </span>
      <button
        onClick={handleNextPageVocabularyGerman}
        disabled={currentPageVocabularyGerman === totalPagesVocabularyGerman}
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
            {isHiraganaVocabularySelected(selectedItem, "german")
              ? "Remove"
              : "Add to Vocabulary"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HiraganaGermanVocabulary;
