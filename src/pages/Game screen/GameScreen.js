import React, { useState, useEffect } from "react";
import styles from "./GameScreen.module.css";
import Keyboard from "../../components/Keyboard/Keyboard";
import Letters from "../../components/Letters/Letters";
import Healthbar from "../../components/Healthbar/Healthbar";
import Results from "../../components/Results/Results";
import Menu from "../../components/Menu/Menu";
import data_genshin from "../../assets/data/genshin_words2.json";

function GameScreen() {
  const [selectedCategory, setSelectedCategory] = useState('characters'); // Default category

  const word_selector = (category) => {
    const wordlist = data_genshin.categories[category];
    return wordlist[Math.floor(Math.random() * wordlist.length)];
  };

  const calculateAttempts = (word, multiplier = 1.2, buffer = 2) => {
    let wordlength = word.replace(/[^a-zA-Z]/g, '').length; // Exclude non-letter characters
    let attempts = Math.min(Math.floor(wordlength * multiplier + buffer), 12);
    return attempts;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [word, setWord] = useState('');
  const [tries, setTries] = useState(0);
  const [fullAttempts, setFullAttempts] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);

  const resetGame = (category = selectedCategory) => {
    const newWord = word_selector(category);
    const newAttempts = calculateAttempts(newWord);

    setWord(newWord);
    setTries(newAttempts);
    setFullAttempts(newAttempts);
    setGuessedLetters([]);
    setGameFinished(false);
  };

  useEffect(() => {
    resetGame();
  }, [selectedCategory]);

  useEffect(() => {
    if (word === '') return; // Ensure word is set before checking win/loss conditions
    console.log(word);
    // Check for win condition
    const formattedWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const allLettersGuessed = formattedWord.split('').every((letter) => guessedLetters.includes(letter));

    if (allLettersGuessed) {
      setTimeout(() => {
        setGameFinished(true);
      }, 300);
    }

    // Check for loss condition
    if (tries === 0 && guessedLetters.length > 0) { // Ensure tries are set before checking loss condition
      setTimeout(() => {
        setGameFinished(true);
      }, 300);
    }
  }, [guessedLetters, tries, word]);

  const handleGuess = (letter) => {
    const lowerCaseLetter = letter.toLowerCase();
    if (!guessedLetters.includes(lowerCaseLetter)) {
      setGuessedLetters([...guessedLetters, lowerCaseLetter]);
      if (!word.toLowerCase().includes(lowerCaseLetter)) {
        setTries(tries - 1);
      }
    }
  };

  return (
    <div className={styles.GameScreen}>
      <div className={styles.navbar}>
        <Menu onCategoryChange={setSelectedCategory} resetGame={resetGame} />
        <h1 className={styles.categoryText}>{capitalizeFirstLetter(selectedCategory)}</h1>
        <h1 className={styles.logo}>Genshin Hangman</h1>
        <Healthbar tries={tries} max_tries={fullAttempts} />
      </div>
      <Letters word={word} guessedLetters={guessedLetters} />
      <Keyboard onGuess={handleGuess} guessedLetters={guessedLetters} />
      {gameFinished && <Results word={word} tries={tries} resetGame={resetGame} currentCategory={selectedCategory} />}
    </div>
  );
}

export default GameScreen;