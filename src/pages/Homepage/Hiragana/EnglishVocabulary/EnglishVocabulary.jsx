import React, { useContext, useEffect, useState } from 'react';
import { fetchJapaneseData } from '../../../../fetch';
import { useParams } from 'react-router-dom';
import { VocabularyContext } from '../../../../components/VocabularyProvider';

const ITEMS_PER_PAGE = 30;

const EnglishVocabulary = () => {
  const [japaneseData, setJapaneseData] = useState({ vocabulary: [] });
  const [currentPageVocabularyEnglish, setCurrentPageVocabularyEnglish] =
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

  const totalPagesVocabularyEnglish = Math.ceil(
    japaneseData.vocabulary.length / ITEMS_PER_PAGE
  );

  const handleSelectVocabulary = (item, english) => {
    const isSelected = isVocabularySelected(item);

    console.log('isSelected before:', isSelected);

    const vocabularyToAdd = {
      japanese: item.japanese,
      pronunciation: item.pronunciation,
      translation: {
        [english]: item.translation[english],
      },
    };
    addVocabulary(vocabularyToAdd); // Keine 'english'-Parameterübertragung erforderlich

    console.log('isSelected after:', isVocabularySelected(item));
  };

  const renderEnglishVocabularyForPage = () => {
    const startIndex = (currentPageVocabularyEnglish - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const englishVocabularies = japaneseData.vocabulary
      .filter((item) => item.translation.english) // Filtert Vokabeln mit deutscher Übersetzung
      .slice(startIndex, endIndex);

    return englishVocabularies.map((item, index) => (
      <tr key={index} className="list-items-container equal-column-width">
        <td>{item.japanese}</td>
        <td>{item.pronunciation}</td>
        <td>{item.translation.english}</td>
        <button
          onClick={() => handleSelectVocabulary(item, 'english')}
          className={
            isVocabularySelected(item, 'english')
              ? 'add-button green'
              : 'add-button'
          }
        >
          {isVocabularySelected(item, 'english') ? 'Added' : 'Add to Vocabulary'}
        </button>
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
