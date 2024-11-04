import React, { useState, useEffect } from "react";
import { shuffle } from "./utils";
import { guessWords } from "./constants";
import GameOver from "./GameOver";

const maxErrors = 1;

function App() {
  const shuffled = shuffle(guessWords);

  const [gameState, setGameState] = useState({
    words: shuffled,
    currentWordToGuess: shuffle(shuffled[0]),
    points: 0,
    strikes: 0,
    passes: 3,
    isGameOver: false,
  });

  const [guessedWord, setGuessedWord] = useState("");

  const handleGuessInput = (event) => {
    setGuessedWord(event.target.value);
  };

  const onClickGuessWord = (event) => {
    event.preventDefault();

    if (!guessedWord) {
      return alert("Please enter a guess");
    }

    const { points, strikes, words, currentWordToGuess } = gameState;

    if (guessedWord.toLocaleLowerCase() === words[0].toLocaleLowerCase()) {
      const newWords = [...words];
      newWords.shift();
      const newWord = newWords?.[0];
      const newWordToGuess = newWord ? shuffle(newWords[0]) : "";

      setGameState((prevState) => ({
        ...prevState,
        words: newWords,
        currentWordToGuess: newWordToGuess,
        points: points + 1,
      }));

      alert("Correct Guess");
    } else {
      setGameState((prevState) => ({
        ...prevState,
        strikes: strikes + 1,
        isGameOver: strikes >= maxErrors,
      }));
      alert("Incorrect Guess");
    }
    setGuessedWord("");
  };

  const handlePass = () => {
    const { passes, words } = gameState;

    let newWords = [...words];
    newWords.shift();

    if (newWords.length === 0) {
      setGameState((prevState) => ({
        ...prevState,
        isGameOver: true,
      }));
      return;
    }

    const newWordToGuess = shuffle(newWords[0]);

    if (passes > 0) {
      setGameState((prevState) => ({
        ...prevState,
        words: newWords,
        currentWordToGuess: newWordToGuess,
        passes: passes - 1,
      }));
    }
  };

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("scrambleGame"));
    if (savedState) {
      setGameState(savedState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("scrambleGame", JSON.stringify(gameState));
  }, [gameState]);

  const { currentWordToGuess, points, strikes, passes, isGameOver, words } =
    gameState;

  if (isGameOver) {
    return (
      <GameOver
        points={points}
        setGameState={setGameState}
        isGameOver={isGameOver}
      />
    );
  }

  if (words.length === 0 && !isGameOver && passes > 0) {
    return (
      <GameOver
        points={points}
        setGameState={setGameState}
        isGameOver={false}
      />
    );
  }

  return (
    <div className="container p-3 mb-2 bg-white text-dark">
      <div className="d-flex align-items-center flex-column">
        <div className="d-flex mt-5">
          <h1 className="text text-primary">Scramble Game</h1>
        </div>
        <div className="d-flex flex-row gap-3 m-3">
          <div>Points: {points}</div>
          <div>Strikes: {strikes}</div>
        </div>
        <div className="d-flex m-2">
          <div>Current Word: {currentWordToGuess}</div>
        </div>
        <div className="d-flex m-2">
          <input type="text" onChange={handleGuessInput} value={guessedWord} />
        </div>
        <div className="d-flex flex-row m-1 gap-3">
          <div>
            <button className="btn btn-success" onClick={onClickGuessWord}>Guess</button>
          </div>
          <div>
            <button className="btn btn-warning" onClick={handlePass} disabled={passes === 0}>
              [{passes}] Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
