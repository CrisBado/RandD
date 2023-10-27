"use client";

import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

import Link from "next/link";

import { Link as ThemedLink } from "@radix-ui/themes";
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

  return (
    <main className="flex-col text-center">
      <SearchHeader onSearch={setSeachTerm} />

      <Link href="/confluence">
        <ThemedLink underline="always">Confluence Data here</ThemedLink>
      </Link>

      <div className="grid w-full items-center gap-1.5">
        {searchTerm && <p>Showing results for {searchTerm}</p>}

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
