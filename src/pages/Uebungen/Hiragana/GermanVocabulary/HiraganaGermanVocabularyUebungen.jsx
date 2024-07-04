import React, { useEffect, useState } from "react";
import { fetchJapaneseData } from "../../../../fetch";
import "../../uebungen.scss";

const ITEMS_PER_PAGE = 30;

const HiraganaGermanVocabularyUebungen = () => {
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
          initialAnswers[item.japaneseHiragana] = "";
        });
        setUserAnswers(initialAnswers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getVocabularyData();
  }, []);

  const handleInputChange = (event, hiragana) => {
    const value = event.target.value;
    setUserAnswers({
      ...userAnswers,
      [hiragana]: value,
    });
  };

  const checkAnswers = () => {
    const resultsArray = vocabulary.map((item) => {
      const userAnswer = userAnswers[item.japaneseHiragana];
      const isCorrect =
        userAnswer?.toUpperCase() === item.translation.german.toUpperCase();
      return {
        japaneseHiragana: item.japaneseHiragana,
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
        (result) => result.japaneseHiragana === item.japaneseHiragana
      )?.isCorrect;
      const color =
        isCorrect === true ? "green" : isCorrect === false ? "red" : "";

      return (
        <tr key={index} className="tr-uebungen">
          <td className="td-uebungen">{item.japaneseHiragana}</td>
          <td className="td-uebungen">
            <input
              type="text"
              value={userAnswers[item.japaneseHiragana]}
              onChange={(e) => handleInputChange(e, item.japaneseHiragana)}
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
            <th>Hiragana</th>
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

export default HiraganaGermanVocabularyUebungen;
