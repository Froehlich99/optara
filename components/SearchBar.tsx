"use client";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useFloating, useInteractions } from "@floating-ui/react";
import { FloatingFocusManager } from "@floating-ui/react";
import { size } from "@floating-ui/dom";
import { autoUpdate } from "@floating-ui/dom";
import { useFocus, useDismiss } from "@floating-ui/react";
import { getStock } from "@/app/actions";
import SearchPopup from "./SearchPopup";
import { AnimatePresence } from "framer-motion";

const SearchBar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stocks, setStocks] = useState([]);

  const { refs, context } = useFloating({
    open: isPopupOpen,
    onOpenChange: setIsPopupOpen,
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

  const focus = useFocus(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    focus,
    dismiss,
  ]);

  const debouncedSearch = React.useCallback(
    debounce((query: string) => {
      searchStocks(query);
    }, 300),
    []
  );

  const searchStocks = async (query: string) => {
    if (query.trim().length === 0) {
      setStocks([]);
      return;
    }

    try {
      const data: any = await getStock(query);
      setStocks(data);
    } catch (error) {
      console.error(error); // Logs any error
      setStocks([]);
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
        {...getReferenceProps()}
        placeholder="Search Stocks"
        onChange={(e) => {
          setSearchQuery(e.target.value.trim());
          setIsPopupOpen(true);
        }}
      />
      <AnimatePresence>
        {isPopupOpen && (
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
          >
            <SearchPopup
              refs={refs}
              floatingProps={{ ...getFloatingProps() }}
              stocks={stocks}
            />
          </FloatingFocusManager>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
