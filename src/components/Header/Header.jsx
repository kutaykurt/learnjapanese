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
            <li>
              <Link
                to="/hiragana"
                className={`link jc-center ${getNavLinkClass('/hiragana')}`}
              >
                Hiragana
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`link jc-center ${getNavLinkClass('/katakana')}`}
              >
                Katakana
              </Link>
            </li>
            <li>
              <Link to="/" className={`link jc-center ${getNavLinkClass('/kanji')}`}>
                Kanji
              </Link>
            </li>
            <li>
              <Link to="/myvocabularies" className={`link jc-center ${getNavLinkClass('/myvocabularies')}`}>
                My Vocabulary
              </Link>
            </li>
            <li>
              <Link
                to="/uebungen"
                className={`link jc-center ${getNavLinkClass('/uebungen')}`}
              >
                Exercises
              </Link>
            </li>
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