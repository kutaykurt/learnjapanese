import React, { useLayoutEffect, useState } from "react";
import "./katakana.scss";
import { Link, useLocation } from "react-router-dom";

// Bootstrap imports
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import KatakanaAlphabet from './KatakanaAlphabet/KatakanaAlphabet';
import KatakanaGermanVocabulary from "./KatakanaGermanVocabulary/KatakanaGermanVocabulary";
import KatakanaEnglishVocabulary from "./KatakanaEnglishVocabulary/KatakanaEnglishVocabulary";

const Katakana = () => {
  const [key, setKey] = useState("Alphabet");
  const [selectedVocabulary, setSelectedVocabulary] = useState(null);

  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="Main">
      <div className="beginning-text">
        <h2>Katakana</h2>

        <p>
          <span>Willkommen</span> beim Katakana-Skript! Wir empfehlen Ihnen,
          zuerst Katakana zu lernen...
          <br />
          Aber warum sollten Sie es zuerst lernen? Sie können mehr darüber lesen{" "}
          <Link to="/aboutkatakana" className="link more-info">
            hier
          </Link>
        </p>
      </div>

      <div>
        <span>Klicken Sie hier für {">"} </span>
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
          <Tab eventKey="KatakanaAlphabet" title="Alphabet">
            <KatakanaAlphabet
              selectedVocabulary={selectedVocabulary}
              setSelectedVocabulary={setSelectedVocabulary}
            />
          </Tab>

          <Tab
            eventKey="KatakanaCocabularyGerman"
            title="Vokabeln (Deutsch)"
            className="tab-names"
          >
            <KatakanaGermanVocabulary />
          </Tab>

          <Tab eventKey="KatakanaVocabularyEnglish" title="Vokabeln (Englisch)">
            <KatakanaEnglishVocabulary />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Katakana;
