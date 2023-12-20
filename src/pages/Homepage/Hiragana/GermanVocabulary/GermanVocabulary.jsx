import React, { useContext, useEffect, useState } from 'react';
import { fetchJapaneseData } from '../../../../fetch';
import { useParams } from 'react-router-dom';
import { VocabularyContext } from '../../../../components/VocabularyProvider';

const ITEMS_PER_PAGE = 30;

const GermanVocabulary = () => {
  const [japaneseData, setJapaneseData] = useState({ vocabulary: [] });
  const [currentPageVocabularyGerman, setCurrentPageVocabularyGerman] =
    useState(1);

  const { id } = useParams();
  const { addVocabulary, isVocabularySelected } = useContext(VocabularyContext);

  useEffect(() => {
    async function getJapaneseData() {
      try {
        const data = await fetchJapaneseData();
        setJapaneseData(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }
    getJapaneseData();
  }, [id]);

  const totalPagesVocabularyGerman = Math.ceil(
    japaneseData.vocabulary.length / ITEMS_PER_PAGE
  );

  const handleSelectVocabulary = (item, german) => {
    const isSelected = isVocabularySelected(item);

    console.log('isSelected before:', isSelected);

    const vocabularyToAdd = {
      japanese: item.japanese,
      pronunciation: item.pronunciation,
      translation: {
        [german]: item.translation[german],
      },
    };
    addVocabulary(vocabularyToAdd); // Keine 'german'-Parameterübertragung erforderlich

    console.log('isSelected after:', isVocabularySelected(item));
  };

  const renderGermanVocabularyForPage = () => {
    const startIndex = (currentPageVocabularyGerman - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const germanVocabularies = japaneseData.vocabulary
      .filter((item) => item.translation.german) // Filtert Vokabeln mit deutscher Übersetzung
      .slice(startIndex, endIndex);

    return germanVocabularies.map((item, index) => (
      <tr key={index} className="list-items-container equal-column-width">
        <td>{item.japanese}</td>
        <td>{item.pronunciation}</td>
        <td>{item.translation.german}</td>
        <button
          onClick={() => handleSelectVocabulary(item, 'german')}
          className={
            isVocabularySelected(item, 'german')
              ? 'add-button green'
              : 'add-button'
          }
        >
          {isVocabularySelected(item, 'german') ? 'Added' : 'Add to Vocabulary'}
        </button>
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
