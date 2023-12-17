import React, { useEffect, useState } from 'react';
import { fetchJapaneseData } from '../../../../fetch';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const ITEMS_PER_PAGE = 30; // Anzahl der Vokabeln pro Seite

const Alphabet = () => {
  const [japaneseData, setJapaneseData] = useState({ alphabet: [] });
  const [currentPageAlphabet, setCurrentPageAlphabet] = useState(1);

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

  const totalPagesAlphabet = Math.ceil(
    japaneseData.alphabet.length / ITEMS_PER_PAGE
  );

  const renderAlphabetForPage = () => {
    const startIndex = (currentPageAlphabet - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return japaneseData.alphabet
      .slice(startIndex, endIndex)
      .map((item, index) => (
        <tr key={index} className="list-items-container equal-column-width">
          <td>{item.character}</td>
          <td>{item.pronunciation}</td>
          <td>{item.translation}</td>
        </tr>
      ));
  };

  const handlePrevPageAlphabet = () => {
    if (currentPageAlphabet > 1) {
      setCurrentPageAlphabet(currentPageAlphabet - 1);
    }
  };

  const handleNextPageAlphabet = () => {
    if (currentPageAlphabet < totalPagesAlphabet) {
      setCurrentPageAlphabet(currentPageAlphabet + 1);
    }
  };

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
          <tr>
            <th>Hiragana</th>
            <th>Pronounciation</th>
            <th>Translation</th>
          </tr>
          {renderAlphabetForPage()}
        </tbody>
      </table>
      {paginationButtonAlphabet}
    </div>
  );
};

export default Alphabet;
