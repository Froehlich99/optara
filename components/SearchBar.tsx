"use client";
import React, { useEffect, useState } from "react";
import { searchStock } from "@/lib/search";
import { debounce } from "lodash";
import { Popover } from "@headlessui/react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = debounce((query: string) => {
    searchStocks(query);
  }, 500);

  const searchStocks = async (query: string) => {
    try {
      const data = await searchStock(query);
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
    <Popover className="relative">
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
        type="search"
        id="default-search"
        className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white outline-none"
        placeholder="Search Stocks"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* <Popover.Panel static className="absolute z-10">
        <div className="grid grid-cols-2">
          <a href="/analytics">Analytics</a>
          <a href="/engagement">Engagement</a>
          <a href="/security">Security</a>
          <a href="/integrations">Integrations</a>
        </div>
      </Popover.Panel> */}
    </Popover>
  );
};

export default SearchBar;
