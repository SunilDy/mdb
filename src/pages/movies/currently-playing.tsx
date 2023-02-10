import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import MovieCard from "components/MovieCard";
import { useRouter } from "next/router";
import Link from "next/link";

const Popular = ({ data }: any) => {
  const router = useRouter();

  let page = router.query.page;
  let pageParsed = 0;
  if (page) pageParsed = +page;

  return (
    <div className="bg-primary border-2 border-primary">
      {/*Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Currently Playing Movies
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {data.results?.map((title: any) => (
            <MovieCard key={title.id} movie={title} />
          ))}
        </div>
      </div>

      <div className="flex justify-center my-10 gap-x-2">
        {pageParsed > 1 && (
          <Link href={`currently-playing?page=${pageParsed - 1}`}>
            <button className="bg-green-400 text-primary p-2 rounded-lg font-semibold">
              Previous Page
            </button>
          </Link>
        )}

        {pageParsed === 1 && (
          <Link href={`/movies`}>
            <button className="bg-green-400 text-primary p-2 rounded-lg font-semibold">
              Go Back
            </button>
          </Link>
        )}

        <Link href={`currently-playing?page=${pageParsed + 1}`}>
          <button className="bg-green-400 text-primary p-2 rounded-lg font-semibold">
            Next Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Popular;

export const getServerSideProps = async (context: any) => {
  const { params, query } = context;
  console.log(query);
  const res = await fetch(
<<<<<<< HEAD
<<<<<<< HEAD
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${query.page}`
=======
    `https://api.themoviedb.org/3/movie/now_playing?NEXT_PUBLIC_API_KEY=${process.env.NEXT_PUBLIC_API_KEY}&page=${query.page}`
>>>>>>> 5779a48fe881f34acbbbeb4916d50268510cb8cb
=======
    `https://api.themoviedb.org/3/movie/now_playing?NEXT_PUBLIC_API_KEY=${process.env.NEXT_PUBLIC_API_KEY}&page=${query.page}`
>>>>>>> 5779a48fe881f34acbbbeb4916d50268510cb8cb
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
