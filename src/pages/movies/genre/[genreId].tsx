import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import MovieCard from "components/MovieCard";
import { useRouter } from "next/router";
import Link from "next/link";

const Movies = ({ data }: any) => {
  const router = useRouter();
  console.log(data.total_pages);

  let genreName = "";
  if (router.query.genreId === "28") genreName = "Action";
  else if (router.query.genreId === "12") genreName = "Adventure";
  else if (router.query.genreId === "35") genreName = "Comical";
  else if (router.query.genreId === "80") genreName = "Crime";
  else if (router.query.genreId === "18") genreName = "Drama";
  else if (router.query.genreId === "14") genreName = "Fantasy";
  else if (router.query.genreId === "27") genreName = "Horror";
  else if (router.query.genreId === "9648") genreName = "Mystry";
  else if (router.query.genreId === "878") genreName = "Sci-Fi";
  else if (router.query.genreId === "10749") genreName = "Romance";

  const getMoviesByGenre = () => {
    return axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${router.query.genreId}&language=en-US&page=4`
    );
  };

  const { data: actionMoviesResult } = useQuery(
    `movies-by-genre-${router.query.genreId}`,
    getMoviesByGenre,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {}, [actionMoviesResult]);

  let page = router.query.page;
  let pageParsed = 0;
  if (page) pageParsed = +page;

  return (
    <div className="bg-primary border-2 border-primary">
      {/*Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          {genreName} Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}
        </div>
      </div>

      <div className="flex justify-center my-10 gap-x-2">
        {pageParsed > 1 && (
          <Link href={`${router.query.genreId}?page=${pageParsed - 1}`}>
            <button className="bg-green-400 text-primary p-2 rounded-lg font-semibold">
              Previous Page
            </button>
          </Link>
        )}

        {pageParsed === 1 && (
          <Link href={`/movies/genre`}>
            <button className="bg-green-400 text-primary p-2 rounded-lg font-semibold">
              Go Back
            </button>
          </Link>
        )}

        <Link href={`${router.query.genreId}?page=${pageParsed + 1}`}>
          <button className="bg-green-400 text-primary p-2 rounded-lg font-semibold">
            Next Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Movies;

export const getServerSideProps = async (context: any) => {
  const { params, query } = context;
  console.log(query);
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=${query.genreId}&language=en-US&page=${query.page}`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
