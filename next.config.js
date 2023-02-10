/** @type {import('next').NextConfig} */

// const path = require("path");
// const { parsed: localEnv } = require("dotenv").config({
//   allowEmptyValues: false,
//   path: path.resolve(__dirname, `.env.local`),
// });

const nextConfig = {
  // env: localEnv,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/original/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
};

module.exports = nextConfig;

// https://image.tmdb.org/t/p/original/${movie.poster_path}
