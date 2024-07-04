import React, { useState } from "react";
import "../uebungen.scss";

// Bootstrap
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import HiraganaGermanVocabularyUebungen from "./GermanVocabulary/HiraganaGermanVocabularyUebungen";
import HiraganaUebungenAlphabet from "./Alphabet/HiraganaUebungenAlphabet";
import HiraganaEnglishVocabularyUebungen from "./EnglishVocabulary/HiraganaEnglishVocabularyUebungen";

const UebungenHiragana = () => {
  const [key, setKey] = useState("Alphabet");

  return (
    <div className="vocabulary-container uebungen-container">
      <Tabs
        id="uncontrolled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="Alphabet" title="Alphabet">
          <HiraganaUebungenAlphabet />
        </Tab>

        <Tab
          eventKey="VocabularyGerman"
          title="Vocabulary (German)"
          className="tab-names"
        >
          <HiraganaGermanVocabularyUebungen />
        </Tab>

        <Tab eventKey="VocabularyEnglish" title="Vocabulary (English)">
          <HiraganaEnglishVocabularyUebungen />
        </Tab>
      </Tabs>
    </div>
  );
};

export default UebungenHiragana;
