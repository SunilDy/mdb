import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Image from "next/image";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Josefin_Sans } from "@next/font/google";
import Link from "next/link";

const jose = Josefin_Sans({
  subsets: ["latin"],
});

type MovieType = {
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

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

const getPopular = () => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&page=${randomNumber(1, 100)}`
  );
};

const Carousal = () => {
  // const windowSize = useWindowSize();
  // console.log(windowSize.width);
  const [movies, setMovies] = useState<MovieType[] | null>(null);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {}, [windowWidth]);

  const { data: popularMoviesResult, isLoading } = useQuery(
    "popular-movies-carousal",
    getPopular,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (popularMoviesResult?.data) {
      let filter = popularMoviesResult?.data.results.filter(
        (res: any) => res.poster_path !== null && res.backdrop_path !== null
      );
      if (filter.length > 5) {
        let spliced = filter.splice(0, 5);
        setMovies(spliced);
      }
    }
  }, [popularMoviesResult]);

  useEffect(() => {}, [movies]);

  if (isLoading) {
    return <p className="text-3xl text-white">Loading</p>;
  }

  let carousalHeight = 120;
  if (windowWidth !== null) {
    if (windowWidth < 1000) {
      carousalHeight = 100;
    }
    if (windowWidth < 880) {
      carousalHeight = 100;
    }
    if (windowWidth < 740) {
      carousalHeight = 80;
    }
    if (windowWidth < 620) {
      carousalHeight = 60;
    }
    if (windowWidth < 520) {
      carousalHeight = 50;
    }
    if (windowWidth > 1000) {
      carousalHeight = 120;
    }
  }

  return (
    <div className="text-white">
      {movies && (
        <CarouselProvider
          naturalSlideWidth={carousalHeight}
          naturalSlideHeight={40}
          totalSlides={movies.length}
          interval={5000}
          isPlaying={true}
        >
          <Slider>
            {movies &&
              movies.map((movie: MovieType, i: number) => (
                <Slide key={movie.id} index={i}>
                  <div
                    className="h-full bg-center bg-cover grid grid-cols-1"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                    }}
                  >
                    {/* Layer Div */}
                    <div className="col-span-full row-span-full bg-primary bg-opacity-80"></div>
                    {/* Content Div */}
                    <div className="col-span-full row-span-full flex items-center xsm:w-[96%] lg:w-[80%] place-self-center">
                      <Image
                        className="xsm:w-16 sm:w-24 md:w-32 lg:w-36 xl:w-44 shadow-2xl rounded-2xl h-auto mb-1 object-top items-center xsm:mr-4 lg:mr-10"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt={movie.original_title}
                        height="1000"
                        width="1000"
                      />
                      <div>
                        <h1
                          className={`${jose.className} text-white font-bold xsm:text-xs sm:text-sm md:text-lg lg:text-xl xl:text-3xl`}
                        >
                          {movie.original_title}
                        </h1>
                        <p className="lg:my-2 xl:my-6 xsm:text-xs sm:text-sm lg:text-lg text-slate-300">
                          {movie.overview}
                        </p>
                        <div className="flex">
                          <p className="xsm:text-xs sm:text-sm lg:text-lg mr-2">
                            Language:{" "}
                          </p>
                          <p className="xsm:text-xs sm:text-sm lg:text-lg mr-2 font-semibold">
                            {movie.original_language}
                          </p>
                        </div>
                        {/* Rating */}
                        <p className="my-4 xsm:text-xs sm:text-sm lg:text-lg">
                          Rating:{" "}
                          <span className="font-bold text-green-400 xsm:text-xs sm:text-sm lg:text-lg">
                            {movie.vote_average.toFixed(1)} ({movie.vote_count})
                          </span>
                        </p>
                        <div className="flex gap-x-1">
                          <Link href={`/movies/${movie.id}`}>
                            <button className="bg-green-400 text-primary py-1 xsm:px-2 lg:px-4 rounded-md font-semibold xsm:text-xs sm:text-sm md:text-lg">
                              Visit
                            </button>
                          </Link>
                          <Link href={`/movies`}>
                            <button className="text-green-400 py-1 xsm:px-2 lg:px-4 rounded-md font-semibold xsm:text-xs sm:text-sm md:text-lg">
                              More
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* Buttons */}

                    <ButtonBack className="xsm:collapse lg:visible col-span-full row-span-full justify-self-start h-full bg-slate-400 bg-opacity-20 backdrop-blur-xl px-3 hover:font-bold">
                      &lt;
                    </ButtonBack>
                    <ButtonNext className="xsm:collapse lg:visible col-span-full row-span-full h-full justify-self-end bg-slate-400 bg-opacity-20 backdrop-blur-xl px-3 hover:font-bold">
                      &gt;
                    </ButtonNext>
                  </div>
                </Slide>
              ))}
          </Slider>
        </CarouselProvider>
      )}
    </div>
  );
};

export default Carousal;
