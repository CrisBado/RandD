"use client";

import useDebounce from "@/app/hooks/useDebounce";
import React, { useState, useEffect } from "react";
import MarkdownEditor from '@uiw/react-markdown-editor';
interface ConfluenceResult {
  _id: string;
  title: string;
  innerHTML: string;
}

function ConfluencePage() {
  const [confluenceData, setConfluenceData] = useState<ConfluenceResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedData, setSortedData] = useState<ConfluenceResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<ConfluenceResult | null>(
    null
  );

  const handleResultClick = (result: ConfluenceResult) => {
    setSelectedResult(result);
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mongodb");
        if (response.ok) {
          const data = await response.json();
          setConfluenceData(data);
          setSortedData(data);
          console.log("response ok?");
        } else {
          console.error(
            "Failed to fetch Confluence data:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  // Sort the data based on the search query
  useEffect(() => {
    const sorted = confluenceData.slice().sort((a, b) => {
      const aStartsWithQuery = a.title
        .toLowerCase()
        .startsWith(debouncedSearchQuery.toLowerCase());
      const bStartsWithQuery = b.title
        .toLowerCase()
        .startsWith(debouncedSearchQuery.toLowerCase());

      if (aStartsWithQuery && !bStartsWithQuery) {
        return -1;
      } else if (!aStartsWithQuery && bStartsWithQuery) {
        return 1;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    setSortedData(sorted);
  }, [confluenceData, debouncedSearchQuery]);

  // Render the selected result
  function SelectedResultDetails({ result }: { result: ConfluenceResult }) {
    const [markdown, setMarkdown] = useState(result.innerHTML);

    return (
      <div>
        {result ? (
          <>
          <ul className="w-full">
            <li key={result._id} className="p-4">
              <h3 className="text-2xl font-semibold text-gray-700 mb-1">
                {result.title}
              </h3>
              <p
                dangerouslySetInnerHTML={{ __html: result.innerHTML }}
                className="text-lg text-gray-500 leading-relaxed"
              />
            </li>
          </ul>
             <MarkdownEditor
             value={markdown}
             height="200px"
             onChange={(value, viewUpdate) => setMarkdown(value)}
             enableScroll={false}
             className="w-[800px]"
           />
           </>
        ) : (
          <p>No results found</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-fill p-2 mb-4 border rounded-lg"
        />

        {searchQuery ? (
          <ul className="w-full">
            {sortedData.slice(0, 20).map((result) => (
              <li key={result._id} className="py-2 px-4">
                <h3
                  className="text-2xl font-semibold text-gray-700 mb-1 cursor-pointer hover:text-gray-500"
                  onClick={() => handleResultClick(result)}
                >
                  {result.title}
                </h3>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="w-full">
            {sortedData.map((result) => (
              <li key={result._id} className="py-2 px-4">
                <h3
                  className="text-2xl font-semibold text-gray-700 mb-1 cursor-pointer hover:text-gray-500"
                  onClick={() => handleResultClick(result)}
                >
                  {result.title}
                </h3>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-span-2 pt-10  justify-center">
        {selectedResult ? (
          <SelectedResultDetails result={selectedResult} />
        ) : (
          <h3 className="text-2xl font-semibold text-gray-700 mb-1">
            Search Glossary And Click a Result
          </h3>
        )}
      </div>
    </div>
  );
}

export default ConfluencePage;
