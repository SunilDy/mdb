import TvCard from "components/TvCard";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

const CurrentlyPlayingTV = ({ data }: any) => {
  const router = useRouter();
  console.log(data.total_pages);

  let page = router.query.page;
  let pageParsed = 0;
  if (page) pageParsed = +page;

  return (
    <div className="bg-primary border-2 border-primary">
      <Head>
        <title>TV Shows Currently On Air</title>
        <meta
          name="description"
          content={`discover tv shows that are currently on the air from the website having collection of all the tv shows aired up to date`}
        />
      </Head>
      {/*Movies Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          TV Shows Currently On Air
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {data.results?.map((title: any) => (
            <TvCard key={title.id} tv={title} />
          ))}
        </div>
      </div>

      <div className="flex justify-center my-10 gap-x-2">
        {pageParsed > 1 && (
          <Link href={`currently-playing?page=${pageParsed - 1}`}>
            <button className="text-green-400 py-1 xsm:px-2 lg:px-4 rounded-md font-semibold xsm:text-xs sm:text-sm md:text-lg">
              Previous Page
            </button>
          </Link>
        )}

        {pageParsed === 1 && (
          <Link href={`/series`}>
            <button className="text-green-400 py-1 xsm:px-2 lg:px-4 rounded-md font-semibold xsm:text-xs sm:text-sm md:text-lg">
              Go Back
            </button>
          </Link>
        )}

        <Link href={`currently-playing?page=${pageParsed + 1}`}>
          <button className="bg-green-400 text-primary py-1 xsm:px-2 lg:px-4 rounded-md font-semibold xsm:text-xs sm:text-sm md:text-lg">
            Next Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CurrentlyPlayingTV;

export const getServerSideProps = async (context: any) => {
  const { params, query } = context;
  console.log(query);
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${query.page}`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
