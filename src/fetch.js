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
  try {
    const response = await fetch('japanesedata.json');
    if (!response.ok) {
      throw new Error('Response not OK');
    }
    const data = await response.json();

    return {
      hiraganaAlphabet: data.hiraganaAlphabet,
      katakanaAlphabet: data.katakanaAlphabet,
      vocabulary: data.vocabulary,
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
