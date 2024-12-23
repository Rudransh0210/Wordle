import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { addCustomWord } from '../utils/words';

interface WordManagerProps {
  onWordAdded: () => void;
}

export function WordManager({ onWordAdded }: WordManagerProps) {
  const [newWord, setNewWord] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newWord.length !== 5) {
      setError('Word must be exactly 5 letters');
      return;
    }

    if (!/^[A-Za-z]+$/.test(newWord)) {
      setError('Word must contain only letters');
      return;
    }

    addCustomWord(newWord);
    setNewWord('');
    setError('');
    onWordAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="text"
          value={newWord}
          onChange={(e) => {
            setNewWord(e.target.value.toUpperCase());
            setError('');
          }}
          placeholder="Add 5-letter word"
          maxLength={5}
          className="flex-1 p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus size={20} />
          Add
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </form>
  );
}