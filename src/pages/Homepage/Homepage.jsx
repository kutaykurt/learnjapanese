import React from 'react';
import './homepage.scss';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="Homepage">
      <h2>There are 3 different types of the Japanese script:</h2>

      <div className="line" />

      <ul className="language-descriptions">
        <li className="hiragana-description">
          <span className="title">Hiragana: </span>Hiragana serves as one of the
          foundations in Japanese writing, used for phonetic spelling of words
          and grammer. It consists of 46 basic characters.
        </li>
        <li className="katakana-description">
          <span className="title">Katakana: </span>Katakana is employed to write
          foreign words, onomatopoeia, and names of plants or animals. Like
          Hiragana, it comprises 46 characters.
        </li>
        <li className="kanji-description">
          <span className="title">Kanji</span> Kanji are Chinese characters
          adopted into the Japanese language. They represent words or ideas and
          encompass several thousand characters.
        </li>
      </ul>

      <div className="line" />

      <p className="description-end">
        Discover the fascination and significance of these three writing systems
        in the Japanese language, and embark on your journey into the world of
        Japanese writing!
      </p>

      <div className="language-selecting-container">
        <div className="description">
          <h4>
            Please select the language you want to learn.
            <br />
            If you are a beginner,
            we recommend you to learn Hiragama first. It's the first script they
            learn in schools in Japan.
          </h4>
        </div>
        <div className='buttons-container'>
          <Link to="hiragana" className='link'><button className='hiragana'>Hiragana</button></Link>
          <Link to="katakana" className='link'><button className='katakana' disabled>Katakana</button></Link>
          <Link to="kanji" className='link'><button className='kanji' disabled>Kanji</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
