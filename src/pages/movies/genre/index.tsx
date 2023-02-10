import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import MovieCard from "components/MovieCard";
import Link from "next/link";

const LoadMoreButton = (props: any) => {
  return (
    <div className="flex items-center">
      <Link href={`genre/${props.genreId}?page=1`}>
        <button className="flex justify-center items-center bg-green-400 text-primary px-6 py-2 rounded-2xl mb-1 cursor-pointer transition-shadow hover:shadow-3xl font-bold">
          More...
        </button>
      </Link>
    </div>
  );
};

const getActionMovies = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=28&language=en-US`
  );
};

const getAdventureMovies = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=12&language=en-US`
  );
};

const getComicalMovies = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=35&language=en-US`
  );
};

const getCrimeMovies = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=80&language=en-US`
  );
};

const getDramaMovies = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=18&language=en-US`
  );
};

const getFantasyMovies = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=14&language=en-US`
  );
};

const getHorrorMovies = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=27&language=en-US`
  );
};

const getMystryMovies = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=9648&language=en-US`
  );
};

const getRomanceMovies = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=10749&language=en-US`
  );
};

const getScienceFictionMovies = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=878&language=en-US`
  );
};

const Movies = () => {
  const { data: actionMoviesResult } = useQuery(
    "action-movies",
    getActionMovies,
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: adventureMoviesResult } = useQuery(
    "adventure-movies",
    getAdventureMovies,
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: comicalMoviesResult } = useQuery(
    "comical-movies",
    getComicalMovies,
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: crimeMoviesResult } = useQuery("crime-movies", getCrimeMovies, {
    refetchOnWindowFocus: false,
  });
  const { data: dramaMoviesResult } = useQuery("drama-movies", getDramaMovies, {
    refetchOnWindowFocus: false,
  });
  const { data: fantasyMoviesResult } = useQuery(
    "fantasy-movies",
    getFantasyMovies,
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: horrorMoviesResult } = useQuery(
    "horror-movies",
    getHorrorMovies,
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: mystryMoviesResult } = useQuery(
    "mystry-movies",
    getMystryMovies,
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: romanceMoviesResult } = useQuery(
    "romance-movies",
    getRomanceMovies,
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: scienceFictionMoviesResult } = useQuery(
    "science-fiction-movies",
    getScienceFictionMovies,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    console.log("scienceFictionMoviesResult", scienceFictionMoviesResult);
  }, [
    actionMoviesResult,
    adventureMoviesResult,
    comicalMoviesResult,
    crimeMoviesResult,
    dramaMoviesResult,
    fantasyMoviesResult,
    horrorMoviesResult,
    mystryMoviesResult,
    romanceMoviesResult,
    scienceFictionMoviesResult,
  ]);

  return (
    <div className="bg-primary ">
      <h1 className="text-green-400 xsm:text-xl lg:text-2xl font-semibold md:px-10 lg:px-20 py-10">
        Showing Movies of Different Genres
      </h1>

      {/* Action Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Action Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {actionMoviesResult?.data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}
          <LoadMoreButton genreId="28" />
        </div>
      </div>

      {/* Adventure Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Adventure Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {adventureMoviesResult?.data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}
          <LoadMoreButton genreId="12" />
        </div>
      </div>

      {/* Comical Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Comical Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {comicalMoviesResult?.data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}
          <LoadMoreButton genreId="35" />
        </div>
      </div>

      {/* Crime Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Crime Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {crimeMoviesResult?.data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}
          <LoadMoreButton genreId="80" />
        </div>
      </div>

      {/* Drama Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Drama Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {dramaMoviesResult?.data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}
          <LoadMoreButton genreId="18" />
        </div>
      </div>

      {/* Fantasy Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Fantasy Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {fantasyMoviesResult?.data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}
          <LoadMoreButton genreId="14" />
        </div>
      </div>

      {/* Horror Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Horror Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {horrorMoviesResult?.data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}
          <LoadMoreButton genreId="27" />
        </div>
      </div>

      {/* Mystry Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Mystry Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {mystryMoviesResult?.data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}
          <LoadMoreButton genreId="9648" />
        </div>
      </div>

      {/* Romance Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Romance Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {romanceMoviesResult?.data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}

          <LoadMoreButton genreId="10749" />
        </div>
      </div>

      {/* Science-Fiction Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Science-Fiction Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {scienceFictionMoviesResult?.data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}
          <LoadMoreButton genreId="878" />
        </div>
      </div>
    </div>
  );
};

export default Movies;
