"use client";
import { IUser } from "@/db/schema/User";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
export const dynamic = "force-dynamic";

type LeaderboardUser = {
  username: string;
  latestPortfolioValue: number;
};

const page = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    fetch("/api/leaderboard", { cache: "no-store" })
      .then((response) => response.json())
      .then((results: LeaderboardUser[]) => setUsers(results))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="max-container padding-container flex flex-col py-0 ">
      <ul>
        {users.map((user, index) => {
          const textSize =
            index < 3
              ? "bold-16 sm:bold-20 lg:bold-32"
              : "regular-14 sm:regular-16 lg:regular-20";
          const medalUrls = [
            "/images/bronze-medal.png",
            "/images/silver-medal.png",
            "/images/gold-medal.png",
          ];

          let bgClass =
            index === 0
              ? "bg-gradient-to-r from-purple-700 to-blue-600 text-white"
              : "bg-slate-50";
          let rankOrMedal =
            index < 3 ? (
              <img src={medalUrls[index]} alt="medal" />
            ) : (
              <span className="font-bold text-lg">{index + 1}</span>
            );

          return (
            <li
              key={user.username}
              className={`flex justify-between my-5 py-10 px-5 rounded-xl items-center blue- ${bgClass} ${textSize} text-center`}
            >
              <span className="w-full sm:w-1/4 text-center">{rankOrMedal}</span>
              <span className="w-full sm:w-2/4 text-center">
                {user.username}
              </span>
              <span className="w-full sm:w-1/4 text-center">
                {formatCurrency(user.latestPortfolioValue)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default page;
