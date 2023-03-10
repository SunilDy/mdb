import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import TvCard from "components/TvCard";
import Link from "next/link";
import Head from "next/head";

const LoadMoreButton = (props: any) => {
  return (
    <div className="flex items-center">
      <Link href={`genre/${props.genreId}?page=1`}>
        <button className="bg-green-400 text-primary py-1 xsm:px-2 lg:px-4 rounded-md font-semibold xsm:text-xs sm:text-sm md:text-lg">
          More...
        </button>
      </Link>
    </div>
  );
};

const getActionNAdventureTVs = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=10759&language=en-US`
  );
};

const getComicalTVs = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=35&language=en-US`
  );
};

const getCrimeTVs = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=80&language=en-US`
  );
};

const getDramaTVs = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=18&language=en-US`
  );
};

const getScienceFictionAndFantasyTVs = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=10765&language=en-US`
  );
};

const getMystryTVs = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=9648&language=en-US`
  );
};

const getSoapTVs = () => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=10766&language=en-US`
  );
};

const Movies = () => {
  const { data: actionNAdventureTVResult } = useQuery(
    "action-adventure-tvs",
    getActionNAdventureTVs,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: comicalTVResult } = useQuery("comical-tvs", getComicalTVs, {
    refetchOnWindowFocus: false,
  });
  const { data: crimeTVResult } = useQuery("crime-tvs", getCrimeTVs, {
    refetchOnWindowFocus: false,
  });
  const { data: dramaTVResult } = useQuery("drama-tvs", getDramaTVs, {
    refetchOnWindowFocus: false,
  });
  const { data: fantasyAndScienceFictionTVResult } = useQuery(
    "fantasy-ScienceFiction-tvs",
    getScienceFictionAndFantasyTVs,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: mystryTVResult } = useQuery("mystry-tvs", getMystryTVs, {
    refetchOnWindowFocus: false,
  });
  const { data: soapTVResult } = useQuery("soap-tvs", getSoapTVs, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {}, [
    actionNAdventureTVResult,
    comicalTVResult,
    crimeTVResult,
    dramaTVResult,
    fantasyAndScienceFictionTVResult,
    mystryTVResult,
    soapTVResult,
  ]);

  return (
    <div className="bg-primary ">
      <Head>
        <title>Discover TV Shows By Genre</title>
        <meta
          name="description"
          content="discover tv shows by genre from the website having collection of all the tv shows aired up to date"
        />
      </Head>

      <h1 className="text-green-400 xsm:text-xl lg:text-2xl font-semibold xsm:px-4 sm:px-6 md:px-10 lg:px-20 xsm:py-2 lg:py-10">
        Showing TV Series of Different Genres
      </h1>

      {/* Action Movies Section ========================================== */}
      <div className="xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl ">
          Action and Adventure TV Series
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {actionNAdventureTVResult?.data.results?.map((title: any) => (
            <TvCard key={title.id} tv={title} />
          ))}
          <LoadMoreButton genreId="10759" />
        </div>
      </div>

      {/* Comical Movies Section ========================================== */}
      <div className="xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Comical TV Series
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {comicalTVResult?.data.results?.map((title: any) => (
            <TvCard key={title.id} tv={title} />
          ))}
          <LoadMoreButton genreId="35" />
        </div>
      </div>

      {/* Crime TV Series Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Crime TV Series
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {crimeTVResult?.data.results?.map((title: any) => (
            <TvCard key={title.id} tv={title} />
          ))}
          <LoadMoreButton genreId="80" />
        </div>
      </div>

      {/* Drama TV Series Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Drama TV Series
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {dramaTVResult?.data.results?.map((title: any) => (
            <TvCard key={title.id} tv={title} />
          ))}
          <LoadMoreButton genreId="18" />
        </div>
      </div>

      {/* Fantasy and Science-Fiction TV Series Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Fantasy and Science-Fiction TV Series
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {fantasyAndScienceFictionTVResult?.data.results?.map((title: any) => (
            <TvCard key={title.id} tv={title} />
          ))}
          <LoadMoreButton genreId="10765" />
        </div>
      </div>

      {/* Mystry TV Series Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Mystry TV Series
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {mystryTVResult?.data.results?.map((title: any) => (
            <TvCard key={title.id} tv={title} />
          ))}
          <LoadMoreButton genreId="9648" />
        </div>
      </div>

      {/* Soap TV Series Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Soap TV Series
        </h1>
        <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
          {soapTVResult?.data.results?.map((title: any) => (
            <TvCard key={title.id} tv={title} />
          ))}
          <LoadMoreButton genreId="10766" />
        </div>
      </div>
    </div>
  );
};

export default Movies;
