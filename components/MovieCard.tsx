import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

type MovieCardProps = {
  movie: any;
  isDeleteAble?: boolean;
  handleDelete?: React.MouseEventHandler<HTMLButtonElement>;
};

const MovieCard = ({ movie, isDeleteAble, handleDelete }: MovieCardProps) => {
  const router = useRouter();
  return (
    <div key={movie.id} className="xsm:w-fit lg:w-40">
      <div className="grid grid-cols-1 grid-rows-1">
        <button
          className={`${
            isDeleteAble ? "visible" : "collapse"
          } col-span-full row-span-full z-10 text-green-400 justify-self-end mt-3 mr-3 p-1 backdrop-blur-3xl h-fit rounded-full`}
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="xsm:w-4 xsm:h-4 lg:w-6 lg:h-6 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <Link
          href={`/movies/${movie.id}`}
          // rel="noopener noreferrer"
          // target="_blank"
          className="col-span-full row-span-full"
        >
          <Image
            className="w-40 h-auto rounded-xl mb-1 cursor-pointer hover:shadow-3xl transition-shadow"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.original_name || movie.original_title}
            height="280"
            width="160"
          />
        </Link>
      </div>
      <Link
        href={`/movies/${movie.id}`}
        // rel="noopener noreferrer"
        // target="_blank"
      >
        <p className="font-bold xsm:text-sm lg:text-lg">
          {movie.title || movie.original_title}
        </p>
      </Link>
      <div className="flex justify-between">
        <p className="xsm:text-xs lg:text-sm">
          Language: {movie.original_language}
        </p>
        <p className="font-semibold xsm:text-xs lg:text-sm">
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
