import React from "react";

const page = () => {
  return (
    <div className="max-container padding-container flex flex-col py-10">
      <div className="relative flex flex-col lg:flex-row py-10">
        <div className="relative lg:w-3/4 flex flex-col pb-20">
          <h1 className="bold-32">Portfolio</h1>
          <h1 className="bold-20">10.000€</h1>
          <p className="regular-14 text-green-50">2,70%</p>
        </div>
        <div className="relative flex flex-col py-5">
          <h1 className="bold-20">Investments</h1>
        </div>
      </div>
      <div className="relative flex flex-col">
        <h1 className="bold-32">Discover</h1>
      </div>
    </div>
  );
};

export default page;
