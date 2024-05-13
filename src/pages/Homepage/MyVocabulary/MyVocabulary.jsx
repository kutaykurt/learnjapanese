import React, { useContext } from "react";
import { VocabularyContext } from "../../../components/VocabularyProvider";

const MyVocabulary = () => {
  const {
    hiraganaVocabularyList,
    katakanaVocabularyList,
    removeHiraganaVocabulary,
    removeKatakanaVocabulary,
  } = useContext(VocabularyContext);

  const handleRemoveHiraganaVocabulary = (id) => {
    if (removeHiraganaVocabulary) {
      removeHiraganaVocabulary(id);
    }
  };

  const handleRemoveKatakanaVocabulary = (id) => {
    if (removeKatakanaVocabulary) {
      removeKatakanaVocabulary(id);
    }
  };

  const renderHiraganaAlphabet = () => {
    const hiraganaAlphabet = hiraganaVocabularyList.filter(
      (vocab) => vocab.character && vocab.pronunciation && vocab.translation
    );

    return (
      <div className="Main">
        <h2>Alphabet - Hiragana</h2>
        {hiraganaAlphabet.length > 0 ? (
          <div>
            <table className="my-table">
              <tbody>
                <tr>
                  <th>Hiragana</th>
                  <th>Pronounciation</th>
                  <th>Translation</th>
                </tr>
                {hiraganaAlphabet.map((vocab) => (
                  <tr key={vocab.id} className="list-items-container">
                    <td>{vocab.character}</td>
                    <td>{vocab.pronunciation}</td>
                    <td>{vocab.translation}</td>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveHiraganaVocabulary(vocab.id)}
                    >
                      X
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Alphabet selected yet.</p>
        )}
      </div>
    );
  };

  const renderGermanHiraganaVocabulary = () => {
    if (!hiraganaVocabularyList) {
      return <p>Loading...</p>; // Ladeanzeige, falls Daten nicht vorhanden sind
    }

    const filteredHiraganaList = hiraganaVocabularyList.filter(
      (vocab) =>
        vocab.japaneseHiragana && // Überprüfen, ob japaneseHiragana definiert ist
        vocab.pronunciation &&
        vocab.translation &&
        vocab.translation.german
    );

    return (
      <div className="Main">
        <h2>Hiragana Vocabularies - German</h2>
        {filteredHiraganaList.length > 0 ? (
          <div>
            <table className="my-table">
              <tbody>
                <tr>
                  <th>Hiragana</th>
                  <th>Pronounciation</th>
                  <th>German</th>
                </tr>
                {filteredHiraganaList.map((vocab) => (
                  <tr key={vocab.id} className="list-items-container">
                    <td>{vocab.japaneseHiragana}</td>
                    <td>{vocab.pronunciation}</td>
                    <td>{vocab.translation.german}</td>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveHiraganaVocabulary(vocab.id)}
                    >
                      X
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Vocabularies selected yet.</p>
        )}
      </div>
    );
  };

  const renderEnglishHiraganaVocabulary = () => {
    if (!hiraganaVocabularyList) {
      return <p>Loading...</p>; // Ladeanzeige, falls Daten nicht vorhanden sind
    }

    const filteredHiraganaList = hiraganaVocabularyList.filter(
      (vocab) =>
        vocab.japaneseHiragana && // Überprüfen, ob japaneseKatakana definiert ist
        vocab.pronunciation &&
        vocab.translation &&
        vocab.translation.english
    );

    return (
      <div className="Main">
        <h2>Hiragana Vocabularies - English</h2>
        {filteredHiraganaList.length > 0 ? (
          <div>
            <table className="my-table">
              <tbody>
                <tr>
                  <th>Hiragana</th>
                  <th>Pronounciation</th>
                  <th>English</th>
                </tr>
                {filteredHiraganaList.map((vocab) => (
                  <tr key={vocab.id} className="list-items-container">
                    <td>{vocab.japaneseHiragana}</td>
                    <td>{vocab.pronunciation}</td>
                    <td>{vocab.translation.english}</td>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveHiraganaVocabulary(vocab.id)}
                    >
                      X
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Vocabularies selected yet.</p>
        )}
      </div>
    );
  };

  const renderKatakanaAlphabet = () => {
    const katakanaAlphabet = katakanaVocabularyList.filter(
      (vocab) => vocab.character && vocab.pronunciation && vocab.translation
    );

    return (
      <div className="Main">
        <h2>Alphabet - Katakana</h2>
        {katakanaAlphabet.length > 0 ? (
          <table className="my-table">
            <tbody>
              <tr>
                <th>Katakana</th>
                <th>Pronounciation</th>
                <th>English</th>
              </tr>
              {katakanaAlphabet.map((vocab) => (
                <tr key={vocab.id} className="list-items-container">
                  <td>{vocab.character}</td>
                  <td>{vocab.pronunciation}</td>
                  <td>{vocab.translation}</td>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveKatakanaVocabulary(vocab.id)}
                  >
                    X
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Alphabet selected yet.</p>
        )}
      </div>
    );
  };

  const renderGermanKatakanaVocabulary = () => {
    if (!katakanaVocabularyList) {
      return <p>Loading...</p>; // Ladeanzeige, falls Daten nicht vorhanden sind
    }

    const filteredKatakanaList = katakanaVocabularyList.filter(
      (vocab) =>
        vocab.japaneseKatakana && // Überprüfen, ob japaneseKatakana definiert ist
        vocab.pronunciation &&
        vocab.translation &&
        vocab.translation.german
    );

    return (
      <div className="Main">
        <h2>Katakana Vocabularies - German</h2>
        {filteredKatakanaList.length > 0 ? (
          <table className="my-table">
            <tbody>
              <tr>
                <th>Katakana</th>
                <th>Pronounciation</th>
                <th>German</th>
              </tr>
              {filteredKatakanaList.map((vocab) => (
                <tr key={vocab.id} className="list-items-container">
                  <td>{vocab.japaneseKatakana}</td>
                  <td>{vocab.pronunciation}</td>
                  <td>{vocab.translation.german}</td>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveKatakanaVocabulary(vocab.id)}
                  >
                    X
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Vocabularies selected yet.</p>
        )}
      </div>
    );
  };

  const renderEnglishKatakanaVocabulary = () => {
    if (!katakanaVocabularyList) {
      return <p>Loading...</p>; // Ladeanzeige, falls Daten nicht vorhanden sind
    }

    const filteredKatakanaList = katakanaVocabularyList.filter(
      (vocab) =>
        vocab.japaneseKatakana && // Überprüfen, ob japaneseKatakana definiert ist
        vocab.pronunciation &&
        vocab.translation &&
        vocab.translation.english
    );

    return (
      <div className="Main">
        <h2>Katakana Vocabularies - English</h2>
        {filteredKatakanaList.length > 0 ? (
          <table className="my-table">
            <tbody>
              <tr>
                <th>Katakana</th>
                <th>Pronounciation</th>
                <th>English</th>
              </tr>
              {filteredKatakanaList.map((vocab) => (
                <tr key={vocab.id} className="list-items-container">
                  <td>{vocab.japaneseKatakana}</td>
                  <td>{vocab.pronunciation}</td>
                  <td>{vocab.translation.english}</td>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveKatakanaVocabulary(vocab.id)}
                  >
                    X
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Vocabularies selected yet.</p>
        )}
      </div>
    );
  };
      

  return (
    <div>
      {renderHiraganaAlphabet()}
      {renderGermanHiraganaVocabulary()}
      {renderEnglishHiraganaVocabulary()}
      {renderKatakanaAlphabet()}
      {renderGermanKatakanaVocabulary()}
      {renderEnglishKatakanaVocabulary()}
    </div>
  );
};

export default MyVocabulary;
