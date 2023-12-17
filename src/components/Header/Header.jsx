import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="Header">
      <div className="header-top-line" />

      <div className="header-main">
        <div className="column-one">
          <Link to="/" className="link">
            <span className="learn-word">Learn</span>
            <span className="japanese-word">Japanese</span>
          </Link>
        </div>

        <div className="column-two">
          <ul className="navigation">
            <Link to="/hiragana" className='link jc-center'><li>Hiragana</li></Link>
            <Link to="/" className='link jc-center'><li>Katakana</li></Link>
            <Link to="/" className='link jc-center'><li>Kanji</li></Link>
            <Link to="/" className='link jc-center'><li>My Vocabulary</li></Link>
            <Link to="/uebungen" className='link jc-center'><li>Übungen</li></Link>
          </ul>
        </div>
        <div className="column-three">
          <span>Language</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
