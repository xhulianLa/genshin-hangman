import React, { useEffect, useRef } from 'react';
import styles from './Healthbar.module.css';

function Healthbar({ tries, max_tries }) {
    useEffect(() => {
      const healthbar = document.querySelector(`.${styles.inner_healthbar}`);
      const outer_healthbar = document.querySelector(`.${styles.healthbar}`);
      const healthPercentage = (tries / max_tries) * 100;
  
      healthbar.style.width = `${healthPercentage}%`;
  
      if (tries < max_tries) {
        outer_healthbar.classList.add(styles.shake);
        setTimeout(() => {
          outer_healthbar.classList.remove(styles.shake);
        }, 500);
      }
    }, [tries, max_tries]);
  
    return (
      <div className={styles.healthbar}>
        <p className={styles.healthbar_text}>{tries}</p>
        <div className={styles.inner_healthbar}></div>
      </div>
    );
  }
  
  export default Healthbar;