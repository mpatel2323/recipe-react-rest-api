import styles from './headernav.module.css';
import { useState } from 'react';


export default function HeaderNav({value , onChange}){

    return <div className={styles.header}>Recipe App
        <label className={styles.checkboxRight} >
          <input type="checkbox" checked={value} onChange={onChange}  />
          Load Sample Data From File
        </label>
    </div>
}