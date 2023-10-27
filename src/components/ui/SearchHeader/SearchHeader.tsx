"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/input";

import { Heading, Badge } from "@radix-ui/themes";
interface Result {
  id: string;
  term: string;
  description: string;
}

export default function SearchHeader({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) {
  const [searchTerm, setSeachTerm] = useState("");
  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm]);

  const filters = ["these", "will", "be", "the", "filters"];

  return (
    <div className="w-full items-center gap-5 p-10 bg-gray-100 grid">
      <div className="max-w-2xl mx-auto w-full text-left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 46 9"
          fill="none"
          aria-label="15 Gifts Logo"
          className="w-[180px] mb-8"
        >
          <path
            fill="currentColor"
            d="M10.703 4.45c0 2.8 2.13 4.443 4.382 4.443 2.582 0 4.161-1.965 4.161-4.487 0-.08-.006-.166-.012-.253h-3.733v.927h2.668c-.153 1.774-1.273 2.862-3.084 2.862-1.879 0-3.348-1.41-3.348-3.492 0-2.083 1.469-3.492 3.39-3.492 1.065 0 1.99.457 2.595 1.199l.729-.705C17.667.544 16.486 0 15.128 0c-2.528 0-4.425 1.848-4.425 4.45ZM21.944.228h-.9v8.665h.9V.228Zm8.314 3.831h-4.645V1.17h4.874V.228h-5.845v8.665h.971V5h4.645v-.94ZM38.356.228h-6.97v.94h2.993v7.725h.985V1.17h2.992V.228Zm7.479.719C45.047.39 44.063 0 42.762 0c-1.79 0-3.238.922-3.238 2.568 0 1.436 1.063 2.123 2.523 2.29l.862.1c1.356.154 2.07.575 2.07 1.416 0 1.034-1.044 1.579-2.37 1.579-1.111 0-2.223-.458-2.816-.966l-.538.792c.807.669 2.12 1.114 3.36 1.114 1.846 0 3.385-.89 3.385-2.605 0-1.498-1.258-2.104-2.67-2.278l-.812-.099c-1.332-.16-1.974-.6-1.974-1.405 0-.977.923-1.565 2.212-1.565 1.026 0 1.888.334 2.578.81l.501-.804ZM3.638 8.467c-.665-.497-1.045-1.217-1.14-2.162h2.087c.066.384.24.671.522.86.06.039.123.075.188.106l-.901 1.621a3.441 3.441 0 0 1-.756-.426ZM0 8.892V.001h1.897v8.892H0Zm6.765-6.058c-.79 0-1.379.18-1.766.539h-.025l.303-1.597h3.072L9.337 0H3.746l-.883 4.977h2c.284-.368.733-.552 1.346-.552.213 0 .41.048.588.143l.884-1.59a2.887 2.887 0 0 0-.916-.143Z"
          />
        </svg>
        <Heading>Glossary</Heading>
        <p>Search to your hearts desire</p>
      </div>
      <div className="max-w-xl w-full mx-auto text-left flex flex-col gap-2">
        <label>
          <span>Search for a term</span>
          <Input
            placeholder="e.g. PNC, or Launchpad"
            type="text"
            onChange={setSeachTerm}
            value={searchTerm}
            withClearButton
          />
        </label>

        <ul className="flex gap-2">
          {filters.map((filter) => (
            <li key={filter}>
              <Badge radius="full" color="indigo" size="2">
                {filter}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
