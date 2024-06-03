import React from "react";
import "./header.scss";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const getNavLinkClass = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="Header">
      <div className="header-design-line" />

      <div className="header-main">
        <div className="column-one">
          <Link to="/" className="link">
            <span className="learn-word">Learn</span>
            <span className="japanese-word">Japanese</span>
            <div className="title-underline" />
          </Link>
        </div>

        <div className="column-two">
          <ul className="navigation">
            <li>
              <Link
                to="/hiragana"
                className={`link jc-center ${getNavLinkClass("/hiragana")}`}
              >
                Hiragana
              </Link>
            </li>
            <li>
              <Link
                to="/katakana"
                className={`link jc-center ${getNavLinkClass("/katakana")}`}
              >
                Katakana
              </Link>
            </li>
            <li>
              <Link
                to="/myvocabularies"
                className={`link jc-center ${getNavLinkClass(
                  "/myvocabularies"
                )}`}
              >
                My Vocabularies
              </Link>
            </li>
            <li>
              <Link
                to="/exercises"
                className={`link jc-center ${getNavLinkClass("/exercises")}`}
              >
                Exercises
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
