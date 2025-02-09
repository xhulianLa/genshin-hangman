import React, { useState } from 'react';
import styles from './Menu.module.css';
import data_genshin from "../../assets/data/genshin_words2.json";

function Menu({ onCategoryChange, resetGame }) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = Object.keys(data_genshin.categories)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    resetGame(category);
    setIsOpen(false); // Close the menu
  };
  
  return (
    <div className={styles.menuContainer}>
      <button
        className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div
        className={`${styles.menuOverlay} ${isOpen ? styles.active : ''}`}
      ></div>
      {isOpen && (
        <ul className={`${styles.menuItems} ${isOpen ? styles.active : ''}`}>
          {categories.map((category) => (
            <li key={category} onClick={() => handleCategorySelect(category)}>
              <a>{category.charAt(0).toUpperCase() + category.slice(1)}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Menu;