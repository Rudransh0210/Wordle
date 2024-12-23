import React from 'react';

interface GridProps {
  guesses: string[];
  currentGuess: string;
  solution: string;
  maxGuesses: number;
}

export function Grid({ guesses, currentGuess, solution, maxGuesses }: GridProps) {
  const getCellClass = (letter: string, index: number, isComplete: boolean) => {
    if (!isComplete) return 'border-2 border-gray-300 bg-white';
    
    if (letter === solution[index]) {
      return 'bg-green-500 border-green-500 text-white';
    }
    if (solution.includes(letter)) {
      return 'bg-yellow-500 border-yellow-500 text-white';
    }
    return 'bg-gray-500 border-gray-500 text-white';
  };

  const empties = maxGuesses - guesses.length - (currentGuess ? 1 : 0);
  const currentGuessArray = currentGuess.split('').concat(Array(5 - currentGuess.length).fill(''));

  return (
    <div className="grid gap-2 mb-8">
      {guesses.map((guess, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          {guess.split('').map((letter, j) => (
            <div
              key={j}
              className={`w-14 h-14 flex items-center justify-center text-2xl font-bold uppercase
                ${getCellClass(letter, j, true)}`}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
      
      {currentGuess && (
        <div className="grid grid-cols-5 gap-2">
          {currentGuessArray.map((letter, i) => (
            <div
              key={i}
              className={`w-14 h-14 flex items-center justify-center text-2xl font-bold uppercase
                border-2 border-gray-300 bg-white`}
            >
              {letter}
            </div>
          ))}
        </div>
      )}

      {[...Array(empties)].map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          {[...Array(5)].map((_, j) => (
            <div
              key={j}
              className="w-14 h-14 border-2 border-gray-200 bg-white"
            />
          ))}
        </div>
      ))}
    </div>
  );
}