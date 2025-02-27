import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Look for it..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 rounded-md bg-[#7A9ACE] font-semibold text-white focus:outline-none"
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute right-3 top-3 text-white"
      />
    </div>
  );
};

export default Search;
