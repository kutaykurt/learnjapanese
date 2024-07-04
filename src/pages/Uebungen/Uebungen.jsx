import React, { useState } from "react";
import "./uebungen.scss";
import { Tab, Tabs } from "react-bootstrap";
import HiraganaGermanVocabularyUebungen from "./Hiragana/GermanVocabulary/HiraganaGermanVocabularyUebungen";
import HiraganaUebungenAlphabet from "./Hiragana/Alphabet/HiraganaUebungenAlphabet";
import HiraganaEnglishVocabularyUebungen from "./Hiragana/EnglishVocabulary/HiraganaEnglishVocabularyUebungen";
import HiraganaDailyLearning from "./Hiragana/DailyLearning/HiraganaDailyLearning";
import KatakanaDailyLearning from "./Katakana/DailyLearning/KatakanaDailyLearning";

const Uebungen = () => {
  const [key, setKey] = useState("HiraganaAlphabet");

  return (
    <div className="vocabulary-container uebungen-container">
      <Tabs
        id="uncontrolled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="HiraganaAlphabet" title="Hiragana Alphabet">
          <HiraganaUebungenAlphabet />
        </Tab>

        <Tab
          eventKey="HiraganaVocabularyGerman"
          title="Hiragana Vocabulary (German)"
          className="tab-names"
        >
          <HiraganaGermanVocabularyUebungen />
        </Tab>

        <Tab
          eventKey="HiraganaVocabularyEnglish"
          title="Hiragana Vocabulary (English)"
        >
          <HiraganaEnglishVocabularyUebungen />
        </Tab>

        <Tab eventKey="HiraganaDailyLearning" title="Hiragana Daily Learning">
          <HiraganaDailyLearning />
        </Tab>

        <Tab eventKey="KatakanaDailyLearning" title="Katakana Daily Learning">
          <KatakanaDailyLearning />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Uebungen;
