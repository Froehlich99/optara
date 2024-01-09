"use client";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useFloating } from "@floating-ui/react";
import { size } from "@floating-ui/dom";
import { autoUpdate } from "@floating-ui/dom";
import { getStocks } from "@/app/actions";
import SearchPopup from "./SearchPopup";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setisPopupOpen] = useState(false);
  const [stocks, setStocks] = useState([]);
  const { refs } = useFloating({
    middleware: [
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const debouncedSearch = React.useCallback(
    debounce((query: string) => {
      searchStocks(query);
    }, 300),
    []
  );

  const searchStocks = async (query: string) => {
    try {
      const data = await getStocks(query);
      setStocks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    }
  }, [searchQuery, debouncedSearch]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        autoComplete="off"
        type="search"
        id="default-search"
        className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white outline-none"
        ref={refs.setReference}
        placeholder="Search Stocks"
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setisPopupOpen(true)}
        onBlur={() => setisPopupOpen(false)}
      />
      <SearchPopup isPopupOpen={isPopupOpen} refs={refs} stocks={stocks} />
    </div>
  );
};

export default SearchBar;
