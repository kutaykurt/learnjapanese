import React, { useContext, useEffect, useState } from 'react';
import { fetchJapaneseData } from '../../../../fetch';
import { useParams } from 'react-router-dom';
import { VocabularyContext } from '../../../../components/VocabularyProvider';

const ITEMS_PER_PAGE = 30; // Anzahl der Vokabeln pro Seite

const Alphabet = () => {
  const [japaneseData, setJapaneseData] = useState({ alphabet: [] });
  const [currentPageAlphabet, setCurrentPageAlphabet] = useState(1);
  const { id } = useParams();
  const { addVocabulary } = useContext(VocabularyContext);

  useEffect(() => {
    async function getJapaneseData() {
      try {
        const data = await fetchJapaneseData();
        setJapaneseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getJapaneseData();
  }, [id]);

  const totalPagesAlphabet = Math.ceil(
    japaneseData.alphabet.length / ITEMS_PER_PAGE
  );

  const handleSelectVocabulary = (item) => {
    addVocabulary(item); // Füge das ausgewählte Vokabular zur Liste hinzu
    console.log('Erfolgreich hinzugefügt:', item);
  };

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
            <button onClick={() => handleSelectVocabulary(item)} className='add-button'>
            Add to Vocabulary
          </button>
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
