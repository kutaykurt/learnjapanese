import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeVocabulary } from "../../redux/vocabularySlice";

const MyVocabulary = () => {
  const { hiraganaVocabularyList, katakanaVocabularyList } = useSelector(
    (state) => state.vocabulary
  );
  const dispatch = useDispatch();

  const handleRemoveVocabulary = (id, scriptType) => {
    dispatch(removeVocabulary({ id, scriptType }));
  };

  const renderHiraganaAlphabet = () => {
    const hiraganaAlphabet = hiraganaVocabularyList.filter(
      (vocab) => vocab.character && vocab.pronunciation && vocab.translation
    );

    return (
      <div className="Main">
        <h2>Alphabet - Hiragana</h2>
        {hiraganaAlphabet.length > 0 ? (
          <table className="my-table">
            <tbody>
              <tr>
                <th>Hiragana</th>
                <th>Pronunciation</th>
                <th>Translation</th>
                <th>Action</th>
              </tr>
              {hiraganaAlphabet.map((vocab) => (
                <tr key={vocab.id} className="list-items-container">
                  <td>{vocab.character}</td>
                  <td>{vocab.pronunciation}</td>
                  <td>{vocab.translation}</td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() =>
                        handleRemoveVocabulary(vocab.id, "hiragana")
                      }
                    >
                      X
                    </button>
                  </td>
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

  const renderGermanHiraganaVocabulary = () => {
    const filteredHiraganaList = hiraganaVocabularyList.filter(
      (vocab) =>
        vocab.japaneseHiragana &&
        vocab.pronunciation &&
        vocab.translation &&
        vocab.translation.german
    );

    return (
      <div className="Main">
        <h2>Hiragana Vocabulary - German</h2>
        {filteredHiraganaList.length > 0 ? (
          <table className="my-table">
            <tbody>
              <tr>
                <th>Hiragana</th>
                <th>Pronunciation</th>
                <th>German</th>
                <th>Action</th>
              </tr>
              {filteredHiraganaList.map((vocab) => (
                <tr key={vocab.id} className="list-items-container">
                  <td>{vocab.japaneseHiragana}</td>
                  <td>{vocab.pronunciation}</td>
                  <td>{vocab.translation.german}</td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() =>
                        handleRemoveVocabulary(vocab.id, "hiragana")
                      }
                    >
                      X
                    </button>
                  </td>
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

  const renderEnglishHiraganaVocabulary = () => {
    const filteredHiraganaList = hiraganaVocabularyList.filter(
      (vocab) =>
        vocab.japaneseHiragana &&
        vocab.pronunciation &&
        vocab.translation &&
        vocab.translation.english
    );

    return (
      <div className="Main">
        <h2>Hiragana Vocabulary - English</h2>
        {filteredHiraganaList.length > 0 ? (
          <table className="my-table">
            <tbody>
              <tr>
                <th>Hiragana</th>
                <th>Pronunciation</th>
                <th>English</th>
                <th>Action</th>
              </tr>
              {filteredHiraganaList.map((vocab) => (
                <tr key={vocab.id} className="list-items-container">
                  <td>{vocab.japaneseHiragana}</td>
                  <td>{vocab.pronunciation}</td>
                  <td>{vocab.translation.english}</td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() =>
                        handleRemoveVocabulary(vocab.id, "hiragana")
                      }
                    >
                      X
                    </button>
                  </td>
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
                <th>Pronunciation</th>
                <th>Translation</th>
                <th>Action</th>
              </tr>
              {katakanaAlphabet.map((vocab) => (
                <tr key={vocab.id} className="list-items-container">
                  <td>{vocab.character}</td>
                  <td>{vocab.pronunciation}</td>
                  <td>{vocab.translation}</td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() =>
                        handleRemoveVocabulary(vocab.id, "katakana")
                      }
                    >
                      X
                    </button>
                  </td>
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
    const filteredKatakanaList = katakanaVocabularyList.filter(
      (vocab) =>
        vocab.japaneseKatakana &&
        vocab.pronunciation &&
        vocab.translation &&
        vocab.translation.german
    );

    return (
      <div className="Main">
        <h2>Katakana Vocabulary - German</h2>
        {filteredKatakanaList.length > 0 ? (
          <table className="my-table">
            <tbody>
              <tr>
                <th>Katakana</th>
                <th>Pronunciation</th>
                <th>German</th>
                <th>Action</th>
              </tr>
              {filteredKatakanaList.map((vocab) => (
                <tr key={vocab.id} className="list-items-container">
                  <td>{vocab.japaneseKatakana}</td>
                  <td>{vocab.pronunciation}</td>
                  <td>{vocab.translation.german}</td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() =>
                        handleRemoveVocabulary(vocab.id, "katakana")
                      }
                    >
                      X
                    </button>
                  </td>
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
    const filteredKatakanaList = katakanaVocabularyList.filter(
      (vocab) =>
        vocab.japaneseKatakana &&
        vocab.pronunciation &&
        vocab.translation &&
        vocab.translation.english
    );

    return (
      <div className="Main">
        <h2>Katakana Vocabulary - English</h2>
        {filteredKatakanaList.length > 0 ? (
          <table className="my-table">
            <tbody>
              <tr>
                <th>Katakana</th>
                <th>Pronunciation</th>
                <th>English</th>
                <th>Action</th>
              </tr>
              {filteredKatakanaList.map((vocab) => (
                <tr key={vocab.id} className="list-items-container">
                  <td>{vocab.japaneseKatakana}</td>
                  <td>{vocab.pronunciation}</td>
                  <td>{vocab.translation.english}</td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() =>
                        handleRemoveVocabulary(vocab.id, "katakana")
                      }
                    >
                      X
                    </button>
                  </td>
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
