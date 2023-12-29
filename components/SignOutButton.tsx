import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <button
      className="text-left hover:bg-gray-300 regular-16 py-2 px-5 text-gray-50 cursor-pointer pb-1.5 transition-all hover:font-bold"
      onClick={() => signOut(() => router.push("/"))}
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
