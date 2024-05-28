import { useEffect, useLayoutEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header/Header.jsx';
import Homepage from './pages/Homepage/Homepage.jsx';
import { Route, Routes, useLocation } from 'react-router-dom';
import Hiragana from './pages/Homepage/Hiragana/Hiragana.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import UebungenHiragana from './pages/Homepage/Uebungen/Hiragana/UebungenHiragana.jsx';
import AboutHiragana from './pages/Homepage/Hiragana/AboutHiragama.jsx';
import MyVocabulary from './pages/Homepage/MyVocabulary/MyVocabulary.jsx';
import { VocabularyProvider } from './components/VocabularyProvider.jsx';
import Katakana from './pages/Homepage/Katakana/Katakana.jsx'
import Kanji from './pages/Homepage/Kanji/Kanji.jsx';
import AboutKatakana from './pages/Homepage/Katakana/AboutKatakana.jsx';

function App() {
  const [showText, setShowText] = useState(true);

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
            <div className="body">
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
            </div>
          </div>
        )}
      </VocabularyProvider>
    </div>
  );
}

export default App;