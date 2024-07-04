import React, { useState, useEffect } from "react";
import { fetchJapaneseData } from "../../../fetch";
import "./dailyLearning.scss";

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
const days = [1, 2, 3, 4, 5];

const DailyLearning = ({ type }) => {
  const [level, setLevel] = useState(levels[0]);
  const [day, setDay] = useState(days[0]);
  const [dailyLearningData, setDailyLearningData] = useState({});
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    async function getDailyLearningData() {
      try {
        const data = await fetchJapaneseData();
        setDailyLearningData(data.dailyLearning[type][level].days[day]);

        const initialAnswers = {};
        data.dailyLearning[type][level].days[day].sentences.forEach(
          (_, index) => {
            initialAnswers[index] = "";
          }
        );
        setUserAnswers(initialAnswers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getDailyLearningData();
  }, [type, level, day]);

  const handleInputChange = (event, index) => {
    const value = event.target.value;
    setUserAnswers({
      ...userAnswers,
      [index]: value,
    });
  };

  const checkAnswers = () => {
    // Implement answer checking logic here
  };

  return (
    <div className="daily-learning-container">
      <h2>Daily Learning - {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
      <div className="level-selector">
        <label htmlFor="level">Select Level: </label>
        <select
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          {levels.map((lvl, index) => (
            <option key={index} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>
      <div className="day-selector">
        <label htmlFor="day">Select Day: </label>
        <select id="day" value={day} onChange={(e) => setDay(e.target.value)}>
          {days.map((d, index) => (
            <option key={index} value={d}>
              Day {d}
            </option>
          ))}
        </select>
      </div>
      <table className="my-table table-daily-learning">
        <thead>
          <tr>
            <th>Japanese</th>
            <th>Translation</th>
          </tr>
        </thead>
        <tbody>
          {dailyLearningData.words &&
            dailyLearningData.words.map((word, index) => (
              <tr key={index}>
                <td>{word.word}</td>
                <td>{word.translation}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="sentences">
        {dailyLearningData.sentences &&
          dailyLearningData.sentences.map((sentence, index) => (
            <div key={index} className="sentence-item">
              <p>{sentence.jp}</p>
              <input
                type="text"
                value={userAnswers[index]}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="Fill in the blank"
              />
              <p className="translation">
                {sentence[type].replace(/_____/, userAnswers[index])}
              </p>
            </div>
          ))}
      </div>
      <button onClick={checkAnswers}>Check Answers</button>
    </div>
  );
};

export default DailyLearning;
