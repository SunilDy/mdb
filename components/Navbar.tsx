import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Josefin_Sans } from "@next/font/google";
import { useSession } from "next-auth/react";

const jose = Josefin_Sans({
  subsets: ["latin"],
});

export default function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  // console.log(session);

  const handleSearchKeyDown = (e: any) => {
    if (e.key === "Enter") router.push(`/search?name=${searchValue}`);
  };

  useEffect(() => {
    setSearchValue("");
  }, [router.asPath]);

  return (
    <>
      <nav className="flex justify-between xsm:px-4 md:px-20 lg:px-24 xl:px-44 py-5 items-center sticky top-0 z-50 backdrop-blur-xl">
        <Link href="/">
          <h1
            className={`${jose.className} xsm:text-lg md:text-xl lg:text-3xl text-green-400 sm:inline tracking-widest font-light xsm:mr-4 sm:mx-0`}
          >
            FlixBase
          </h1>
        </Link>
        <div className="basis-2/4 grid grid-cols-1 grid-rows-1 xsm:grow sm:grow-0">
          <input
            className={`${jose.className} bg-primary border-2 border-green-400 pl-4 py-1 w-full rounded-md col-span-full row-span-full outline-transparent xsm:pr-9 lg:pr-12 placeholder:text-green-200 text-green-400 xsm:text-sm lg:text-lg xsm:font-light lg:font-bold`}
            placeholder="Search Movies, TV Shows..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => handleSearchKeyDown(e)}
          />
          <svg
            onClick={() => router.push(`/search?name=${searchValue}`)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="col-span-full row-span-full justify-self-end self-center stroke-2 h-full xsm:w-[36px] lg:w-[40px] px-2 text-green-400 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        {session?.user ? (
          <div className="flex items-center gap-x-2 xsm:ml-4 sm:mx-0">
            <Link
              href={"/user"}
              className="xsm:collapse xsm:w-0 lg:w-fit lg:visible"
            >
              <p className="text-green-400">Hello, {session?.user.name}</p>
            </Link>
            <Link href={"/user"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-lg font-semibold xsm:inline text-green-400 border-2 border-green-400 rounded-full p-1 cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        ) : (
          <Link href={"/auth/login"}>
            <p className="text-green-400 font-bold xsm:ml-4 sm:mx-0">Login</p>
          </Link>
        )}
      </nav>
    </>
  );
}
