import Link from "next/link";

const NotFound = () => {
  return (
    <div className="max-container h-[88vh] padding-container items-center flex  justify-center">
      <div className="relative flex flex-col items-center gap-4">
        <h1 className="bold-40 sm:bold-52">Page not found!</h1>
        <Link className="regular-24 cursor-pointer" href="/">
          Go Home!
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
