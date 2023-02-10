import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import MovieCard from "components/MovieCard";
import TvCard from "components/TvCard";

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
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&query=${router.query.name}`
    );
  };

  const getMovieSearchItems = async () => {
    return await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${router.query.name}`
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
    <div className="bg-primary border-2 border-primary px-28 text-white pt-10 min-h-screen">
      <h1 className="text-green-400 xsm:text-xl lg:text-3xl font-semibold py-10">
        Search Items For: {router.query.name}
      </h1>

      {tvResults && tvResults.length > 0 ? (
        <>
          <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
            TV Shows Found
          </h1>
          <div className="grid grid-cols-new4 justify-between my-10 gap-y-6 text-white">
            {!isLoadingTV &&
              tvResults?.map((tv: SearchResult) => (
                <TvCard key={tv.id} tv={tv} />
              ))}
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl py-10">
            No TV Shows Found
          </h1>
        </div>
      )}

      {movieResults && movieResults.length > 0 ? (
        <>
          <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
            Movies Found
          </h1>
          <div className="grid grid-cols-new4 justify-between my-10 gap-y-6 text-white">
            {!isLoadingMovie &&
              movieResults?.map((movie: SearchResult) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
            No Movies Found
          </h1>
        </div>
      )}

      {!isLoadingTV && !isLoadingMovie && (
        <p className="text-slate-600 bg-slate-200 w-fit mx-auto my-10 px-6 py-2 rounded-xl font-bold">
          End of Search Results
        </p>
      )}
    </div>
  );
};

export default Search;
