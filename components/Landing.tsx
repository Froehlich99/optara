"use client";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main>
      <div className="fixed top-0 z-50 bg-transparent p-4 flex justify-between items-center w-full">
        <div className="flex items-center p-2 bg-white rounded-lg">
          <img
            src="/images/cb.svg"
            alt="Logo"
            className="h-4 md:h-6 lg:h-7 xl:h-8 w-auto mr-4"
          />
        </div>
        <div className="flex item-center">
          <Link href="/portfolio" passHref>
            <button className="bg-white rounded-full px-4 py-2 ml-4">
              Login
            </button>
          </Link>
        </div>
      </div>

      <div className="hidden md:block h-screen w-full overflow-hidden object-cover">
        <div className="w-full h-full relative overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay loop muted>
            <source src="/videos/hero-desktop.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="top-0 video-container block md:hidden h-screen w-full overflow-hidden">
        <div className="w-full h-full relative overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay loop muted>
            <source src="/videos/hero-mobile.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="absolute top-3/4 left-0 transform -translate-y-1/2 bg-transparent p-6 md:w-1/4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
          Wo Ihr Vermögen in sicheren Händen ist
        </h1>
      </div>
    </main>
  );
}
