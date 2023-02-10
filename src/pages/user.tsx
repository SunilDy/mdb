import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Josefin_Sans } from "@next/font/google";
import { FallingLines } from "react-loader-spinner";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "react-query";
import { useEffect } from "react";
import TvCard from "components/TvCard";
import MovieCard from "components/MovieCard";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const jose = Josefin_Sans({
  subsets: ["latin"],
});

const getUserLikedMovies = async () => {
  return await axios.get(`${process.env.SERVER_URL}/api/movies/like`, {
    withCredentials: true,
  });
};

const getUserWatchlistMovies = async () => {
  return await axios.get(`${process.env.SERVER_URL}/api/movies/watchlist`, {
    withCredentials: true,
  });
};

const getUserLikedSeries = async () => {
  return await axios.get(`${process.env.SERVER_URL}/api/series/like`, {
    withCredentials: true,
  });
};

const getUserWatchlistSeries = async () => {
  return await axios.get(`${process.env.SERVER_URL}/api/series/watchlist`, {
    withCredentials: true,
  });
};

export default function Component() {
  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });

  const {
    data: likedMovies,
    isLoading: loadingLikeMovies,
    refetch: refetchLikedMovies,
  } = useQuery("liked-movies", getUserLikedMovies, {
    refetchOnWindowFocus: false,
  });
  const {
    data: watchlistMovies,
    isLoading: loadingWatchlistMovies,
    refetch: refetchWatchlistMovies,
  } = useQuery("watchlist-movies", getUserWatchlistMovies, {
    refetchOnWindowFocus: false,
  });
  const {
    data: likedSeries,
    isLoading: loadingLikedSeries,
    refetch: refetchLikedSeries,
  } = useQuery("liked-series", getUserLikedSeries, {
    refetchOnWindowFocus: false,
  });
  const {
    data: watchlistSeries,
    isLoading: loadingWatchlistSeries,
    refetch: refetchWatchlistSeries,
  } = useQuery("watchlist-series", getUserWatchlistSeries, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log("watchlistSeries", watchlistSeries);
  }, [likedMovies, watchlistMovies, likedSeries, watchlistSeries]);

  const handleDeleteLikedMovie = async (id: string) => {
    // console.log(id);
    try {
      const result = await axios.patch(
        `${process.env.SERVER_URL}/api/movies/like`,
        {
          movieId: id,
        },
        {
          withCredentials: true,
        }
      );
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
              Movie deleted from the liked list
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
              Could not delete the movie from liked list! Try re-logging.
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
    await refetchLikedMovies();
  };

  const handleDeleteWatchlistMovie = async (id: string) => {
    // console.log(id);
    try {
      const result = await axios.patch(
        `${process.env.SERVER_URL}/api/movies/watchlist`,
        {
          movieId: id,
        },
        {
          withCredentials: true,
        }
      );
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
              Movie deleted from the watchlist.
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
              Could not delete the movie from watchlist! Try re-logging.
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
    await refetchWatchlistMovies();
  };

  const handleDeleteLikedSeries = async (id: string) => {
    // console.log(id);
    try {
      const result = await axios.patch(
        `${process.env.SERVER_URL}/api/series/like`,
        {
          seriesId: id,
        },
        {
          withCredentials: true,
        }
      );
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
              TV Series deleted from the liked list
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
              Could not delete the series from liked list! Try re-logging.
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
    await refetchLikedSeries();
  };

  const handleDeleteWatchlistSeries = async (id: string) => {
    // console.log(id);
    try {
      const result = await axios.patch(
        `${process.env.SERVER_URL}/api/series/watchlist`,
        {
          seriesId: id,
        },
        {
          withCredentials: true,
        }
      );
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
              TV Series deleted from the watchlist.
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
              Could not delete the series from watchlist! Try re-logging.
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
    await refetchWatchlistSeries();
  };

  if (
    status === "loading" ||
    loadingLikeMovies ||
    loadingWatchlistMovies ||
    loadingLikedSeries ||
    loadingWatchlistSeries
  ) {
    return (
      <div className="flex justify-center items-center h-36">
        <FallingLines color="#4ADE80" width="100" visible={true} />
      </div>
    );
  }
  let name = null;
  let image = null;
  if (session.user) {
    name = session?.user.name;
    image = session?.user.image;
  }
  if (name && image) {
    return (
      <div className="xsm:mx-6 lg:mx-20 my-10">
        <nav className="flex justify-between items-center">
          {/* Avatar with greeting */}
          <div className="flex items-center">
            <Image
              className="w-14 object-cover h-full rounded-full"
              src={image}
              alt={name}
              width={100}
              height={100}
            />
            <h1
              className={`${jose.className} text-green-400 mx-4 font-bold xsm:text-sm lg:text-lg`}
            >
              <span className="font-normal">Hello</span>, {name}
            </h1>
          </div>
          <div>
            <button
              className={`${jose.className} text-green-400 font-bold p-2 xsm:text-sm lg:text-lg`}
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Liked Movies */}
        <div className="xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
          <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
            Liked Movies
          </h1>
          <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
            {likedMovies?.data.result.length > 0 ? (
              likedMovies?.data.result.map((movie: any) => {
                return (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    isDeleteAble={true}
                    handleDelete={() => handleDeleteLikedMovie(movie.id)}
                  />
                );
              })
            ) : (
              <div className="flex items-center gap-x-2">
                <p className="text-green-400">No movies in the liked list.</p>
                <Link
                  href={"/movies"}
                  // className="bg-green-400 text-primary p-2"
                >
                  <button className="bg-green-400 text-primary py-1 xsm:px-1 lg:px-4 rounded-md font-semibold xsm:text-xs sm:text-sm lg:text-sm">
                    add some
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Watchlist Movies */}
        <div className="xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
          <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
            Movies In Your Watchlist
          </h1>
          <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
            {watchlistMovies?.data.result.length > 0 ? (
              watchlistMovies?.data.result.map((movie: any) => {
                return (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    isDeleteAble={true}
                    handleDelete={() => handleDeleteWatchlistMovie(movie.id)}
                  />
                );
              })
            ) : (
              <div className="flex items-center gap-x-2">
                <p className="text-green-400">No movies in the watchlist.</p>
                <Link
                  href={"/movies"}
                  // className="bg-green-400 text-primary p-2"
                >
                  <button className="bg-green-400 text-primary py-1 xsm:px-1 lg:px-4 rounded-md font-semibold xsm:text-xs sm:text-sm lg:text-sm">
                    add some
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Liked Series */}
        <div className="xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
          <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
            Liked TV Shows
          </h1>
          <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
            {likedSeries?.data.result.length > 0 ? (
              likedSeries?.data.result.map((tv: any) => {
                return (
                  <TvCard
                    key={tv.id}
                    tv={tv}
                    isDeleteAble={true}
                    handleDelete={() => handleDeleteLikedSeries(tv.id)}
                  />
                );
              })
            ) : (
              <div className="flex items-center gap-x-2">
                <p className="text-green-400">No tv shows in the liked list.</p>
                <Link
                  href={"/series"}
                  // className="bg-green-400 text-primary p-2"
                >
                  <button className="bg-green-400 text-primary py-1 xsm:px-1 lg:px-4 rounded-md font-semibold xsm:text-xs sm:text-sm lg:text-sm">
                    add some
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Watchlist Series */}
        <div className="xsm:px-4 sm:px-6 md:px-10 lg:px-20 pt-6 grid ">
          <h1 className="text-white font-semibold z-20 xsm:text-xl md:text-2xl">
            TV Shows In Your Watchlist
          </h1>
          <div className="grid xsm:grid-cols-new4xsm lg:grid-cols-new4 justify-between my-10 gap-x-6 gap-y-6 text-white">
            {watchlistSeries?.data.result.length > 0 ? (
              watchlistSeries?.data.result.map((tv: any) => {
                return (
                  <TvCard
                    key={tv.id}
                    tv={tv}
                    isDeleteAble={true}
                    handleDelete={() => handleDeleteWatchlistSeries(tv.id)}
                  />
                );
              })
            ) : (
              <div className="flex items-center gap-x-2">
                <p className="text-green-400">No tv shows in the watchlist.</p>
                <Link
                  href={"/series"}
                  // className="bg-green-400 text-primary p-2"
                >
                  <button className="bg-green-400 text-primary py-1 xsm:px-1 lg:px-4 rounded-md font-semibold xsm:text-xs sm:text-sm lg:text-sm">
                    add some
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    );
  }
}
