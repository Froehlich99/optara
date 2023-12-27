"use client";
import React, { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useFloating } from "@floating-ui/react";
import SearchBar from "./SearchBar";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);
  const { refs, floatingStyles } = useFloating();
  const popup = useRef<HTMLDivElement | null>(null);
  const icon = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Function to check if clicked outside
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popup.current?.contains(e.target as Node) ||
        icon.current?.contains(e.target as Node)
      ) {
        return;
      }
      setisOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav
      ref={refs.setReference}
      className="flexBetween max-container padding-container relative z-30 py-3"
    >
      <div className="flex flex-row items-center min-w-0">
        <Link href={"/"}>
          <Image src={"/cb-logo.svg"} alt="logo" width={70} height={20}></Image>
        </Link>
        <div className="min-w-0 px-3 w-[28rem] lg:px-10">
          <SearchBar />
        </div>
      </div>
      <ul className="hidden h-full gap-12 md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul>
      <Image
        src={"/menu.svg"}
        alt="menu"
        width={25}
        height={20}
        ref={icon}
        className="inline-block cursor-pointer md:hidden"
        onClick={() => setisOpen(!isOpen)}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
            }}
            ref={popup}
          >
            <ul
              ref={refs.setFloating}
              style={floatingStyles}
              className="absolute bg-white w-full text-start border-b border-gray-300"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  href={link.href}
                  key={link.key}
                  onClick={() => setisOpen(false)}
                  className="hover:bg-gray-300 regular-16 py-2 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
                >
                  {link.label}
                </Link>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
