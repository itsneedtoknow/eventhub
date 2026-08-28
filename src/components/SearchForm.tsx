//import { useState } from "react";
import styles from "./SearchForm.module.css";
interface ISearchProps {
  searchQuery: string;
  onSearchChange: (e: string) => void;
}
export function SearchForm({ searchQuery, onSearchChange }: ISearchProps) {
  return (
    <>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Поиск мероприятий..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </>
  );
}
