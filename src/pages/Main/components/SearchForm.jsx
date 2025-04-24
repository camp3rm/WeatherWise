import React from 'react';
import styles from '../main.module.scss';
import search_icon from '@assets/svg/search-icon.svg';


export const SearchForm = ({ headerText, searchTerm, onSearch, onSubmit }) => {
   return (
    <div className={styles.form_field}>
       <h2>{headerText}</h2>
       <form className={styles.form} onSubmit={onSubmit}>
         <input
           className={styles.city_name}
           type="text"
           value={searchTerm}
           onChange={onSearch}
           placeholder="Enter city name"
         />
         <button className={styles.search_button} type="submit">
           <img src={search_icon} alt="Search" />
         </button>
       </form>
     </div>
   );
 };