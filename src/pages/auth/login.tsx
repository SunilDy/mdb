import {
  useSession,
  signIn,
  signOut,
  SessionContextValue,
} from "next-auth/react";
import { useRouter } from "next/router";
import { Josefin_Sans } from "@next/font/google";

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
    <div className="text-white bg-slate-300 flex-col items-center bg-opacity-30 mx-auto w-fit my-36 flex justify-center p-10 rounded-md">
      <h1
        className={`${jose.className} text-green-400 text-3xl font-bold my-4`}
      >
        Sign In
      </h1>
      <button
        className={`${jose.className} text-primary bg-green-400 p-2 w-full rounded-md font-semibold hover:bg-green-200 transition-colors`}
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
