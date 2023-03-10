import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import MovieCard from "components/MovieCard";
import Link from "next/link";
import Head from "next/head";

const LoadMoreButton = (props: any) => {
  return (
    <div className="flex items-center">
      <Link href={`movies/${props.section}?page=1`}>
        <button className="bg-green-400 text-primary py-1 xsm:px-2 lg:px-4 rounded-md font-semibold xsm:text-xs sm:text-sm md:text-lg">
          More...
        </button>
      </Link>
    </div>
  );
};

const getTopRated = () => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
};

const getPopular = () => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
};

const getUpcoming = () => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
};

const getNowPlaying = () => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
};

const Movies = () => {
  const { data: topRatedMoviesResult } = useQuery(
    "top-rated-movies",
    getTopRated,
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: popularMoviesResult } = useQuery("popular-movies", getPopular, {
    refetchOnWindowFocus: false,
  });
  const { data: upcomingMoviesResult } = useQuery(
    "upcoming-movies",
    getUpcoming,
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: nowPlayingMoviesResult } = useQuery(
    "now-playing-movies",
    getNowPlaying,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    console.log("topRatedMoviesResult", topRatedMoviesResult);
    // console.log("popularMoviesResult", popularMoviesResult);
    // console.log("upcomingMoviesResult", upcomingMoviesResult);
    // console.log("nowPlayingMoviesResult", nowPlayingMoviesResult);
  }, [
    topRatedMoviesResult,
    popularMoviesResult,
    upcomingMoviesResult,
    nowPlayingMoviesResult,
  ]);

  return (
    <div className="bg-primary">
      <Head>
        <title>Discover Movies</title>
        <meta
          name="description"
          content={`discover movies from the website having collection of all the movies released up to date`}
        />
      </Head>
      {/* Now Playing Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Movies Currently Playing In Cinemas
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {nowPlayingMoviesResult?.data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}
          <LoadMoreButton section="currently-playing" />
        </div>
      </div>

      {/* Upcoming Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Upcoming Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {upcomingMoviesResult?.data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}
          <LoadMoreButton section="upcoming" />
        </div>
      </div>

      {/* Top Rated Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Top Rated Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {topRatedMoviesResult?.data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}
          <LoadMoreButton section="top-rated" />
        </div>
      </div>

      {/* Popular Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Popular Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {popularMoviesResult?.data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}
          <LoadMoreButton section="popular" />
        </div>
      </div>
    </div>
  );
};

export default Movies;
