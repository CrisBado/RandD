"use client";

import { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import { Input } from "@/components/ui/input";

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
    <main className="flex-col text-center">
      <div className="grid w-full items-center gap-1.5 p-10">
        <div className="max-w-2xl mx-auto">
          <Input
            className="w-full"
            type="text"
            onChange={(e) => {
              setSeachTerm(e.target.value);
            }}
            value={searchTerm}
          />
        </div>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <p>Showing results for {searchTerm}</p>
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
