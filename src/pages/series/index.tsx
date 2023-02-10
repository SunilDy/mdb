import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import TvCard from "components/TvCard";
import Link from "next/link";

const LoadMoreButton = (props: any) => {
  return (
    <div className="flex items-center">
      <Link href={`series/${props.section}?page=1`}>
        <button className="flex justify-center items-center bg-green-400 text-primary px-6 py-2 rounded-2xl mb-1 cursor-pointer transition-shadow hover:shadow-3xl font-bold">
          More...
        </button>
      </Link>
    </div>
  );
};

const getTopRated = () => {
  return axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
};

const getPopular = () => {
  return axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
};

const getNowPlaying = () => {
  return axios.get(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );
};

const Series = () => {
  const { data: topRatedTVResult } = useQuery("top-rated-tvs", getTopRated, {
    refetchOnWindowFocus: false,
  });
  const { data: popularTVResult } = useQuery("popular-tvs", getPopular, {
    refetchOnWindowFocus: false,
  });

  const { data: nowPlayingTVResult } = useQuery(
    "now-playing-tvs",
    getNowPlaying,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    // console.log("topRatedMoviesResult", topRatedMoviesResult);
    // console.log("popularMoviesResult", popularMoviesResult);
    // console.log("upcomingMoviesResult", upcomingMoviesResult);
    // console.log("nowPlayingMoviesResult", nowPlayingMoviesResult);
  }, [topRatedTVResult, popularTVResult, nowPlayingTVResult]);

  return (
    <div className="bg-primary">
      {/* Now Playing TV Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          TV Series Currently Playing
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {nowPlayingTVResult?.data.results?.map((title: any) => (
            <TvCard key={title.id} tv={title} />
          ))}
          <LoadMoreButton section="currently-playing" />
        </div>
      </div>

      {/* Top Rated TV Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Top Rated TV Series
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {topRatedTVResult?.data.results?.map((title: any) => (
            <TvCard key={title.id} tv={title} />
          ))}
          <LoadMoreButton section="top-rated" />
        </div>
      </div>

      {/* Popular TV Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Popular TV Series
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {popularTVResult?.data.results?.map((title: any) => (
            <TvCard key={title.id} tv={title} />
          ))}
          <LoadMoreButton section="popular" />
        </div>
      </div>
    </div>
  );
};

export default Series;
