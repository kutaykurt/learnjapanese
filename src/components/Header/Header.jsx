import React from 'react';
import './header.scss';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

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
            <Link
              to="/hiragana"
              className={`link jc-center ${getNavLinkClass('/hiragana')}`}
            >
              <li>Hiragana</li>
            </Link>
            <Link
              to="/"
              className={`link jc-center ${getNavLinkClass('/katakana')}`}
            >
              <li>Katakana</li>
            </Link>
            <Link to="/" className="link jc-center">
              <li>Kanji</li>
            </Link>
            <Link to="/" className="link jc-center">
              <li>My Vocabulary</li>
            </Link>
            <Link
              to="/uebungen"
              className={`link jc-center ${getNavLinkClass('/uebungen')}`}
            >
              <li>Exercises</li>
            </Link>
          </ul>
        </div>
        {/* <div className="column-three">
          <span>Language</span>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
