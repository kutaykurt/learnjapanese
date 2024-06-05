import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text">Learn Japanese</h1>
          <p>
            Deine Quelle für das Lernen von Japanisch. Verbessere dein Wissen
            über Hiragana und Katakana.
          </p>
          <div className="contact">
            <span>
              <i className="fas fa-phone"></i> &nbsp; +49 123 456 789
            </span>
            <span>
              <i className="fas fa-envelope"></i> &nbsp; info@learnjapanese.com
            </span>
          </div>
        </div>

        <div className="footer-section links">
          <h2>Links</h2>
          <ul>
            <li>
              <Link to="hiragana">Hiragana</Link>
            </li>
            <li>
              <Link to="katakana">Katakana</Link>
            </li>
            <li>
              <Link to="exercises">Übungen</Link>
            </li>
            <li>
              <Link to="aboutus">Über uns</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section contact-form">
          <h2>Kontakt</h2>
          <form>
            <input
              type="email"
              name="email"
              className="text-input contact-input"
              placeholder="Deine Email-Adresse..."
            />
            <textarea
              name="message"
              className="text-input contact-input"
              placeholder="Deine Nachricht..."
            ></textarea>
            <button type="submit" className="btn btn-big">
              <i className="fas fa-envelope"></i>
              Senden
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; learnjapanese.com | Designed by Kutay Kurt
      </div>
    </footer>
  );
};

export default Footer;
