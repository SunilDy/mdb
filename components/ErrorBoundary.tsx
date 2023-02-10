import { Component } from "react";
import Error from "../public/Error/Error.svg";
import Image from "next/image";
import { Josefin_Sans } from "@next/font/google";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";

const jose = Josefin_Sans({
  subsets: ["latin"],
});

class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  //@ts-ignore
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  //@ts-ignore
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  render() {
    let Message = "Sorry. Something went wrong!";
    // Check if the error is thrown
    //@ts-ignore
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <Navbar />
          <div className="flex flex-col items-center my-10 px-24">
            <Image src={Error} alt={"Error"} height="500" width="500" />
            <h1
              className={`
        ${jose.className} text-green-400
        xsm:text-sm md:text-lg lg:text-2xl
        `}
            >
              {Message}
            </h1>
            <Link href={"/"}>
              <p className="text-primary bg-green-400 rounded-md font-semibold xsm:px-1 lg:px-2 lg:py-1 my-2 xsm:text-sm lg:text-lg">
                Go Home
              </p>
            </Link>
          </div>
          <Footer />
        </div>
      );
    }

    // Return children components in case of no error

    //@ts-ignore
    return this.props.children;
  }
}

export default ErrorBoundary;
