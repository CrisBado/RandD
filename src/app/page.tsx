"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Buttons";
import Data from "./Data";
interface Result {
  id: string;
  term: string;
  description: string;
  department: string;
}

export default function Home() {
  const [searchTerm, setSeachTerm] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [ item, setItems] = useState(Data);
  

  const myDepartment = ["tech", "product", "sales"];

  const filterDepartment = (department: string) => {
    setItems(Data.filter((item) => item.department === department));
    
  }

  useEffect(() => {
    console.log("searchTerm", searchTerm);
    fetch(`/api/search?term=${searchTerm}`).then((res) => {
      res.json().then((data) => {
        setResults(data);
      });
    });
  }, [searchTerm, setResults]);

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

        <Button myDepartment={myDepartment}
        filterDepartment ={filterDepartment}
        setItems={setItems}/>

        <Card item={item}/>

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
