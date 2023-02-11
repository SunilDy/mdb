import Head from "next/head";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

// Component Imports
import TrendingMovie from "components/Index/TrendingMovie";
import TrendingTV from "components/Index/TrendingTV";
import Carousal from "components/Index/Carousel";

export default function Home({ carousalData }: any) {
  // console.log(carousalData);
  return (
    <>
      <Head>
        <title>Flixbase: Discover Entertainment</title>
        <meta
          name="description"
          content="discover movies and tv-shows from the website having collection of all the movies and tv shows released up to date"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F172A" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#0F172A] border-2 border-primary">
        <Carousal />
        <TrendingMovie />
        <TrendingTV />
      </main>
    </>
  );
}
