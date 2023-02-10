import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import TvCard from "components/TvCard";
import { FallingLines } from "react-loader-spinner";

const getTrendingTv = () => {
  return axios.get(
<<<<<<< HEAD
<<<<<<< HEAD
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
=======
    `https://api.themoviedb.org/3/trending/tv/day?NEXT_PUBLIC_API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
>>>>>>> 5779a48fe881f34acbbbeb4916d50268510cb8cb
=======
    `https://api.themoviedb.org/3/trending/tv/day?NEXT_PUBLIC_API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
>>>>>>> 5779a48fe881f34acbbbeb4916d50268510cb8cb
  );
};

const getTopRated = () => {
  return axios.get(
<<<<<<< HEAD
<<<<<<< HEAD
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
=======
    `https://api.themoviedb.org/3/tv/top_rated?NEXT_PUBLIC_API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
>>>>>>> 5779a48fe881f34acbbbeb4916d50268510cb8cb
=======
    `https://api.themoviedb.org/3/tv/top_rated?NEXT_PUBLIC_API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
>>>>>>> 5779a48fe881f34acbbbeb4916d50268510cb8cb
  );
};

const getPopular = () => {
  return axios.get(
<<<<<<< HEAD
<<<<<<< HEAD
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
=======
    `https://api.themoviedb.org/3/tv/popular?NEXT_PUBLIC_API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
>>>>>>> 5779a48fe881f34acbbbeb4916d50268510cb8cb
=======
    `https://api.themoviedb.org/3/tv/popular?NEXT_PUBLIC_API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
>>>>>>> 5779a48fe881f34acbbbeb4916d50268510cb8cb
  );
};

const getNowPlaying = () => {
  return axios.get(
<<<<<<< HEAD
<<<<<<< HEAD
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
=======
    `https://api.themoviedb.org/3/tv/on_the_air?NEXT_PUBLIC_API_KEY=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
>>>>>>> 5779a48fe881f34acbbbeb4916d50268510cb8cb
=======
    `https://api.themoviedb.org/3/tv/on_the_air?NEXT_PUBLIC_API_KEY=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
>>>>>>> 5779a48fe881f34acbbbeb4916d50268510cb8cb
  );
};

const TrendingTV = () => {
  const { data: trendingTVResult, isLoading: isLoadingTrending } = useQuery(
    "trending-tv",
    getTrendingTv,
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: topRatedTVResult, isLoading: isLoadingTopRated } = useQuery(
    "top-rated-tvs",
    getTopRated,
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: popularTVResult, isLoading: isLoadingPopular } = useQuery(
    "popular-tvs",
    getPopular,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: nowPlayingTVResult } = useQuery(
    "now-playing-tvs",
    getNowPlaying,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {}, [
    trendingTVResult,
    topRatedTVResult,
    popularTVResult,
    nowPlayingTVResult,
  ]);

  if (isLoadingTrending || isLoadingTopRated || isLoadingPopular) {
    return (
      <div className="flex justify-center items-center h-36">
        <FallingLines color="#4ADE80" width="100" visible={true} />
      </div>
    );
  }

  return (
    <div className="bg-primary">
      <h1 className="text-green-400 xsm:text-xl lg:text-3xl font-semibold md:px-10 lg:px-20 pt-10">
        TV Shows
      </h1>

      {/* Trending TV Shows Section ========================================== */}
      <div className="xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Trending Shows
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {trendingTVResult?.data.results.map((tv: any) => {
            return <TvCard key={tv.id} tv={tv} />;
          })}
        </div>
      </div>

      {/* Top-Rated TV Shows Section ========================================== */}
      <div className="xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Top-Rated Shows
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {topRatedTVResult?.data.results.map((tv: any) => {
            return <TvCard key={tv.id} tv={tv} />;
          })}
        </div>
      </div>

      {/* Popular TV Shows Section ========================================== */}
      <div className="xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Popular Shows
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {popularTVResult?.data.results.map((tv: any) => {
            return <TvCard key={tv.id} tv={tv} />;
          })}
        </div>
      </div>

      {/* Now Playing TV Shows Section ========================================== */}
      <div className="xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Now Playing Shows
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {nowPlayingTVResult?.data.results.map((tv: any) => {
            return <TvCard key={tv.id} tv={tv} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendingTV;
