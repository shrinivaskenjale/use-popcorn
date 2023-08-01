import { useRef } from "react";
import { useKey } from "../hooks/useKey";

const SearchBox = ({ query, onQueryChange }) => {
  const inputEl = useRef();

  useKey("Enter", () => {
    // Don't do anything if already input is focused.
    if (document.activeElement === inputEl.current) {
      return;
    }
    inputEl.current.focus();
    onQueryChange("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      ref={inputEl}
    />
  );
};

export default SearchBox;
