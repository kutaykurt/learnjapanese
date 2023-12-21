import React, { useContext, useEffect, useState } from 'react';
import { fetchJapaneseData } from '../../../../fetch';
import { useParams } from 'react-router-dom';
import { VocabularyContext } from '../../../../components/VocabularyProvider';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ITEMS_PER_PAGE = 30;

const Alphabet = () => {
  const [japaneseData, setJapaneseData] = useState({ alphabet: [] });
  const [currentPageAlphabet, setCurrentPageAlphabet] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const { id } = useParams();
  const { addVocabulary, isVocabularySelected } = useContext(VocabularyContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // State für Bildschirmbreite

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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRowClick = (item) => {
    setSelectedItem(item);
    if (windowWidth <= 480) {
      setModalShow(true);
    }
  };

  const handleSelectVocabulary = (item) => {
    addVocabulary(item);
  };

  const handleModalButtonClick = () => {
    if (!isVocabularySelected(selectedItem)) {
      addVocabulary(selectedItem);
    } else {
      alert('Already added!')
    }
    setModalShow(false);
  };

  const renderAlphabetForPage = () => {
    const startIndex = (currentPageAlphabet - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return japaneseData.alphabet
      .slice(startIndex, endIndex)
      .map((item, index) => (
        <tr
          key={index}
          className="list-items-container equal-column-width tr"
          onClick={() => handleRowClick(item)}
        >
          <td className="td">{item.character}</td>
          <td className="td">{item.pronunciation}</td>
          <td className="td">{item.translation}</td>
          {windowWidth >= 480 && (
            <button
              onClick={() => handleSelectVocabulary(item)}
              className={`add-button ${
                isVocabularySelected(item) ? 'selected' : ''
              }`}
            >
              {isVocabularySelected(item) ? 'Added' : 'Add to Vocabulary'}
            </button>
          )}
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

  const totalPagesAlphabet = Math.ceil(
    japaneseData.alphabet.length / ITEMS_PER_PAGE
  );

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

      {/** Modal für Bildschirmbreite <= 480px */}
      {selectedItem && windowWidth <= 480 && (
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {isVocabularySelected(selectedItem)
                ? 'Added'
                : 'Add to Vocabulary'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {isVocabularySelected(selectedItem)
                ? 'This item is already added.'
                : 'Do you want to add this item to your vocabulary?'}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleModalButtonClick}>
              {isVocabularySelected(selectedItem)
                ? 'Added'
                : 'Add to Vocabulary'}
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {paginationButtonAlphabet}
    </div>
  );
};

export default Alphabet;
