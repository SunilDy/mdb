import connectMongo from "utils/connectMongo";
import User from "models/UserModel";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

// const User = mongoose.model('users')

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

type User = {
  name: string;
  email: string;
  image: string;
  emailVerified: boolean;
  likedMovies: string[];
  watchListMovies: string[];
  likedSeries: string[];
  watchListSeries: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    error?: any;
    status?: string;
    message?: string;
    watchListSeries?: string[];
    result?: any;
  }>
) {
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      console.log("CONNECTING TO MONGO");
      await connectMongo();
      console.log("CONNECTED TO MONGO");
      let alreadyContains = false;
      let user: User | null = null;
      if (session?.user) user = await User.findOne({ email: session.user.email });
      if (user) {
        if (user.watchListSeries.includes(req.body.seriesId)) {
          alreadyContains = true;
        }
        if (alreadyContains) {
          res
            .status(403)
            .send({
              status: "err",
              message: "Series already exists in the watchlist",
            });
        } else {
          if (session?.user)
            User.findOneAndUpdate(
              { email: session.user.email },
              {
                $addToSet: { watchListSeries: req.body.seriesId },
              },
              { new: true },
              function (err: any, user: User) {
                if (err) {
                  console.log(err);
                }
                res
                  .status(201)
                  .send({ status: "ok", message: "Added to the watchlist" });
              }
            );
        }
      } else {
        res.status(403).send({ status: "err", message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error, message: "Internal Server Error" });
    }
  }

  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions);
      console.log("CONNECTING TO MONGO");
      await connectMongo();
      console.log("CONNECTED TO MONGO");
      let user: User | null = null;
      if (session?.user) user = await User.findOne({ email: session.user.email });
      if (!user) {
        res.status(403).send({
          status: "err",
          message: "No User Found",
        });
      } else {
        let watchListSeriesArray: any[] | [] = [];
        for (let id in user.watchListSeries) {
          let result = await axios.get(
            `https://api.themoviedb.org/3/tv/${user.watchListSeries[id]}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
          );

          watchListSeriesArray = [...watchListSeriesArray, result.data];
        }

        await res.status(200).send({
          status: "ok",
          result: watchListSeriesArray,
        });
      }
    } catch (error) {
      // console.log(error);
      res.status(500).send({ error, message: "Internal Server Error" });
    }
  }

  if (req.method === "PATCH") {
    try {
      const session = await getServerSession(req, res, authOptions);
      console.log("CONNECTING TO MONGO");
      await connectMongo();
      console.log("CONNECTED TO MONGO");
      let seriesIdAlreadyInTheList = false;
      let user: User | null = null;
      if (session?.user) user = await User.findOne({ email: session.user.email });
      if (user) {
        if (user.watchListSeries.includes(req.body.seriesId)) {
          seriesIdAlreadyInTheList = true;
        }
      } else {
        res.status(403).send({
          status: "err",
          message: "User not found / wrong session",
        });
      }
      if (!seriesIdAlreadyInTheList) {
        res.status(400).send({
          status: "err",
          message: "MovieID is not in the list",
        });
      } else {
        let user: User | null = null;
        if (session?.user)
          user = await User.findOneAndUpdate(
            { email: session?.user.email },
            { $pull: { watchListSeries: req.body.seriesId } },
            { new: true }
          );
        if (!user) {
          res.status(403).send({
            status: "err",
            message: "No User Found",
          });
        } else {
          res.status(200).send({
            status: "ok",
            watchListSeries: user.watchListSeries,
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error, message: "Internal Server Error" });
    }
  }
}
