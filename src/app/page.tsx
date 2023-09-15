"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";

interface Result {
  id: string;
  term: string;
  description: string;
}

export default function Home() {
  const [searchTerm, setSeachTerm] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  const debounceDelay = 500;
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetch(`/api/search?term=${debouncedSearchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
        });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <main className={styles.main}>
      <div>
        <input
          type="text"
          className={styles.input}
          onChange={(e) => {
            setSeachTerm(e.target.value);
          }}
          value={searchTerm}
        />
        <p>Showing results for {searchTerm}</p>
      </div>
      <div>
        {results && results.length > 0 ? (
          <ul>
            {results.map((result) => (
              <li key={result.id}>
                {result.term}
                {result.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </main>
  );
}
