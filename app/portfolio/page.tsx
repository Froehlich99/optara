import React from "react";
import { getUserDetails } from "@/lib/getUserDetails";
import { auth } from "@clerk/nextjs";
import { IUser } from "@/db/schema/User";

const page = async () => {
  const { userId }: { userId: string | null } = auth();
  const user: IUser | null = await getUserDetails(userId ? userId : "");
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };
  return (
    <div className="max-container padding-container flex flex-col py-0">
      <div className="relative flex flex-col lg:flex-row py-10">
        <div className="relative lg:w-3/4 flex flex-col pb-20 pr-5 lg:px-32">
          <div className="pb-10">
            <h1 className="bold-32">Portfolio</h1>
            <h1 className="bold-20">
              {user ? formatCurrency(user.portfolioValue) : "No Data"}
            </h1>
            <p className="regular-14 text-green-50">2,70%</p>
          </div>
          {/* TODO: Add User Linechart Data */}
          {/* <Linechart/> */}
        </div>
        <div className="relative flex flex-col py-5">
          <h1 className="bold-20">Investments</h1>
        </div>
      </div>
      <div className="relative flex flex-col lg:px-32">
        <h1 className="bold-32">Discover</h1>
      </div>
    </div>
  );
};

export default page;
