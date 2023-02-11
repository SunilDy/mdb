import One from "../../public/404/404_One.svg";
import Two from "../../public/404/404_Two.svg";
import Three from "../../public/404/404_Three.svg";
import Four from "../../public/404/404_Four.svg";
import Five from "../../public/404/404_Five.svg";
import Image from "next/image";
import { Josefin_Sans } from "@next/font/google";
import Link from "next/link";
import Head from "next/head";

const jose = Josefin_Sans({
  subsets: ["latin"],
});

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

let ImageArray = [One, Two, Three, Four, Five];
let Message = "Sorry. Couldn't find what you were looking for!";

export default function Page() {
  return (
    <div className="flex flex-col items-center my-10 px-24">
      <Head>
        <title>404!</title>
        <meta
          name="description"
          content={`discover movies and tv-shows from the website having collection of all the movies released up to date`}
        />
      </Head>
      <Image
        className=""
        src={ImageArray[randomNumber(0, 4)]}
        alt={"404"}
        height="500"
        width="500"
      />
      <h1
        className={`
        ${jose.className} text-green-400
        xsm:text-sm md:text-lg lg:text-2xl
        `}
      >
        {Message}
      </h1>
      <Link href={"/"}>
        <p className="text-primary bg-green-400 rounded-md font-semibold xsm:px-1 lg:px-2 lg:py-1 my-2 xsm:text-sm lg:text-lg">
          Go Home
        </p>
      </Link>
    </div>
  );
}
