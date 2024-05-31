import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

interface SearchBarProps {
  query: string | null;
  setQuery: (
    value: string | null | ((prev: string | null) => string | null)
  ) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  const [inputValue, setInputValue] = useState(query);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setQuery(inputValue);
    }
  };

  return (
    <div className="flex mx-auto">
      <Input
        type="text"
        placeholder="Search..."
        className="border p-2 rounded-md flex-grow"
        value={inputValue || ""}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown} // Add the onKeyDown event listener
      />
      <Button onClick={() => {setQuery(inputValue)}}>Search</Button>
    </div>
  );
};

export default SearchBar;
