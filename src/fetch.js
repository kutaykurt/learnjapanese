/* export async function fetchJapaneseData() {
    try {
      const response = await fetch('japanesedata.json');
      if (!response.ok) {
        throw new Error('Response not OK');
      }
      const data = await response.json();
      return data.alphabet;
    } catch (error) {
      console.error('Error fetching japaneseData:', error);
      // Handle the error or set a default value
      return [];
    }
  } */

export async function fetchJapaneseData() {
  function filterDuplicates(vocabulary) {
    return vocabulary.filter(
      (item, index, array) =>
        index ===
        array.findIndex(
          (element) =>
            element.japaneseHiragana === item.japaneseHiragana &&
            element.japaneseKatakana === item.japaneseKatakana &&
            element.pronunciation === item.pronunciation &&
            element.translation.german === item.translation.german &&
            element.translation.english === item.translation.english
        )
    );
  }

  try {
    const response = await fetch('japanesedata.json');
    if (!response.ok) {
      throw new Error('Response not OK');
    }
    const data = await response.json();

    // Filtern von Duplikaten im Vokabular
    const filteredVocabulary = filterDuplicates(data.vocabulary);

    return {
      hiraganaAlphabet: data.hiraganaAlphabet,
      katakanaAlphabet: data.katakanaAlphabet,
      vocabulary: filteredVocabulary,
    };
  } catch (error) {
    console.error('Error fetching japaneseData:', error);
    return {
      hiraganaAlphabet: [],
      katakanaAlphabet: [],
      vocabulary: [],
    };
  }
}