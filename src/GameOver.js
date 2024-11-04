import React from 'react';
import { guessWords } from './constants';
import { shuffle } from './utils';

function GameOver({ points, setGameState, isGameOver}) {

  const playAgainAction = () => {
    const newShuffledGuessWords = shuffle(guessWords);
    const newShuffledGuessWord = shuffle(newShuffledGuessWords[0]);

    setGameState({
      words: newShuffledGuessWords,
      currentWordToGuess: newShuffledGuessWord,
      points: 0,
      strikes: 0,
      passes: 3,
      isGameOver: false,
    });
  };

  return (
    <div className='container'>
    <div className='d-flex align-items-center flex-column'>
      <div className='d-flex mt-5'>
        {isGameOver ? (<h1>Game Over</h1>) : (<h1>You won!</h1>)}
      </div>
      <div className='d-flex m-2'>
        <div>Total Points: {points}</div>
      </div>
      <div className='d-flex m-2'>
        <button onClick={playAgainAction}>Play Again</button>
      </div>
    </div>
  </div>
  );
}

export default GameOver;