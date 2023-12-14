import React, { useEffect, useState } from 'react';
import './hiragana.scss';
import { fetchJapaneseData } from '../../../fetch';

const Hiragana = () => {
  const [japaneseData, setJapaneseData] = useState({ alphabet: [], vocabulary: [] });

  useEffect(() => {
    async function getJapaneseData() {
      try {
        const data = await fetchJapaneseData();
        setJapaneseData(data); // Ändern Sie 'books' in 'booksData' um
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }
    getJapaneseData();
  }, []);

  console.log(japaneseData);

  return (
    <div className="Hiragana">
      <h2>Hiragana</h2>

      <p>
        <span>Welcome</span> to the Hiragana script! We already told you that we
        recommend you to learn Hiragana first...
        <br />
        But why should you learn it at first?
      </p>

      <div className="hiragana-reasons-list">
        <ol>
          <li>
            <span className="list-title">Foundation of Japanese Script: </span>
            Hiragana is one of the fundamental writing systems of the Japanese
            language. Comprised of 46 basic characters representing vowels,
            consonants, and syllables, it is indispensable for reading and
            writing Japanese.
          </li>
          <li>
            <span className="list-title">
              Pronunciation and Sound Representation:{' '}
            </span>
            Hiragana represents native Japanese pronunciation and is commonly
            used for grammatical endings, particles, and inflections. It allows
            for a precise understanding of pronunciation, facilitating speaking
            and listening comprehension.
          </li>
          <li>
            <span className="list-title">Simplicity and Entry Point: </span>
            Compared to Katakana and especially Kanji, Hiragana characters are
            often simpler and quicker to learn. This eases the introduction to
            Japanese script and builds a strong foundation for further studies.
          </li>
          <li>
            <span className="list-title">Everyday Usage: </span>Hiragana is
            extensively used in texts and written materials. While Katakana and
            Kanji also feature prominently, Hiragana characters form the core of
            many words and sentences, aiding comprehension.
          </li>
          <li>
            <span className="list-title">
              Language Structures and Grammar:{' '}
            </span>
            Hiragana is closely linked to the structure of the Japanese
            language. Learning Hiragana provides a deeper understanding of
            grammatical concepts and helps grasp the basics of Japanese syntax.
          </li>
        </ol>
      </div>

      <div className="vocabulary-container">
        <h3>Alphabet</h3>
        <table className="my-table">
          <tbody>
            <tr className=''>
              <th>Hiragama</th>
              <th>German pronouncing</th>
              <th>German</th>
            </tr>
            {japaneseData.alphabet.map((item, index) => (
              <tr key={index} className='list-items-container equal-column-width'>
                <td>{item.character}</td>
                <td>{item.pronunciation}</td>
                <td>{item.translation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hiragana;
