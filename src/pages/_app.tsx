import type { AppProps } from "next/app";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Inter, Josefin_Sans } from "@next/font/google";
import ErrorBoundary from "components/ErrorBoundary";
import { SessionProvider } from "next-auth/react";

// Component Imports
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const inter = Inter({ subsets: ["latin"] });
const jose = Josefin_Sans({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient({});
  return (
    <ErrorBoundary>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          {/* <main className={inter.className}> */}
          <main>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </main>
        </QueryClientProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}
