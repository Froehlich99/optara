"use client";
import React, { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useFloating } from "@floating-ui/react";
import SearchBar from "./SearchBar";
import PopupMenu from "./PopupMenu";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const showNavbar = pathname !== "/";
  const [isOpen, setisOpen] = useState(false);
  const { refs, floatingStyles } = useFloating();

  return (
    showNavbar && (
      <nav
        ref={refs.setReference}
        className="flexBetween max-container padding-container relative z-30 py-3"
      >
        <div className="flex flex-row items-center min-w-0 z-20">
          <Link href={"/"}>
            <Image
              className="p-0 m-0"
              src={"/images/cb-cropped.svg"}
              alt="logo"
              width={80}
              height={80}
            ></Image>
          </Link>
          <div
            className="min-w-0 px-3 w-[28rem] md:px-5"
            onClick={() => setisOpen(false)}
          >
            <SearchBar />
          </div>
        </div>
        <ul className="hidden h-full gap-12 md:flex items-center">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className="regular-16 text-gray-50 flexCenter cursor-pointer transition-all hover:font-bold"
            >
              {link.label}
            </Link>
          ))}
          <UserButton afterSignOutUrl="/" />
        </ul>

        <Image
          src={!isOpen ? "/menu.svg" : "/close.svg"}
          alt="menu"
          width={25}
          height={20}
          className="inline-block cursor-pointer md:hidden z-20"
          onClick={() => setisOpen(!isOpen)}
        />
        <PopupMenu
          isOpen={isOpen}
          setisOpen={setisOpen}
          refs={refs}
          floatingStyles={floatingStyles}
          NAV_LINKS={NAV_LINKS}
        />
        {isOpen && (
          <div
            className="fixed h-full w-full flex items-center justify-center top-0 left-0 z-10"
            onClick={() => setisOpen(false)}
          ></div>
        )}
      </nav>
    )
  );
};

export default Navbar;
