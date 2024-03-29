import React from 'react';
import styles from './searchbox.module.css';

const SearchBox = ({ value, onChange }) => {
  return (
    <>
    <div className={styles.parentSearch}>
      <div className={styles.searchboxLeft}>
        <input className={styles.input} type="text" value={value} onChange={onChange} placeholder='Search' />
      </div>
      <div className={styles.tipsRight}>
      ( e.g pasta, pizza, cake, cocktail )
      </div>
   </div>
    </>
  );
};

export default SearchBox;
