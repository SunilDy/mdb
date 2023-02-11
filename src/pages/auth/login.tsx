import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Josefin_Sans } from "@next/font/google";
import Google from "../../../public/icons/google.svg";
import Github from "../../../public/icons/github.svg";
import Image from "next/image";

const jose = Josefin_Sans({
  subsets: ["latin"],
});

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
  }
  return (
    <div className="text-white bg-slate-300 flex-col items-center bg-opacity-30 mx-auto w-fit xsm:my-20 md:my-36 flex justify-center p-10 rounded-md">
      <h1
        className={`${jose.className} text-green-400 text-3xl font-bold my-4`}
      >
        Sign In
      </h1>
      <button
        className={`${jose.className} text-primary bg-green-400 p-2 w-full rounded-md font-semibold hover:bg-green-200 transition-colors flex items-center gap-x-3`}
        onClick={() => signIn("google")}
      >
        <Image
          className="xsm:w-6 md:w-6 object-cover rounded-full h-fit"
          src={Google}
          alt={"google login"}
          width={20}
          height={20}
        />
        <p>Sign in with Google</p>
      </button>
      <button
        className={`${jose.className} text-primary bg-green-400 p-2 w-full rounded-md font-semibold hover:bg-green-200 transition-colors flex items-center gap-x-3 my-2`}
        onClick={() => signIn("github")}
      >
        <Image
          className="xsm:w-6 md:w-6 object-cover rounded-full h-fit"
          src={Github}
          alt={"github login"}
          width={20}
          height={20}
        />
        <p>Sign in with Github</p>
      </button>
    </div>
  );
};

export default Login;
