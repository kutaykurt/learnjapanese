import React, { useEffect, useState } from "react";
import { fetchJapaneseData } from "../../../../fetch";
import "../../uebungen.scss";

const ITEMS_PER_PAGE = 30;

const KatakanaEnglishVocabularyUebungen = () => {
  const [vocabulary, setVocabulary] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getVocabularyData() {
      try {
        const data = await fetchJapaneseData();
        setVocabulary(data.vocabulary);

        const initialAnswers = {};
        data.vocabulary.forEach((item) => {
          initialAnswers[item.japaneseKatakana] = "";
        });
        setUserAnswers(initialAnswers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getVocabularyData();
  }, []);

  const handleInputChange = (event, katakana) => {
    const value = event.target.value;
    setUserAnswers({
      ...userAnswers,
      [katakana]: value,
    });
  };

  const checkAnswers = () => {
    const resultsArray = vocabulary.map((item) => {
      const userAnswer = userAnswers[item.japaneseKatakana];
      const isCorrect =
        userAnswer?.toUpperCase() === item.translation.english.toUpperCase();
      return {
        japaneseKatakana: item.japaneseKatakana,
        isCorrect,
      };
    });
    setResults(resultsArray);
  };

  const totalPages = Math.ceil(vocabulary.length / ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderVocabularyForPage = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return vocabulary.slice(startIndex, endIndex).map((item, index) => {
      const isCorrect = results.find(
        (result) => result.japaneseKatakana === item.japaneseKatakana
      )?.isCorrect;
      const color =
        isCorrect === true ? "green" : isCorrect === false ? "red" : "";

      return (
        <tr key={index} className="tr-uebungen">
          <td>{item.japaneseKatakana}</td>
          <td>
            <input
              type="text"
              value={userAnswers[item.japaneseKatakana]}
              onChange={(e) => handleInputChange(e, item.japaneseKatakana)}
              style={{ color }}
              className="uebungen-input"
            />
          </td>
          {isCorrect !== undefined && (
            <p className="result" style={{ color }}>
              {isCorrect ? "Correct" : "Incorrect"}
            </p>
          )}
        </tr>
      );
    });
  };

  return (
    <div>
      <table className="my-table table-uebungen">
        <tbody>
          <tr>
            <th>Katakana</th>
            <th>Input</th>
          </tr>
          {renderVocabularyForPage()}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <button onClick={checkAnswers}>Check Answers</button>
    </div>
  );
};

export default KatakanaEnglishVocabularyUebungen;
