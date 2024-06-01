import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import "./searchbar.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    performSearch();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      performSearch();
    }
  };

  const performSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <Box component="form" onSubmit={handleSearchSubmit} className="search-form">
      <InputBase
        placeholder="Bạn đang tìm gì?"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
        onKeyDown={handleKeyDown}
        endAdornment={
          <IconButton type="submit" onClick={performSearch}>
            <Search />
          </IconButton>
        }
      />
    </Box>
  );
};

export default SearchBar;
