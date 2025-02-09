import React from "react";
import styles from "./Results.module.css";

function Results({word, tries, resetGame, currentCategory}) {
    let message = tries > 0 ? "You win!": "You lose!";
    return ( 
        <div className={styles.results}>
            <h1 className={styles.message}>{message}</h1>
            <h1>It took you {tries} tries!</h1>
            <button className={styles.results_button} onClick={() => resetGame(currentCategory)}>Play Again</button>
        </div>
     );
}

export default Results;