import React from "react";
import styles from "./Keyboard.module.css";
import { useEffect } from "react";

function Keyboard({ onGuess, guessedLetters }) {
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e);
      console.log(e.key);
      const letter = e.key.toUpperCase();
      if (alphabet.includes(letter) && !guessedLetters.includes(letter.toLowerCase())) {
        onGuess(letter);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [guessedLetters, onGuess]);

  return (
    <div className={styles.Keyboard}>
      {alphabet.map((letter, index) => (
        <button disabled={guessedLetters.includes(letter.toLowerCase())} className={styles.letter} key={index} onClick = {() => onGuess(letter)}>
          {letter}
        </button>
      ))}
    </div>
  );
}

export default Keyboard;
