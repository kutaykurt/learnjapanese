import React, { useEffect, useLayoutEffect, useState } from 'react';
import './hiragana.scss';
import { fetchJapaneseData } from '../../../fetch';
import { useLocation } from 'react-router-dom';

// Bootstrap imports
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Pagination } from 'react-bootstrap';

const ITEMS_PER_PAGE = 30; // Anzahl der Vokabeln pro Seite

const Hiragana = () => {
  const [japaneseData, setJapaneseData] = useState({
    alphabet: [],
    vocabulary: [],
  });

  const [key, setKey] = useState('home');
  const [currentPageAlphabet, setCurrentPageAlphabet] = useState(1);
  const [currentPageVocabularyGerman, setCurrentPageVocabularyGerman] = useState(1);
  const [currentPageVocabularyEnglish, setCurrentPageVocabularyEnglish] = useState(1);

  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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

  const totalPagesAlphabet = Math.ceil(japaneseData.alphabet.length / ITEMS_PER_PAGE);
  const totalPagesVocabularyGerman = Math.ceil(japaneseData.vocabulary.length / ITEMS_PER_PAGE);
  const totalPagesVocabularyEnglish = Math.ceil(japaneseData.vocabulary.length / ITEMS_PER_PAGE);

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
    <div className="Hiragana">
      <div className="beginning-text">
        <h2>Hiragana</h2>

        <p>
          <span>Welcome</span> to the Hiragana script! We already told you that
          we recommend you to learn Hiragana first...
          <br />
          But why should you learn it at first?
        </p>
      </div>

      <div className="hiragana-reasons-list">
        <ol>
          <li>
            <span className="list-title">
              1. Foundation of Japanese Script:{' '}
            </span>
            Hiragana is one of the fundamental writing systems of the Japanese
            language. Comprised of 46 basic characters representing vowels,
            consonants, and syllables, it is indispensable for reading and
            writing Japanese.
          </li>
          <li>
            <span className="list-title">
              2. Pronunciation and Sound Representation:{' '}
            </span>
            Hiragana represents native Japanese pronunciation and is commonly
            used for grammatical endings, particles, and inflections. It allows
            for a precise understanding of pronunciation, facilitating speaking
            and listening comprehension.
          </li>
          <li>
            <span className="list-title">3. Simplicity and Entry Point: </span>
            Compared to Katakana and especially Kanji, Hiragana characters are
            often simpler and quicker to learn. This eases the introduction to
            Japanese script and builds a strong foundation for further studies.
          </li>
          <li>
            <span className="list-title">4. Everyday Usage: </span>Hiragana is
            extensively used in texts and written materials. While Katakana and
            Kanji also feature prominently, Hiragana characters form the core of
            many words and sentences, aiding comprehension.
          </li>
          <li>
            <span className="list-title">
              5. Language Structures and Grammar:
            </span>
            Hiragana is closely linked to the structure of the Japanese
            language. Learning Hiragana provides a deeper understanding of
            grammatical concepts and helps grasp the basics of Japanese syntax.
          </li>
        </ol>
      </div>

      <div className="vocabulary-container">
        <Tabs
          id="uncontrolled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="alphabet" title="Alphabet">
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
          </Tab>

          <Tab
            eventKey="VocabularyGerman"
            title="Vocabulary (German)"
            className="tab-names"
          >
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
          </Tab>

          <Tab eventKey="VocabularyEnglish" title="Vocabulary (English)">
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
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Hiragana;
