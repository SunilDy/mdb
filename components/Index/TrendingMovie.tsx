import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import MovieCard from "components/MovieCard";
import { FallingLines } from "react-loader-spinner";

const getPopular = () => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/popular?NEXT_PUBLIC_API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
  );
};

const getTrendingMovies = () => {
  return axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?NEXT_PUBLIC_API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
  );
};

const getTopRated = () => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?NEXT_PUBLIC_API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
  );
};

const TrendingMovie = () => {
  const { data: trendingMoviesRes, isLoading: isLoadingTrending } = useQuery(
    "trending-movies",
    getTrendingMovies,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: popularMoviesResult, isLoading: isLoadingPopular } = useQuery(
    "popular-movies",
    getPopular,
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: topRatedMoviesResult, isLoading: isLoadingTopRated } = useQuery(
    "top-rated-movies",
    getTopRated,
    {
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {}, [
    trendingMoviesRes,
    popularMoviesResult,
    topRatedMoviesResult,
  ]);

  if (isLoadingTrending || isLoadingPopular || isLoadingTopRated) {
    return (
      <div className="flex justify-center items-center h-36">
        <FallingLines color="#4ADE80" width="100" visible={true} />
      </div>
    );
  }

  return (
    <div className="bg-primary">
      <h1 className="text-green-400 xsm:text-xl lg:text-3xl font-semibold md:px-10 lg:px-20 pt-10">
        Movies
      </h1>
      {/* Trending Movies Section ========================================== */}

      <div className="xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Trending Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {trendingMoviesRes?.data.results.map((movie: any) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
      </div>

      {/* Popular Movies Section ========================================== */}

      <div className="xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Popular Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {popularMoviesResult?.data.results.map((movie: any) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
      </div>

      {/* Top-rated Movies Section ========================================== */}

      <div className="xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Top-rated Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {topRatedMoviesResult?.data.results.map((movie: any) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendingMovie;
