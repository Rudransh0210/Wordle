import React, { useState, useEffect } from 'react';
import { Grid } from './components/Grid';
import { Keyboard } from './components/Keyboard';
import { WordManager } from './components/WordManager';
import { getRandomWord } from './utils/words';
import { AlertCircle } from 'lucide-react';

function App() {
  const [solution, setSolution] = useState(() => getRandomWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const resetGame = () => {
    setSolution(getRandomWord());
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setMessage('');
  };

  const usedLetters = guesses.reduce((acc, guess) => {
    guess.split('').forEach((letter, i) => {
      if (letter === solution[i]) {
        acc[letter] = 'correct';
      } else if (solution.includes(letter) && acc[letter] !== 'correct') {
        acc[letter] = 'present';
      } else if (!solution.includes(letter)) {
        acc[letter] = 'absent';
      }
    });
    return acc;
  }, {} as { [key: string]: 'correct' | 'present' | 'absent' });

  const handleKeyPress = (key: string) => {
    if (gameOver) return;

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        setMessage('Word must be 5 letters');
        return;
      }

      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (currentGuess === solution) {
        setGameOver(true);
        setMessage('Congratulations! You won! 🎉');
      } else if (newGuesses.length === 6) {
        setGameOver(true);
        setMessage(`Game Over! The word was ${solution}`);
      }
    } else if (key === '⌫') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        handleKeyPress('⌫');
      } else if (/^[A-Za-z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameOver]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Wordle Clone</h1>
      
      {message && (
        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
          message.includes('Congratulations') 
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          <AlertCircle size={20} />
          {message}
        </div>
      )}

      <WordManager onWordAdded={() => {
        setMessage('Word added successfully! Starting new game...');
        setTimeout(resetGame, 1500);
      }} />

      <div className="flex flex-col items-center max-w-lg w-full">
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          solution={solution}
          maxGuesses={6}
        />
        <Keyboard
          usedLetters={usedLetters}
          onKeyPress={handleKeyPress}
        />
        
        {gameOver && (
          <button
            onClick={resetGame}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            New Game
          </button>
        )}
      </div>
    </div>
  );
}

export default App;