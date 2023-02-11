import Image from "next/image";
import { useQuery } from "react-query";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import MovieCard from "components/MovieCard";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { format } from "date-fns";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { Josefin_Sans } from "@next/font/google";

const jose = Josefin_Sans({
  subsets: ["latin"],
});

type RelatedTitlesMovies = {
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

type ReviewType = {
  author: string;
  author_details: any;
  content: string;
  created_at: Date | string;
  id: string;
  updated_at: Date;
  url: string;
};

type VideoType = {
  iso_639_1: any;
  iso_3166_1: any;
  name: string;
  key: string;
  site: any;
  size: number;
  type: any;
  official: boolean;
  published_at: Date;
  id: string;
};

type CastType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: any;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: any;
  job?: string;
};

/**
 * Changes
 * 3 Image Slider
 * 5 updated the opacity setting
 * 6 videos
 * 7 reviews
 * 8 credit
 */

const Movie = ({ data }: any) => {
  const [recommendedTitles, setRecommendedTitles] = useState<
    RelatedTitlesMovies[] | null
  >(null);
  const [similarTitles, setSimilarTitles] = useState<
    RelatedTitlesMovies[] | null
  >(null);
  const [reviewState, setReviewState] = useState<ReviewType[] | null>(null);
  const [videoState, setVideoState] = useState<VideoType[] | null>(null);
  const [castState, setCastState] = useState<CastType[] | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(976);

  const { data: session } = useSession();
  const router = useRouter();

  // States and Ref for Image Slider
  const imagesContainerRef = useRef<HTMLElement>(null);
  const [clientWidth, setClientWidth] = useState(0);
  const [travel, setTravel] = useState(300);

  // similar recommended alternative-titles

  const getRecommendedTitles = () => {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${data.id}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
  };

  const getSimilarTitles = () => {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${data.id}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
  };

  const getImages = () => {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${data.id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_image_language=en,null`
    );
  };

  const getVideos = () => {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${data.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
  };

  const getReviews = () => {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${data.id}/reviews?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
  };

  const getCredit = () => {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${data.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
  };

  const { data: recommendedTitlesRes, isFetched: isFetchedRecommmended } =
    useQuery(`recommended-titles-${data.id}`, getRecommendedTitles);
  const { data: similarTitlesRes, isFetched: isFetchedSimilar } = useQuery(
    `similar-titles-${data.id}`,
    getSimilarTitles
  );
  const { data: imagesRes } = useQuery(`images-${data.id}`, getImages);
  const { data: videoRes } = useQuery(`videos-${data.id}`, getVideos);
  const { data: reviewsRes } = useQuery(`reviews-${data.id}`, getReviews);
  const { data: creditRes } = useQuery(`credit-${data.id}`, getCredit, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (recommendedTitlesRes?.data) {
      let filter = recommendedTitlesRes?.data.results.filter(
        (res: any) => res.poster_path !== null
      );
      setRecommendedTitles(filter);
    }

    if (similarTitlesRes?.data) {
      let filter = similarTitlesRes?.data.results.filter(
        (res: any) => res.poster_path !== null
      );
      setSimilarTitles(filter);
    }

    if (videoRes?.data.results) {
      if (videoRes?.data.results.length > 4) {
        const newArr = videoRes?.data.results.splice(0, 4);
        setVideoState(newArr);
      } else {
        setVideoState(videoRes?.data.results);
      }
    }

    if (creditRes?.data.cast) {
      let filtered = creditRes?.data.cast.filter(
        (cast: CastType) => cast.profile_path !== null
      );
      if (filtered.length > 20) {
        let newArr = filtered.splice(0, 19);
        setCastState(newArr);
      } else {
        setCastState(filtered);
      }
    }
  }, [recommendedTitlesRes, similarTitlesRes, imagesRes, videoRes, creditRes]);

  useEffect(() => {
    if (reviewsRes?.data.results) {
      let newArr = reviewsRes?.data.results.filter((result: any) => {
        return (
          result.author_details.avatar_path &&
          !result.author_details.avatar_path.includes("/http")
        );
      });
      let withDate = newArr.map((item: ReviewType) => {
        let date = new Date(item.created_at);
        let readableDate = format(date, "MM/dd/yyyy HH:mm:ss");
        return { ...item, created_at: readableDate };
      });
      setReviewState(withDate);
    }
  }, [reviewsRes]);

  useEffect(() => {}, [
    similarTitles,
    recommendedTitles,
    reviewState,
    videoState,
    castState,
  ]);

  useEffect(() => {
    const el = imagesContainerRef.current;
    if (imagesContainerRef.current) {
      setClientWidth(imagesContainerRef.current.scrollWidth);
    }
  }, [travel, imagesRes, clientWidth, videoRes]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }
  }, []);

  const handleScrollPrev = () => {
    setTravel(300);
    if (imagesContainerRef.current) {
      imagesContainerRef.current.scroll({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleScrollNext = () => {
    if (travel >= clientWidth) {
      setTravel(clientWidth);
    } else {
      setTravel(travel + 600);
      if (imagesContainerRef.current) {
        imagesContainerRef.current.scroll({
          left: travel,
          behavior: "smooth",
        });
      }
    }
  };

  let releaseDate = new Date(data.release_date);
  let readableReleaseDate = format(releaseDate, "MM/dd/yyyy");

  const handleLike = async () => {
    if (session?.user) {
      try {
        const result = await axios.post(
          `/api/movies/like`,
          {
            movieId: data.id,
          },
          {
            withCredentials: true,
          }
        );
        // console.log(result.data);
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } w-fit bg-green-400 shadow-lg rounded-lg pointer-events-auto flex  items-center ring-1 ring-black ring-opacity-5 p-4 text-white`}
          >
            <div className="">
              <h1
                className={`${jose.className} xsm:text-xs md:text-sm lg:text-lg`}
              >
                Movie added to the liked list
              </h1>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="xsm:w-4 xsm:h-4 lg:w-6 lg:h-6 xsm:mx-1 lg:mx-2 cursor-pointer"
                onClick={() => toast.dismiss(t.id)}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ));
      } catch (err) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } w-fit bg-red-700 shadow-lg rounded-lg pointer-events-auto flex  items-center ring-1 ring-black ring-opacity-5 p-4 text-white`}
          >
            <div className="">
              <h1
                className={`${jose.className} xsm:text-xs md:text-sm lg:text-lg`}
              >
                Movie is already in the liked list!
              </h1>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="xsm:w-4 xsm:h-4 lg:w-6 lg:h-6 xsm:mx-1 lg:mx-2 cursor-pointer"
                onClick={() => toast.dismiss(t.id)}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ));
      }
    } else {
      router.push("/auth/login");
    }
  };

  const handleAddToWatchlist = async () => {
    if (session?.user) {
      try {
        const result = await axios.post(
          `/api/movies/watchlist`,
          {
            movieId: data.id,
          },
          {
            withCredentials: true,
          }
        );
        // console.log(result.data);
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } w-fit bg-green-400 shadow-lg rounded-lg pointer-events-auto flex  items-center ring-1 ring-black ring-opacity-5 p-4 text-white`}
          >
            <div className="">
              <h1
                className={`${jose.className} xsm:text-xs md:text-sm lg:text-lg`}
              >
                Movie added to the watchlist
              </h1>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="xsm:w-4 xsm:h-4 lg:w-6 lg:h-6 xsm:mx-1 lg:mx-2 cursor-pointer"
                onClick={() => toast.dismiss(t.id)}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ));
      } catch (err) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } w-fit bg-red-700 shadow-lg rounded-lg pointer-events-auto flex  items-center ring-1 ring-black ring-opacity-5 p-4 text-white`}
          >
            <div className="">
              <h1
                className={`${jose.className} xsm:text-xs md:text-sm lg:text-lg`}
              >
                Movie is already in the watchlist!
              </h1>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="xsm:w-4 xsm:h-4 lg:w-6 lg:h-6 xsm:mx-1 lg:mx-2 cursor-pointer"
                onClick={() => toast.dismiss(t.id)}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ));
      }
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="bg-primary">
      {/* Movie Section ========================================== */}
      <div className="grid">
        <Image
          className="w-full col-span-full row-span-full object-cover h-full"
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          alt={data.original_title}
          width={1000}
          height={1000}
        />
        <div className="bg-primary bg-opacity-80 p-11 md:flex justify-center col-span-full row-span-full">
          <div className="mr-10">
            <Image
              className="w-auto xsm:max-h-[24rem] md:max-h-[30rem] lg:max-h-[40rem] rounded-xl self-center items-center shadow-2xl"
              src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
              alt={data.original_title}
              width={1000}
              height={1000}
            />
          </div>
          <div className="basis-1/2 text-white pt-4">
            {/* Name with link */}
            <div className="flex items-center gap-x-4 xsm:mt-4 md:mt-0">
              <h1
                className={`${jose.className} xsm:text-xl md:text-2xl lg:text-4xl font-semibold`}
              >
                {data.title || data.original_title}
              </h1>
              {data.homepage && (
                <Link
                  href={`${data.homepage}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-green-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                </Link>
              )}
            </div>
            {/* Tagline */}
            <p>{data.tagline}</p>
            {/* Overview */}
            <p className="my-6 xsm:text-sm md:text-xl text-slate-300">
              {data.overview}
            </p>
            {/* Genres */}
            <div className="flex">
              <p className="xsm:text-xs md:text-lg mr-2">Genres: </p>
              <div className="flex gap-x-2">
                {data.genres.map((genre: any) => (
                  <p
                    key={genre.id}
                    className="xsm:text-xs md:text-lg font-semibold"
                  >
                    {genre.name}
                  </p>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="flex">
              <p className="xsm:text-xs md:text-lg mr-2">Language: </p>
              <p className="xsm:text-xs md:text-lg mr-2 font-semibold">
                {data.original_language}
              </p>
            </div>

            {/* Release Date */}
            <div className="flex">
              <p className="xsm:text-xs md:text-lg mr-2">Released On: </p>
              <p className="xsm:text-xs md:text-lg mr-2 font-semibold">
                {readableReleaseDate}
              </p>
            </div>

            {/* Runtime */}
            <div className="flex">
              <p className="xsm:text-xs md:text-lg mr-2">Runtime: </p>
              <p className="xsm:text-xs md:text-lg mr-2 font-semibold">
                {(data.runtime / 60).toFixed(1)} h
              </p>
            </div>

            {/* Rating */}
            <p className="my-4 xsm:text-xs md:text-lg">
              Rating:{" "}
              <span className="font-bold text-green-400">
                {data.vote_average.toFixed(1)} ({data.vote_count})
              </span>
            </p>
            {/* Adult */}
            <p className="bg-slate-300 text-slate-800 w-fit px-2 rounded-md font-bold xsm:text-xs md:text-lg mb-4">
              {data.adult ? "Adult Content" : "No Adult Content"}
            </p>
            {/* Buttons */}
            <div className="flex gap-x-2 my-2">
              <button
                className="bg-red-400 px-3 py-1 rounded-sm font-semibold flex items-center xsm:text-xs md:text-lg"
                onClick={handleLike}
              >
                Like
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-4 fill-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
              <button
                className="bg-purple-400 px-3 py-1 rounded-sm font-semibold flex items-center xsm:text-xs md:text-lg"
                onClick={handleAddToWatchlist}
              >
                Add to Watchlist
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-4 fill-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blur */}
      <div className="h-20 bg-[#5c6b8b] absolute w-full z-10 blur-3xl"></div>

      {/* Images ==================================================== */}

      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6">
        <h1 className="text-white font-semibold xsm:text-xl md:text-2xl z-30">
          Images
        </h1>
        {/* Image Grid With Buttons */}
        {imagesRes?.data.backdrops && imagesRes?.data.backdrops.length > 0 ? (
          <div className="grid grid-cols-1 grid-rows-1">
            {travel > 600 && windowWidth > 480 && (
              <button
                className="text-white bg-primary p-2 font-bold self-center col-span-full row-span-full w-fit justify-self-start h-fit rounded-full z-20"
                onClick={handleScrollPrev}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="xsm:w-6 xsm:h-6 lg:w-10 lg:h-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            <div
              className="flex my-4 overflow-x-scroll scrollbar-hide col-span-full row-span-full"
              // @ts-ignore
              ref={imagesContainerRef}
            >
              {imagesRes &&
                imagesRes.data.backdrops.map((backdrop: any, i: number) => (
                  <Image
                    key={i}
                    className="w-96 h-auto mb-1 cursor-pointer mr-2"
                    src={`https://image.tmdb.org/t/p/original/${backdrop.file_path}`}
                    alt={backdrop.file_path}
                    height="280"
                    width="160"
                  />
                ))}
            </div>
            {windowWidth > 480 && (
              <button
                className="text-white bg-primary p-2 font-bold self-center col-span-full row-span-full w-fit justify-self-end h-fit rounded-full shadow-2xl"
                onClick={handleScrollNext}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="xsm:w-6 xsm:h-6 lg:w-10 lg:h-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <p className="text-green-400">No images!</p>
          </div>
        )}
      </div>

      {/* Cast ==================================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6">
        <h1 className="text-white font-semibold xsm:text-xl md:text-2xl mb-4">
          Cast
        </h1>
        {castState && castState.length > 0 ? (
          <div className="grid xsm:grid-cols-castsm lg:grid-cols-cast gap-4 text-white">
            {castState?.map((cast: any, i: number) => (
              <div key={cast.id}>
                <Image
                  className="xsm:w-12 xsm:h-12 lg:w-20 lg:h-20 mb-1 cursor-pointer rounded-full object-cover"
                  src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                  alt={cast.name}
                  height="100"
                  width="100"
                />
                <p className="xsm:text-xs lg:text-sm">{cast.original_name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <p className="text-green-400">No cast details found!</p>
          </div>
        )}
      </div>

      {/* Videos */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6">
        <h1 className="text-white font-semibold xsm:text-xl md:text-2xl mb-4">
          Videos
        </h1>
        {videoState && videoState.length > 0 ? (
          <div className="grid gap-x-6 grid-cols-new5 gap-y-6">
            {videoState?.map((video: any, i: number) => (
              <div key={i} className="w-72">
                <LiteYouTubeEmbed key={i} id={video.key} title={video.name} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <p className="text-green-400">No videos!</p>
          </div>
        )}
      </div>

      {/* Recommended Titles Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Recommended Titles
        </h1>
        {recommendedTitles && recommendedTitles.length > 0 ? (
          <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
            {recommendedTitles &&
              recommendedTitles?.map((title: any) => (
                <MovieCard key={title.id} movie={title} />
              ))}
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <p className="text-green-400">No recommended titles!</p>
          </div>
        )}
      </div>
      {/* Similar Titles Section ========================================== */}
      <div className="bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
        <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
          Similar Titles
        </h1>
        {similarTitles && similarTitles.length > 0 ? (
          <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
            {similarTitles &&
              similarTitles?.map((title: any) => (
                <MovieCard key={title.id} movie={title} />
              ))}
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <p className="text-green-400">No similar titles found!</p>
          </div>
        )}
      </div>

      {/* Reviews ==================================================== */}
      <div className="border-2 border-primary bg-primary xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid my-10">
        <h1 className="text-white font-semibold xsm:text-xl md:text-2xl mb-4">
          Reviews
        </h1>
        {reviewState && reviewState.length > 0 ? (
          <div className="text-white px-6 grid xsm:grid-cols-reviewsm lg:grid-cols-review gap-4">
            {reviewState?.map((review: any, i: number) => (
              <div
                key={i}
                className="py-10 bg-green-200 rounded-lg px-4 h-fit flex bg-opacity-10 items-center"
              >
                <Image
                  key={i}
                  className="xsm:w-12 xsm:h-12 lg:w-20 lg:h-20 mb-1 cursor-pointer mr-2 rounded-full"
                  src={`https://image.tmdb.org/t/p/original/${review.author_details.avatar_path}`}
                  alt={review.author}
                  height="100"
                  width="100"
                />
                <div className="px-4 w-[80%]">
                  <p className="text-green-400 font-bold">{review.author}</p>
                  <p className="xsm:text-xs md:text-sm mb-2">
                    {review.created_at}
                  </p>
                  <p className="text-ellipsis overflow-hidden whitespace-nowrap ... font-semibold xsm:text-sm md:text-md">
                    &quot;{review.content}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <p className="text-green-400">No reviews yet!</p>
          </div>
        )}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Movie;

export const getServerSideProps = async (context: any) => {
  const { params } = context;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
