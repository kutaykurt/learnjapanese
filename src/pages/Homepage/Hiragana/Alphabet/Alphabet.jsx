import React, { useContext, useEffect, useState } from 'react';
import { fetchJapaneseData } from '../../../../fetch';
import { useParams } from 'react-router-dom';
import { VocabularyContext } from '../../../../components/VocabularyProvider';

const ITEMS_PER_PAGE = 30;

const Alphabet = () => {
  const [japaneseData, setJapaneseData] = useState({ alphabet: [] });
  const [currentPageAlphabet, setCurrentPageAlphabet] = useState(1);
  const { id } = useParams();
  const { addVocabulary, isVocabularySelected, removeVocabulary } =
    useContext(VocabularyContext);

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
    const isSelected = isVocabularySelected(item);

    if (isSelected) {
      removeVocabulary(item.id);
      console.log("removed");
    } else {
      addVocabulary(item);
      console.log("Failed removing");
    }
  };

  const renderAlphabetForPage = () => {
    const startIndex = (currentPageAlphabet - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return japaneseData.alphabet
      .slice(startIndex, endIndex)
      .map((item, index) => (
        <tr key={index} className="list-items-container equal-column-width tr">
          <td className="td">{item.character}</td>
          <td className="td">{item.pronunciation}</td>
          <td className="td">{item.translation}</td>
          <button
            onClick={() => handleSelectVocabulary(item)}
            className={`add-button ${
              isVocabularySelected(item) ? 'selected' : ''
            }`}
          >
            {isVocabularySelected(item) ? 'Added' : 'Add to Vocabulary'}
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
          <tr className="tr">
            <th className="th">Hiragana</th>
            <th className="th">Pronounciation</th>
            <th className="th">Translation</th>
          </tr>
          {renderAlphabetForPage()}
        </tbody>
      </table>
      {paginationButtonAlphabet}
    </div>
  );
};

export default Alphabet;