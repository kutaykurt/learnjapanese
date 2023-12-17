import React, { useLayoutEffect, useState } from 'react';
import './hiragana.scss';
import { useLocation } from 'react-router-dom';

// Bootstrap imports
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Alphabet from './Alphabet/Alphabet';
import GermanVocabulary from './GermanVocabulary/GermanVocabulary';
import EnglishVocabulary from './EnglishVocabulary/EnglishVocabulary';

const Hiragana = () => {
  const [key, setKey] = useState('home');

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
