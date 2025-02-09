import React from "react";
import styles from "./Letters.module.css";

function Letters({ word, guessedLetters }) {
  // Split the word into individual words, including spaces and special characters
  const words = word.split(" ");

  return (
    <div className={styles.letters}>
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className={styles.word}>
          {word.split("").map((char, charIndex) => {
            const lowerCaseChar = char.toLowerCase();
            const isGuessed = guessedLetters.includes(lowerCaseChar);
            const isLetter = /[a-zA-Z]/.test(char);

            return (
              <span
                key={charIndex}
                className={isGuessed || !isLetter ? styles.letterFound : styles.letter}
              >
                {isGuessed || !isLetter ? char : ""}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Letters;