"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const ClientApplication: React.FC<Props> = ({ children }) => {
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user.username, clerkId: user.id }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle post request success
          console.log(data);
        })
        .catch((error) => {
          // Handle post request error
          console.error("Error:", error);
        });
    }
  }, [user]);
  return <div>{children}</div>;
};

export default ClientApplication;
