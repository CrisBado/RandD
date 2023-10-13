"use client";

import React, { useState, useEffect } from "react";

interface ConfluenceResult {
  text: string;
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
    <div>
      {confluenceData ? (
        <ul>
          {confluenceData.map((result, index) => (
            <li key={index}>
              <h3 className="text-lg font-normal text-gray-800">
                {result.text}
              </h3>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default ConfluencePage;
