import React from 'react';
import './homepage.scss';
import { Link } from 'react-router-dom';
import '../../App.scss'

const Homepage = () => {
  return (
    <div className="Homepage">
      <p className="description-first">
        Discover the fascination and significance of these three writing systems
        in the Japanese language, and embark on your journey into the world of
        Japanese writing!
      </p>
      <h2>There are 3 different types of the Japanese script:</h2>
      <div className="line" />
      <div className="note">
        <span>Please select the language you want to learn.</span>
        <br />
        <span>Note: </span>If you are a beginner, we recommend you to learn
        Hiragama first. It's the first script they learn in schools in Japan.
      </div>

      <ul className="language-descriptions">
        <li className="hiragana-description">
          <span className="title">Hiragana: </span>Hiragana serves as one of the
          foundations in Japanese writing, used for phonetic spelling of words
          and grammer. It consists of 46 basic characters.
          <br />
          <Link to="/hiragana" className="link">
            <button className="hiragana">Learn</button>
          </Link>
        </li>
        <li className="katakana-description mid-padding">
          <span className="title">Katakana: </span>Katakana is employed to write
          foreign words, onomatopoeia, and names of plants or animals. Like
          Hiragana, it comprises 46 characters.
          <br />
          <Link to="/katakana" className="link">
            <button className="katakana">
            Learn
            </button>
          </Link>
        </li>
        <li className="kanji-description">
          <span className="title">Kanji</span> Kanji are Chinese characters
          adopted into the Japanese language. They represent words or ideas and
          encompass several thousand characters.
          <br />
          <Link to="/kanji" className="link">
            <button className="kanji" disabled>
            Learn
            </button>
          </Link>
        </li>
      </ul>
      <div className="line" />
    </div>
  );
};

export default Homepage;
