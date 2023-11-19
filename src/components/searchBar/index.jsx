import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    // Initialize inputValue with query from URL on component mount
    const queryFromUrl = searchParams.get("query");
    setInputValue(queryFromUrl || "");
  }, [searchParams]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setSearchParams(e.target.value ? { query: e.target.value } : {});
    }, 500); // Adjust debounce time as needed
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setSearchParams(inputValue ? { query: inputValue } : {});
  };

  useEffect(() => {
    // Focus input when '/' is pressed
    const handleKeyDown = (event) => {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <form className="w-full" onSubmit={handleSearch}>
      <div className="flex items-center border-1 border-[#A3A3A3] bg-white rounded-lg">
        <input
          ref={inputRef}
          type="text"
          placeholder="Use '/' to focus"
          value={inputValue}
          onChange={handleChange}
          className="w-full py-2 px-4 bg-white text-gray-500 placeholder-[#737373] border border-[#A3A3A3] rounded-lg focus:outline-none focus:border-gray-400"
        />
      </div>
    </form>
  );
}
