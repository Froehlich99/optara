import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-3">
      <div className="flex flex-row items-center">
        <Link href={"/"}>
          <Image src={"/cb-logo.svg"} alt="logo" width={70} height={20}></Image>
        </Link>
        <div className="px-3 lg:px-10">
          <SearchBar />
        </div>
      </div>
      <ul className="hidden h-full gap-12 lg:flex">
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
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  );
};

export default Navbar;
