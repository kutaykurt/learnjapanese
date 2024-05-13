import { useEffect, useLayoutEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage';
import { Route, Routes, useLocation } from 'react-router-dom';
import Hiragana from './pages/Homepage/Hiragana/Hiragana';
import 'bootstrap/dist/css/bootstrap.min.css';
import Uebungen from './pages/Homepage/Uebungen/UebungenAlphabet';
import AboutHiragana from './pages/Homepage/Hiragana/AboutHiragama';
import MyVocabulary from './pages/Homepage/MyVocabulary/MyVocabulary';
import { VocabularyProvider } from './components/VocabularyProvider';
import Katakana from './pages/Homepage/Katakana/Katakana.jsx'
import Kanji from './pages/Homepage/Kanji/Kanji';
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
                <Route path="/exercises" element={<Uebungen />} />
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