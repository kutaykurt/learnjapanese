import React, { useEffect, useState } from "react";
import { fetchJapaneseData } from "../../../fetch";
import { useDispatch, useSelector } from "react-redux";
import { addVocabulary } from "../../../redux/vocabularySlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ITEMS_PER_PAGE = 30;

const HiraganaEnglishVocabulary = () => {
  const [japaneseData, setJapaneseData] = useState({ vocabulary: [] });
  const [currentPageVocabularyEnglish, setCurrentPageVocabularyEnglish] =
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

  const handleSelectVocabulary = (item, english) => {
    const vocabularyToAdd = {
      japaneseHiragana: item.japaneseHiragana,
      pronunciation: item.pronunciation,
      translation: {
        english: item.translation[english],
      },
    };
    dispatch(
      addVocabulary({ newVocabulary: vocabularyToAdd, scriptType: "hiragana" })
    );
  };

  const handleModalButtonClick = (item, english) => {
    const vocabularyToAdd = {
      japaneseHiragana: item.japaneseHiragana,
      pronunciation: item.pronunciation,
      translation: {
        english: item.translation[english],
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

  const renderEnglishVocabularyForPage = () => {
    const startIndex = (currentPageVocabularyEnglish - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const englishVocabularies = japaneseData.vocabulary
      .filter((item) => item.translation.english)
      .slice(startIndex, endIndex);

    return englishVocabularies.map((item, index) => (
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
        <td>{item.translation.english}</td>
        {windowWidth >= 480 && (
          <button
            onClick={() => handleSelectVocabulary(item, "english")}
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

  const handlePrevPageVocabularyEnglish = () => {
    if (currentPageVocabularyEnglish > 1) {
      setCurrentPageVocabularyEnglish(currentPageVocabularyEnglish - 1);
    }
  };

  const handleNextPageVocabularyEnglish = () => {
    const totalPagesVocabularyEnglish = Math.ceil(
      japaneseData.vocabulary.length / ITEMS_PER_PAGE
    );
    if (currentPageVocabularyEnglish < totalPagesVocabularyEnglish) {
      setCurrentPageVocabularyEnglish(currentPageVocabularyEnglish + 1);
    }
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
        Page {currentPageVocabularyEnglish} of{" "}
        {Math.ceil(japaneseData.vocabulary.length / ITEMS_PER_PAGE)}
      </span>
      <button
        onClick={handleNextPageVocabularyEnglish}
        disabled={
          currentPageVocabularyEnglish ===
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
              <p>{selectedItem && selectedItem.japaneseHiragana}</p>
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

export default HiraganaEnglishVocabulary;
