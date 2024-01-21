"use client";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="fixed top-0 z-50 bg-transparent p-4 flex justify-between items-center w-full">
        <div className="flex items-center p-2 bg-white rounded-lg shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]">
          <img
            src="/images/cb.svg"
            alt="Logo"
            className="h-6 md:h-6 lg:h-7 xl:h-8 w-auto mr-4"
          />
        </div>
        <div className="flex item-center">
          <Link href="/portfolio" passHref>
            <button className="bg-white rounded-full px-4 py-2 ml-4 font-extrabold shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]">
              Login
            </button>
          </Link>
        </div>
      </div>

      <div className="hidden md:block h-screen w-full overflow-hidden object-cover">
        <div className="w-full h-full relative overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            loop
            muted
            controls={false}
          >
            <source src="/videos/hero-desktop.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="block md:hidden h-screen w-full overflow-hidden">
        <div className="w-full h-full relative overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            loop
            muted
            controls={false}
          >
            <source src="/videos/hero-mobile.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="absolute bottom-0  left-0 transform -translate-y-1/2 bg-transparent p-6 md:w-1/4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white overflow-hidden">
          Wo Ihr Vermögen in sicheren Händen ist
        </h1>
      </div>
    </main>
  );
}
