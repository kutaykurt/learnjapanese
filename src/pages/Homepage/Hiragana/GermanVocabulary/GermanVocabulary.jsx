import React, { useEffect, useState } from 'react';
import { fetchJapaneseData } from '../../../../fetch';
const ITEMS_PER_PAGE = 30; // Anzahl der Vokabeln pro Seite

const GermanVocabulary = () => {
  const [japaneseData, setJapaneseData] = useState({ vocabulary: [] });
  const [currentPageVocabularyGerman, setCurrentPageVocabularyGerman] =
    useState(1);
  
    useEffect(() => {
      async function getJapaneseData() {
        try {
          const data = await fetchJapaneseData();
          setJapaneseData(data); // Ändern Sie 'books' in 'booksData' um
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      }
      getJapaneseData();
    }, []);

  const totalPagesVocabularyGerman = Math.ceil(
    japaneseData.vocabulary.length / ITEMS_PER_PAGE
  );

  const renderGermanVocabularyForPage = () => {
    const startIndex = (currentPageVocabularyGerman - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return japaneseData.vocabulary
      .slice(startIndex, endIndex)
      .map((item, index) => (
        <tr key={index} className="list-items-container equal-column-width">
          <td>{item.japanese}</td>
          <td>{item.pronunciation}</td>
          <td>{item.translation.german}</td>
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
              <th>Pronounciation</th>
              <th>German</th>
            </tr>
            {renderGermanVocabularyForPage()}
          </tbody>
        </table>
        {paginationButtonsVocabularyGerman}
    </div>
  );
};

export default GermanVocabulary;
