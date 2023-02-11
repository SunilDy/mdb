import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import MovieCard from "components/MovieCard";
import TvCard from "components/TvCard";
import Head from "next/head";

type SearchResult = {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const Search = () => {
  const router = useRouter();
  const [tvResults, setTvResults] = useState<SearchResult[] | null>(null);
  const [movieResults, setMovieResults] = useState<SearchResult[] | null>(null);

  const getTVSearchItems = async () => {
    return await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${router.query.name}`
    );
  };

  const getMovieSearchItems = async () => {
    return await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${router.query.name}`
    );
  };

  const { data: tvSearchItems, isLoading: isLoadingTV } = useQuery(
    `search-items-tv-${router.query.name}`,
    getTVSearchItems
  );

  const { data: movieSearchItems, isLoading: isLoadingMovie } = useQuery(
    `search-items-movie-${router.query.name}`,
    getMovieSearchItems
  );

  useEffect(() => {
    console.log(tvSearchItems?.data.results);

    if (tvSearchItems?.data) {
      let filter = tvSearchItems?.data.results.filter(
        (res: any) => res.poster_path !== null && res.backdrop_path !== null
      );
      setTvResults(filter);
    }

    if (movieSearchItems?.data) {
      let filter = movieSearchItems?.data.results.filter(
        (res: any) => res.poster_path !== null && res.backdrop_path !== null
      );
      setMovieResults(filter);
    }
    console.log(tvSearchItems);
  }, [tvSearchItems, movieSearchItems]);

  console.log(router.query);
  return (
    <div className="bg-primary border-2 border-primary text-white xsm:px-2 lg:px-4 pt-10 min-h-screen">
      <Head>
        <title>Search: {router.query.name}</title>
        <meta
          name="description"
          content={`discover movies and tv-shows from the website having collection of all the movies released up to date`}
        />
      </Head>
      <h1 className="text-green-400 xsm:text-md lg:text-3xl font-semibold xsm:py-1 lg:py-10 xsm:mx-2 md:mx-6">
        Search Items For: {router.query.name}
      </h1>

      {/* <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid my-10"> */}
      <div className="xsm:mx-2 md:mx-6">
        <h1 className="text-white font-semibold z-20 xsm:text-md md:text-2xl">
          TV Shows Found
        </h1>
        {tvResults && tvResults.length > 0 ? (
          <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
            {!isLoadingTV &&
              tvResults?.map((tv: SearchResult) => (
                <TvCard key={tv.id} tv={tv} />
              ))}
          </div>
        ) : (
          <div>
            <h1 className="text-white font-semibold z-20 xsm:text-md md:text-2xl py-10">
              No TV Shows Found
            </h1>
          </div>
        )}
      </div>

      <div className="xsm:mx-2 md:mx-6">
        <h1 className="text-white font-semibold z-20 xsm:text-md md:text-2xl">
          Movies Found
        </h1>
        {movieResults && movieResults.length > 0 ? (
          <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
            {!isLoadingMovie &&
              movieResults?.map((movie: SearchResult) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
          </div>
        ) : (
          <div>
            <h1 className="text-white font-semibold z-20 xsm:text-md md:text-2xl">
              No Movies Found
            </h1>
          </div>
        )}
      </div>

      {!isLoadingTV && !isLoadingMovie && (
        <p className="text-slate-600 bg-slate-200 w-fit mx-auto my-10 xsm:px-2 xsm:py-1 md:px-6 md:py-2 rounded-xl font-bold xsm:text-sm md:text-xl">
          End of Search Results
        </p>
      )}
    </div>
  );
};

export default Search;
