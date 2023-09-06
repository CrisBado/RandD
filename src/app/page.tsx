"use client";

import { useEffect, useState } from "react";

interface Result {
  id: string;
  term: string;
  description: string;
}

export default function Home() {
  const [searchTerm, setSeachTerm] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    console.log("searchTerm", searchTerm);
    fetch(`/api/search?term=${searchTerm}`).then((res) => {
      res.json().then((data) => {
        setResults(data);
      });
    });
  }, [searchTerm, setResults]);

  return (
    <main>
      <div>
        <input
          type="text"
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
