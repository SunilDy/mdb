import Link from "next/link";
import { Josefin_Sans } from "@next/font/google";
import Image from "next/image";
import LogoFull from "../public/logo/logo_cut.png";

const jose = Josefin_Sans({
  subsets: ["latin"],
});

const Footer = () => {
  return (
    <div>
      <footer className="bg-black black bg-opacity-20 text-slate-600 xsm:text-sm md:text-lg xsm:px-10 lg:px-24 py-10 sm:flex justify-around">
        {/* Logo ============= */}
        <div className="xsm:mb-4 sm:mb-0">
          {/* <h1
            className={`${jose.className} xsm:text-lg md:text-xl lg:text-3xl text-green-400 sm:inline tracking-widest font-extralight`}
          >
            FlixBase
          </h1> */}

          <Image
            className="xsm:w-48 md:w-48 object-cover h-fit"
            src={LogoFull}
            alt={"Logo"}
            width={400}
            height={200}
          />
          <p className={`${jose.className} text-green-400 pb-4`}>
            Discover Leisure
          </p>
          <p>Personal Project</p>
          <p>Not Monitized</p>
        </div>

        {/* Genre - Movies ============= */}

        <div className="xsm:mb-4 sm:mb-0">
          <Link href="/movies/genre">
            <h1 className="text-green-400 xsm:text-md lg:text-xl font-semibold xsm:mb-0 sm:mb-4">
              Movies By Genres
            </h1>
          </Link>
          {/* Container */}
          <div className="md:block lg:flex gap-x-6">
            {/* Divider */}
            <div>
              <Link href="/movies/genre/28?page=1">
                <p>Action</p>
              </Link>

              <Link href="/movies/genre/12?page=1">
                <p>Adventure</p>
              </Link>

              <Link href="/movies/genre/35?page=1">
                <p>Comical</p>
              </Link>

              <Link href="/movies/genre/80?page=1">
                <p>Crime</p>
              </Link>

              <Link href="/movies/genre/18?page=1">
                <p>Drama</p>
              </Link>
            </div>
            {/* Divider */}
            <div>
              <Link href="/movies/genre/14?page=1">
                <p>Fantasy</p>
              </Link>
              <Link href="/movies/genre/27?page=1">
                <p>Horror</p>
              </Link>
              <Link href="/movies/genre/9648?page=1">
                <p>Mystry</p>
              </Link>
              <Link href="/movies/genre/10749?page=1">
                <p>Romance</p>
              </Link>
              <Link href="/movies/genre/878?page=1">
                <p>Sci-Fi</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Genre - TV ============= */}

        <div className="xsm:mb-4 sm:mb-0">
          <Link href="/series/genre">
            <h1 className="text-green-400 xsm:text-md lg:text-xl font-semibold xsm:mb-0 sm:mb-4">
              TV Shows By Genres
            </h1>
          </Link>
          {/* Container */}
          <div className="md:block lg:flex gap-x-6">
            <div>
              <Link href="/series/genre/10759?page=1">
                <p>Action and Adventure</p>
              </Link>
              <Link href="/series/genre/35?page=1">
                <p>Comical</p>
              </Link>
              <Link href="/series/genre/80?page=1">
                <p>Crime</p>
              </Link>
              <Link href="/series/genre/18?page=1">
                <p>Drama</p>
              </Link>
            </div>
            <div>
              <Link href="/series/genre/10765?page=1">
                <p>Fantasy and Sci-Fi</p>
              </Link>
              <Link href="/series/genre/9648?page=1">
                <p>Mystry</p>
              </Link>
              <Link href="/series/genre/10766?page=1">
                <p>Soap</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Pages ============= */}

        <div>
          <h1 className="text-green-400 xsm:text-md lg:text-xl font-semibold xsm:mb-0 sm:mb-4">
            Pages
          </h1>
          <Link href="/auth">
            <p>Login</p>
          </Link>
          <Link href="/movies">
            <p>Movies</p>
          </Link>
          <Link href="/series">
            <p>TV Shows</p>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
