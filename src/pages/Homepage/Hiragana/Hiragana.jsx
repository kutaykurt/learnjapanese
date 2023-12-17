import React, { useLayoutEffect, useState } from 'react';
import './hiragana.scss';
import { Link, useLocation } from 'react-router-dom';

// Bootstrap imports
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Alphabet from './Alphabet/Alphabet';
import GermanVocabulary from './GermanVocabulary/GermanVocabulary';
import EnglishVocabulary from './EnglishVocabulary/EnglishVocabulary';

const Hiragana = () => {
  const [key, setKey] = useState('Alphabet');

  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="Hiragana">
      <div className="beginning-text">
        <h2>Hiragana</h2>

        <p>
          <span>Welcome</span> to the Hiragana script! We already told you that
          we recommend you to learn Hiragana first...
          <br />
          But why should you learn it at first? You can read more about it <Link to="/abouthiragana" className='link more-info'>here</Link>
        </p>
      </div>
      
      <div>
        <span>Click here for {'>'} </span>
        <Link to="/uebungen" className="link jc-center">
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
            <Alphabet />
          </Tab>

          <Tab
            eventKey="VocabularyGerman"
            title="Vocabulary (German)"
            className="tab-names"
          >
            <GermanVocabulary />
          </Tab>

          <Tab eventKey="VocabularyEnglish" title="Vocabulary (English)">
            <EnglishVocabulary />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Hiragana;
