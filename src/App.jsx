import { useEffect, useLayoutEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Hiragana from "./pages/Hiragana/Hiragana.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Uebungen from "./pages/Uebungen/Uebungen.jsx";
import AboutHiragana from "./pages/Hiragana/AboutHiragama.jsx";
import MyVocabulary from "./pages/MyVocabulary/MyVocabulary.jsx";
import Katakana from "./pages/Katakana/Katakana.jsx";
import Kanji from "./pages/Kanji/Kanji.jsx";
import AboutKatakana from "./pages/Katakana/AboutKatakana.jsx";
import { fetchJapaneseData } from "./fetch";
import Footer from "./components/Footer/Footer.jsx";
import SearchFunction from "./components/SearchFunction/SearchFunction.jsx";
import SearchResults from "./pages/SearchResults/SearchResults.jsx";
import Fuse from "fuse.js"; // Definition von Fuse

function App() {
  const [showText, setShowText] = useState(true);
  const [japaneseData, setJapaneseData] = useState({ vocabulary: [] });
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

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
      setSearchResults(data.vocabulary); // Ensure searchResults is initially set
    };

    loadData();
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query && query.trim() !== "") {
      const fuse = new Fuse(japaneseData.vocabulary, {
        keys: [
          "japaneseHiragana",
          "japaneseKatakana",
          "pronunciation",
          "translation.english",
          "translation.german",
        ],
        threshold: 0.3,
      });
      const results = fuse.search(query).map((result) => result.item);
      setSearchResults(results);
    } else {
      setSearchResults(japaneseData.vocabulary);
    }
  }, [location.search, japaneseData.vocabulary]);

  const handleSearchResults = (results) => {
    console.log("Handle search results:", results); // Debugging
    setSearchResults(results);
  };

  return (
    <div className="App">
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
              query={query}
              setQuery={setQuery}
              navigate={navigate}
            />
          </div>
          <div className="body">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/hiragana" element={<Hiragana />} />
              <Route path="/katakana" element={<Katakana />} />
              <Route path="/kanji" element={<Kanji />} />
              <Route path="/exercises" element={<Uebungen />} />
              <Route path="/abouthiragana" element={<AboutHiragana />} />
              <Route path="/aboutkatakana" element={<AboutKatakana />} />
              <Route path="/myvocabularies" element={<MyVocabulary />} />
              <Route
                path="/search"
                element={
                  <SearchResults
                    data={searchResults}
                    onSearchResults={handleSearchResults}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
