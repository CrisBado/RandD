"use client";

import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

import Link from "next/link";

import SearchHeader from "@/components/ui/SearchHeader/SearchHeader";
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

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <main className="flex flex-col gap-8">
      <Link href="/confluence">Confluence Data here</Link>

      <SearchHeader onSearch={setSeachTerm} />

      <div className="max-w-4xl w-full mx-auto">
        <div className="flex gap-4">
          <ul className="font-medium text-center">
            {alphabet.map((letter) => (
              <li key={letter}>
                <Link href={`#${letter}`}>{letter}</Link>
              </li>
            ))}
          </ul>
          <div className="grid w-full items-center gap-1.5">
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
              <div className="p-10 text-center">
                <p>No results found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
