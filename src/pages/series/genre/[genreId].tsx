import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import TvCard from "components/TvCard";
import { useRouter } from "next/router";
import Link from "next/link";

const Movies = ({ data }: any) => {
  const router = useRouter();
  console.log(data.total_pages);

  let genreName = "";
  if (router.query.genreId === "10759") genreName = "Action and Adventure";
  else if (router.query.genreId === "35") genreName = "Comical";
  else if (router.query.genreId === "80") genreName = "Crime";
  else if (router.query.genreId === "18") genreName = "Drama";
  else if (router.query.genreId === "10765")
    genreName = "Fantasy and Science-Fiction";
  else if (router.query.genreId === "9648") genreName = "Mystry";
  else if (router.query.genreId === "10766") genreName = "Soap";

  let page = router.query.page;
  let pageParsed = 0;
  if (page) pageParsed = +page;

  return (
    <div className="bg-primary border-2 border-primary">
      {/*Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          {genreName} TV Shows
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {data.results?.map((title: any) => (
            <TvCard key={title.id} tv={title} />
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
          <Link href={`/series/genre`}>
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
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&with_genres=${query.genreId}&language=en-US&page=${query.page}`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
