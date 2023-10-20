"use client";

import React, { useState, useEffect } from "react";

interface ConfluenceResult {
  id: string;
  title: string;
  innerHTML: string;
}

function ConfluencePage() {
  const [confluenceData, setConfluenceData] = useState<ConfluenceResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/confluence");
        if (response.ok) {
          const data = await response.json();
          setConfluenceData(data);
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

  console.log("confluenceData", confluenceData);

  return (
    <div className="flex">
      <div>
        {confluenceData ? (
          <ul className="space-y-4">
            {confluenceData.map((result) => (
              <li key={result.id} className="p-4">
                <h3 className="text-2xl font-semibold text-gray-700">
                  {result.title}
                </h3>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
      <div>
        {confluenceData ? (
          <ul className="space-y-4">
            {confluenceData.map((result) => (
              <li key={result.id} className="p-4 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-700 mb-1">
                  {result.title}
                </h3>
                <p
                  dangerouslySetInnerHTML={{ __html: result.innerHTML }}
                  className="text-lg text-gray-500 leading-relaxed"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default ConfluencePage;
