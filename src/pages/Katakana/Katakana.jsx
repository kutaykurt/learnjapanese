import React, { useLayoutEffect, useState } from "react";
import "./katakana.scss";
import { Link, useLocation } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import KatakanaAlphabet from "./KatakanaAlphabet/KatakanaAlphabet";
import KatakanaGermanVocabulary from "./KatakanaGermanVocabulary/KatakanaGermanVocabulary";
import KatakanaEnglishVocabulary from "./KatakanaEnglishVocabulary/KatakanaEnglishVocabulary";

const Katakana = () => {
  const [key, setKey] = useState("KatakanaAlphabet");
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="Main">
      <div className="beginning-text">
        <h2>Katakana</h2>
        <p>
          <span>Welcome</span> to Katakana!
          <br />
          Read more about it{" "}
          <Link to="/aboutkatakana" className="link more-info">
            here
          </Link>
        </p>
      </div>

      <div>
        <span>Click here for {">"} </span>
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
            <KatakanaAlphabet />
          </Tab>
          <Tab eventKey="KatakanaVocabularyGerman" title="Vocabulary (German)">
            <KatakanaGermanVocabulary />
          </Tab>
          <Tab
            eventKey="KatakanaVocabularyEnglish"
            title="Vocabulary (English)"
          >
            <KatakanaEnglishVocabulary />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Katakana;
