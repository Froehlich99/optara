import Link from "next/link";

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

      <div className="top-0 video-container hidden md:block h-full">
        <video autoPlay loop muted playsInline className="object-cover m-0 p-0">
          <source src="/videos/hero-desktop.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="top-0 video-container block md:hidden h-full">
        <video autoPlay loop muted playsInline className="object-cover m-0 p-0">
          <source src="/videos/hero-mobile.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </main>
  );
}
