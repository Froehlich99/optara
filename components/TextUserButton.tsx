import { useCallback } from "react";
import { ClerkProvider } from "@clerk/nextjs";

declare global {
  interface Window {
    Clerk: {
      openUserProfile: () => void;
    };
  }
}

const TextUserButton = () => {
  const handleProfileOpen = useCallback(() => {
    if (window.Clerk) {
      window.Clerk.openUserProfile();
    }
  }, []);

  return (
    <button
      className="text-left hover:bg-gray-300 regular-16 py-2 px-5 text-gray-50 cursor-pointer pb-1.5 transition-all hover:font-bold"
      onClick={handleProfileOpen}
    >
      Profile
    </button>
  );
};

export default TextUserButton;
