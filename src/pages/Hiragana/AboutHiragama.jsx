import React from 'react';
import './hiragana.scss';

const AboutHiragana = () => {
  return (
    <div className='AboutHiragana'>
      <div className="hiragana-reasons-list">
        <ol>
          <li>
            <span className="list-title">
              1. Foundation of Japanese Script:{' '}
            </span>
            Hiragana is one of the fundamental writing systems of the Japanese
            language. Comprised of 46 basic characters representing vowels,
            consonants, and syllables, it is indispensable for reading and
            writing Japanese.
          </li>
          <li>
            <span className="list-title">
              2. Pronunciation and Sound Representation:{' '}
            </span>
            Hiragana represents native Japanese pronunciation and is commonly
            used for grammatical endings, particles, and inflections. It allows
            for a precise understanding of pronunciation, facilitating speaking
            and listening comprehension.
          </li>
          <li>
            <span className="list-title">3. Simplicity and Entry Point: </span>
            Compared to Katakana and especially Kanji, Hiragana characters are
            often simpler and quicker to learn. This eases the introduction to
            Japanese script and builds a strong foundation for further studies.
          </li>
          <li>
            <span className="list-title">4. Everyday Usage: </span>Hiragana is
            extensively used in texts and written materials. While Katakana and
            Kanji also feature prominently, Hiragana characters form the core of
            many words and sentences, aiding comprehension.
          </li>
          <li>
            <span className="list-title">
              5. Language Structures and Grammar:
            </span>
            Hiragana is closely linked to the structure of the Japanese
            language. Learning Hiragana provides a deeper understanding of
            grammatical concepts and helps grasp the basics of Japanese syntax.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default AboutHiragana;
