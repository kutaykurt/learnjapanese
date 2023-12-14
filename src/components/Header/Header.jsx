import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="Header">
      <div className="header-top-line" />

      <div className="header-main">
        <Link to='/' className='link'>
          <div className="column-one">
            <span className="learn-word">Learn</span>
            <span className="japanese-word">Japanese</span>
          </div>
        </Link>

        <div className="column-two">
          <ul className="navigation">
            <li>Hiragana</li>
            <li>Katakana</li>
            <li>Kanji</li>
            <li>My Vocabulary</li>
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
