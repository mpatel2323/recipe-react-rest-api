import React from 'react';
import styles from './searchbox.module.css';

const SearchBox = ({ value, onChange }) => {
  return (
    <div className={styles.searchContainer}>
        <input className={styles.input} type="text" value={value} onChange={onChange} placeholder='Search' />
    </div>
  );
};

export default SearchBox;
