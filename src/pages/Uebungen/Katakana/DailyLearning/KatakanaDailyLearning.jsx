import React, { useState, useEffect } from "react";
import { fetchJapaneseData } from "../../../../fetch";
import { Tab, Tabs } from "react-bootstrap";
import "../../uebungen.scss";

const KatakanaDailyLearning = () => {
  const [level, setLevel] = useState("A1");
  const [day, setDay] = useState("1");
  const [learningData, setLearningData] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const getLearningData = async () => {
      const data = await fetchJapaneseData();
      setLearningData(data.dailyLearning.katakana);
    };
    getLearningData();
  }, []);

  const handleInputChange = (event, sentenceIndex) => {
    const value = event.target.value;
    setUserAnswers({
      ...userAnswers,
      [sentenceIndex]: value,
    });
  };

  const checkAnswers = () => {
    const currentDayData = learningData[level]?.days[day];
    if (!currentDayData) return;

    const resultsArray = currentDayData.sentences.map((sentence, index) => {
      const userAnswer = userAnswers[index] || "";
      const correctWord = currentDayData.words.find(
        (word) =>
          sentence[language].includes("_____") &&
          sentence[language]
            .replace("_____", word.translation.toLowerCase())
            .includes(userAnswer.toLowerCase())
      )?.translation;

      const isCorrect = userAnswer.toLowerCase() === correctWord?.toLowerCase();

      return {
        sentenceIndex: index,
        isCorrect,
      };
    });

    const resultsObject = resultsArray.reduce((acc, result) => {
      acc[result.sentenceIndex] = result.isCorrect;
      return acc;
    }, {});

    setResults(resultsObject);
  };

  const resetUserAnswersAndResults = () => {
    setUserAnswers({});
    setResults({});
  };

  useEffect(() => {
    resetUserAnswersAndResults();
  }, [level, day]);

  return (
    <div className="daily-learning-container">
      <h1>Katakana Daily Learning</h1>
      <Tabs
        id="level-tabs"
        activeKey={level}
        onSelect={(k) => setLevel(k)}
        className="mb-3"
      >
        {["A1", "A2", "B1", "B2", "C1", "C2"].map((levelKey) => (
          <Tab eventKey={levelKey} title={levelKey} key={levelKey}>
            <Tabs
              id="day-tabs"
              activeKey={day}
              onSelect={(k) => setDay(k)}
              className="mb-3"
            >
              {["1", "2", "3", "4", "5"].map((dayKey) => (
                <Tab eventKey={dayKey} title={`Day ${dayKey}`} key={dayKey}>
                  {learningData[level] && learningData[level].days[day] && (
                    <>
                      <div className="language-toggle">
                        <button onClick={() => setLanguage("en")}>
                          English
                        </button>
                        <button onClick={() => setLanguage("de")}>
                          German
                        </button>
                      </div>
                      <table className="learning-table">
                        <thead>
                          <tr>
                            <th>Katakana</th>
                            <th>Translation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {learningData[level].days[day].words.map(
                            (word, index) => (
                              <tr key={index}>
                                <td>{word.word}</td>
                                <td>{word.translation}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      <div className="sentences">
                        {learningData[level].days[day].sentences.map(
                          (sentence, index) => (
                            <div key={index} className="sentence">
                              <p>{sentence.jp}</p>
                              <p>
                                {sentence[language]
                                  .split("_____")
                                  .map((part, i) => {
                                    const isCorrect = results[index];
                                    const color = isCorrect
                                      ? "green"
                                      : isCorrect === false
                                      ? "red"
                                      : "";
                                    return (
                                      <span key={i}>
                                        {part}
                                        {i <
                                          sentence[language].split("_____")
                                            .length -
                                            1 && (
                                          <input
                                            type="text"
                                            value={userAnswers[index] || ""}
                                            onChange={(e) =>
                                              handleInputChange(e, index)
                                            }
                                            style={{ color }}
                                          />
                                        )}
                                      </span>
                                    );
                                  })}
                              </p>
                              {results[index] !== undefined && (
                                <p
                                  className="result"
                                  style={{
                                    color: results[index] ? "green" : "red",
                                  }}
                                >
                                  {results[index]
                                    ? language === "en"
                                      ? "Correct"
                                      : "Richtig"
                                    : language === "en"
                                    ? "Incorrect"
                                    : "Falsch"}
                                </p>
                              )}
                            </div>
                          )
                        )}
                      </div>
                      <button onClick={checkAnswers}>Check Answers</button>
                    </>
                  )}
                </Tab>
              ))}
            </Tabs>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default KatakanaDailyLearning;
