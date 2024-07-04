import React, { useEffect, useState } from "react";
import { fetchJapaneseData } from "../../../../fetch";

const KatakanaUebungenAlphabet = () => {
  const [japaneseAlphabet, setJapaneseAlphabet] = useState({
    katakanaAlphabet: [],
  });
  const [userAnswers, setUserAnswers] = useState({});
  const [germanTranslations, setGermanTranslations] = useState({});
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function getJapaneseAlphabet() {
      try {
        const data = await fetchJapaneseData();
        setJapaneseAlphabet(data);

        const translations = {};
        data.katakanaAlphabet.forEach((item) => {
          translations[item.character] = item.translation;
        });

        setGermanTranslations(translations);

        const initialAnswers = {};
        data.katakanaAlphabet.forEach((item) => {
          initialAnswers[item.character] = "";
        });
        setUserAnswers(initialAnswers);
      } catch (error) {
        console.error("Error fetching data");
      }
    }
    getJapaneseAlphabet();
  }, []);

  const handleInputChange = (event, character) => {
    const value = event.target.value;
    setUserAnswers({
      ...userAnswers,
      [character]: value,
    });
  };

  const checkAnswers = () => {
    const resultsArray = japaneseAlphabet.katakanaAlphabet.map((item) => {
      const userAnswer = userAnswers[item.character];
      const germanTranslation = germanTranslations[item.character];
      if (userAnswer !== undefined && germanTranslation !== undefined) {
        const isCorrect =
          userAnswer.toUpperCase() === germanTranslation.toUpperCase();
        return {
          character: item.character,
          isCorrect,
        };
      } else {
        return {
          character: item.character,
          isCorrect: false,
        };
      }
    });
    setResults(resultsArray);
  };

  return (
    <div className="flex">
      <div className="uebungen-container">
        {japaneseAlphabet.katakanaAlphabet.map((item, index) => {
          const isCorrect = results.find(
            (result) => result.character === item.character
          )?.isCorrect;
          const color =
            isCorrect === true ? "green" : isCorrect === false ? "red" : "";

          return (
            <div key={index} className="uebungen-item">
              <div className="alphabet">{item.character}</div>
              <div className="form-result-container">
                <form>
                  <input
                    type="text"
                    value={userAnswers[item.character]}
                    onChange={(e) => handleInputChange(e, item.character)}
                    style={{ color }}
                  />
                </form>
                {isCorrect !== undefined && (
                  <p className="result" style={{ color }}>
                    {isCorrect ? "Richtig" : "Falsch"}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={checkAnswers}>Show results</button>
      </div>
    </div>
  );
};

export default KatakanaUebungenAlphabet;
