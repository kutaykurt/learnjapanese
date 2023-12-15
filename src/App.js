import { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage';
import { Route, Routes } from 'react-router-dom';
import Hiragana from './pages/Homepage/Hiragana/Hiragana';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

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
          <div className="body">
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/hiragana' element={<Hiragana />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
