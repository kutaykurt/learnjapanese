import React, { useEffect, useState } from 'react';
import './uebungen.scss';
import { fetchJapaneseData } from '../../../fetch';

const Uebungen = () => {
  const [japaneseAlphabet, setJapaneseAlphabet] = useState({ alphabet: [] });
  const [userAnswers, setUserAnswers] = useState({});
  const [germanTranslations, setGermanTranslations] = useState({});
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function getJapaneseAlphabet() {
      try {
        const data = await fetchJapaneseData();
        setJapaneseAlphabet(data);

        const translations = {};
        data.alphabet.forEach(item => {
          translations[item.character] = item.translation;
        })

        setGermanTranslations(translations);
      
        const initialAnswers = {};
        data.alphabet.forEach((item) => {
          initialAnswers[item.character] = '';
        });
        setUserAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching data');
      }
    }
    getJapaneseAlphabet();
  }, []);

  const handleInputChange = (event, character) => {
    const value = event.target.value;
    setUserAnswers({
      ...userAnswers,
      [character]: value.toUpperCase(),
    });
  };

  const checkAnswers = (character) => {
    const resultsArray = japaneseAlphabet.alphabet.map(item => {
      const isCorrect = userAnswers[item.character] === germanTranslations[item.character]
      return {
        character: item.character,
        isCorrect,
      }
    })
    setResults(resultsArray);
  };

  return (
    <div>
      {japaneseAlphabet.alphabet.map((item, index) => {
        const isCorrect = results.find(result => result.character === item.character)?.isCorrect;
        const color = isCorrect === true ? 'green' : isCorrect === false ? 'red' : '';

        return (
          <div key={index}>
            {item.character}
            <form>
              <input
                type="text"
                value={userAnswers[item.character]}
                onChange={(e) => handleInputChange(e, item.character)}
                style={{ color }}
              />
            </form>
          </div>
        );
      })}
      <button onClick={checkAnswers}>Ergebnisse anzeigen</button>
      {/* <div>
        {results.map((result, index) => (
          <p key={index}>
            {result.character}: {result.isCorrect ? 'Richtig' : 'Falsch'}
          </p>
        ))}
      </div> */}
    </div>
  );
};

export default Uebungen;
