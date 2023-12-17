import React, { useEffect, useState } from 'react';
import { fetchJapaneseData } from '../../../../fetch';

const ITEMS_PER_PAGE = 30; // Anzahl der Vokabeln pro Seite

const EnglishVocabulary = () => {
  const [japaneseData, setJapaneseData] = useState({ vocabulary: [] });

  const [currentPageVocabularyEnglish, setCurrentPageVocabularyEnglish] =
    useState(1);

  const totalPagesVocabularyEnglish = Math.ceil(
    japaneseData.vocabulary.length / ITEMS_PER_PAGE
  );

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

  const renderEnglishVocabularyForPage = () => {
    const startIndex = (currentPageVocabularyEnglish - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return japaneseData.vocabulary
      .slice(startIndex, endIndex)
      .map((item, index) => (
        <tr key={index} className="list-items-container equal-column-width">
          <td>{item.japanese}</td>
          <td>{item.pronunciation}</td>
          <td>{item.translation.english}</td>
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
            <th>Hiragana</th>
            <th>Pronounciation</th>
            <th>English</th>
          </tr>
          {renderEnglishVocabularyForPage()}
        </tbody>
      </table>
      {paginationButtonsVocabularyEnglish}
    </div>
  );
};

export default EnglishVocabulary;
