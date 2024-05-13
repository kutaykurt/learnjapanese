import React from "react";
import "./katakana.scss";

const AboutKatakana = () => {
  return (
    <div className="AboutKatakana">
      <div className="katakana-reasons-list">
        <ol>
          <li>
            <span className="list-title">
              1. Representation of Foreign Words and Names:{" "}
            </span>
            Katakana is commonly used to represent non-Japanese words and names.
            It is an integral part of the Japanese script, allowing for the
            reading and writing of loanwords from other languages.
          </li>
          <li>
            <span className="list-title">
              2. Cultural Exchange and Internationalism:{" "}
            </span>
            Due to its usage for foreign words and names, Katakana symbolizes
            cultural exchange and the internationalism of the Japanese language.
            It facilitates communication and interaction with people from
            diverse cultures.
          </li>
          <li>
            <span className="list-title">3. Emphasis and Highlighting: </span>
            Katakana is often used to emphasize words or to strengthen their
            emphasis. By using Katakana, specific terms or expressions in texts
            can be marked more distinctly.
          </li>
          <li>
            <span className="list-title">4. Technology and Pop Culture: </span>
            Katakana is frequently found in areas such as technology,
            entertainment, and pop culture. It is commonly used in advertising,
            manga, anime, and video games, making it indispensable for fans of
            Japanese culture.
          </li>
          <li>
            <span className="list-title">5. Distinction and Diversity:</span>
            Katakana offers a variety of characters distinct from those in
            Hiragana and Kanji. This diversity allows for the representation of
            different types of words and expressions, enriching the expressive
            range of the Japanese script.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default AboutKatakana;
