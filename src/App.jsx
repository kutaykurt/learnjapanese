import { useEffect, useLayoutEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Hiragana from "./pages/Homepage/Hiragana/Hiragana.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import UebungenHiragana from "./pages/Homepage/Uebungen/Hiragana/UebungenHiragana.jsx";
import AboutHiragana from "./pages/Homepage/Hiragana/AboutHiragama.jsx";
import MyVocabulary from "./pages/Homepage/MyVocabulary/MyVocabulary.jsx";
import { VocabularyProvider } from "./components/VocabularyProvider.jsx";
import Katakana from "./pages/Homepage/Katakana/Katakana.jsx";
import Kanji from "./pages/Homepage/Kanji/Kanji.jsx";
import AboutKatakana from "./pages/Homepage/Katakana/AboutKatakana.jsx";
import SearchFunction from "./components/SearchFunction/SearchFunction.jsx";
import { fetchJapaneseData } from "./fetch";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [showText, setShowText] = useState(true);
  const [japaneseData, setJapaneseData] = useState({ vocabulary: [] });
  const [searchResults, setSearchResults] = useState([]);
  const [hiraganaSearchResults, setHiraganaSearchResults] = useState([]);
  const [katakanaSearchResults, setKatakanaSearchResults] = useState([]);
  const [query, setQuery] = useState(""); // Neu hinzugefügt

  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchJapaneseData();
      setJapaneseData(data);
      setSearchResults(data.vocabulary); // Initial alle Daten anzeigen
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filtern der Suchergebnisse für Hiragana und Katakana
    const hiraganaResults = searchResults.filter(
      (item) => item.japaneseHiragana !== ""
    );
    setHiraganaSearchResults(hiraganaResults);

    const katakanaResults = searchResults.filter(
      (item) => item.japaneseKatakana !== ""
    );
    setKatakanaSearchResults(katakanaResults);
  }, [searchResults]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="App">
      <VocabularyProvider>
        {showText && (
          <div className="prologue">
            <span className="learn-word">Learn</span>
            <span className="japanese-word">Japanese</span>
          </div>
        )}
        {!showText && (
          <div className="app-main">
            <Header />
            <div className="search-container">
              <SearchFunction
                data={japaneseData.vocabulary}
                onSearchResults={handleSearchResults}
                query={query} // Neu hinzugefügt
                setQuery={setQuery} // Neu hinzugefügt
              />
            </div>
            <div className="body">
              {query === "" ? (
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/hiragana" element={<Hiragana />} />
                  <Route path="/katakana" element={<Katakana />} />
                  <Route path="/kanji" element={<Kanji />} />
                  <Route path="/exercises" element={<UebungenHiragana />} />
                  <Route path="/abouthiragana" element={<AboutHiragana />} />
                  <Route path="/aboutkatakana" element={<AboutKatakana />} />
                  <Route path="/myvocabularies" element={<MyVocabulary />} />
                </Routes>
              ) : (
                <div className="search-results">
                  {hiraganaSearchResults.length > 0 && (
                    <div className="search-results">
                      <h2>Hiragana Search Results:</h2>
                      <table className="search-results-table">
                        <tbody>
                          <tr>
                            <th>Hiragana</th>
                            <th>Pronunciation</th>
                            <th>English Translation</th>
                            <th>German Translation</th>
                          </tr>
                          {hiraganaSearchResults.map((item, index) => (
                            <tr key={index}>
                              <td>{item.japaneseHiragana}</td>
                              <td>{item.pronunciation}</td>
                              <td>{item.translation.english}</td>
                              <td>{item.translation.german}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {katakanaSearchResults.length > 0 && (
                    <div className="search-results">
                      <h2>Katakana Search Results:</h2>
                      <table className="search-results-table">
                        <tbody>
                          <tr>
                            <th>Katakana</th>
                            <th>Pronunciation</th>
                            <th>English Translation</th>
                            <th>German Translation</th>
                          </tr>
                          {katakanaSearchResults.map((item, index) => (
                            <tr key={index}>
                              <td>{item.japaneseKatakana}</td>
                              <td>{item.pronunciation}</td>
                              <td>{item.translation.english}</td>
                              <td>{item.translation.german}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </VocabularyProvider>
      <Footer />
    </div>
  );
}

export default App;
