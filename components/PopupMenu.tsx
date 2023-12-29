import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import TextUserButton from "./TextUserButton";

type PopupMenuProps = {
  isOpen: boolean;
  setisOpen: React.Dispatch<React.SetStateAction<boolean>>;
  floatingStyles: React.CSSProperties;
  refs: {
    setFloating: (el: HTMLElement | null) => void;
    setReference: (el: HTMLElement | null) => void;
  };
  NAV_LINKS: {
    href: string;
    key: string;
    label: string;
  }[];
};

const PopupMenu = ({
  isOpen,
  setisOpen,
  refs,
  floatingStyles,
  NAV_LINKS,
}: PopupMenuProps) => {
  return (
    isOpen && (
      <ul
        ref={refs.setFloating}
        style={floatingStyles}
        className="text-left absolute bg-white w-full border-b border-gray-300 flex flex-col z-20"
      >
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            onClick={() => setisOpen(false)}
            className="hover:bg-gray-300 regular-16 py-2 px-5 text-gray-50 cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
        <TextUserButton />
      </ul>
    )
  );
};

export default PopupMenu;
