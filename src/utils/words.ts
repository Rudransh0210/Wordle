// List of 5-letter words for the game
let customWords: string[] = [];

export const WORDS = [
  'REACT', 'WORLD', 'PLANE', 'BRAIN', 'STEAM', 'FLAME', 'CLOUD', 'SPACE',
  'DREAM', 'LIGHT', 'MUSIC', 'DANCE', 'BEACH', 'STORM', 'PAINT', 'HEART'
];

export const addCustomWord = (word: string) => {
  const formattedWord = word.toUpperCase();
  if (!customWords.includes(formattedWord)) {
    customWords.push(formattedWord);
  }
};

export const getRandomWord = () => {
  const allWords = [...WORDS, ...customWords];
  return allWords[Math.floor(Math.random() * allWords.length)];
};