import React, { useLayoutEffect, useState } from 'react';
import './hiragana.scss';
import { Link, useLocation } from 'react-router-dom';


import Alphabet from './Alphabet/HiraganaAlphabet';
import HiraganaGermanVocabulary from './HiraganaGermanVocabulary/HiraganaGermanVocabulary';
import HiraganaEnglishVocabulary from './HiraganaEnglishVocabulary/HiraganaEnglishVocabulary';

// Bootstrap imports
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Hiragana = () => {
  const [key, setKey] = useState('Alphabet');
  const [selectedVocabulary, setSelectedVocabulary] = useState(null)

  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="Main">
      <div className="beginning-text">
        <h2>Hiragana</h2>

        <p>
          <span>Welcome</span> to Hiragana!
          <br />
          Why should you learn Hiragana at first? You can read more about it <Link to="/abouthiragana" className='link more-info'>here</Link>
        </p>
      </div>
      
      <div>
        <span>Click here for {'>'} </span>
        <Link to="/exercises" className="link jc-center">
          Exercises
        </Link>
      </div>

      <div className="vocabulary-container">
        <Tabs
          id="uncontrolled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="Alphabet" title="Alphabet">
            <Alphabet selectedVocabulary={selectedVocabulary} setSelectedVocabulary={setSelectedVocabulary} />
          </Tab>

          <Tab
            eventKey="VocabularyGerman"
            title="Vocabulary (German)"
          >
            <HiraganaGermanVocabulary />
          </Tab>

          <Tab eventKey="VocabularyEnglish" title="Vocabulary (English)">
            <HiraganaEnglishVocabulary />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Hiragana;
