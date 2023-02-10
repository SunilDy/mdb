import connectMongo from "utils/connectMongo";
import User from "models/UserModel";
import type { NextApiRequest, NextApiResponse } from 'next'
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
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{error?: any, status?: string, message?: string, likedMovies?: string[], watchListMovies?: string[], result?: any}>
) {

    if (req.method === 'POST') {
        try {
            const session = await getServerSession(req, res, authOptions)
            console.log('CONNECTING TO MONGO');
            await connectMongo();
            console.log('CONNECTED TO MONGO');
            let alreadyContains = false;
            let user: User | null = null
            if(session?.user)
                user = await User.findOne({ name: session.user.name })
            if(user) {
                if(user.watchListMovies.includes(req.body.movieId)) {
                    alreadyContains = true
                }
                if(alreadyContains) {
                    res.status(403).send({status: "err", message: "Movie already exists in the watchlist"})
                } else {
                    if(session?.user)
                        User.findOneAndUpdate({name: session.user.name}, {
                            $addToSet: {watchListMovies: req.body.movieId}, 
                        }, {new: true}, function(err: any, user: User) {
                            if(err) {
                                console.log(err)
                            }
                            res.status(201).send({status: "ok", message: "Added to the watchlist"})
                        })
                }
            } else {
                res.status(403).send({status: "err", message: "User not found"})
            }
          } catch (error) {
            console.log(error);
            res.status(500).send({ error, message: "Internal Server Error" });
          }
    }

    if (req.method === 'GET') {
        try {
            const session = await getServerSession(req, res, authOptions)
            console.log('CONNECTING TO MONGO');
            await connectMongo();
            console.log('CONNECTED TO MONGO');
            let user: User | null = null
            if(session?.user)
                user = await User.findOne({ name: session.user.name })
            if(!user) {
                res.status(403).send({
                    status: "err",
                    message: "No User Found"
                })
            } else {
                let watchListMoviesArray: any[] | [] = []
                for(let id in user.watchListMovies) {let result = await axios.get(`https://api.themoviedb.org/3/movie/${user.watchListMovies[id]}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`)
                    watchListMoviesArray = [...watchListMoviesArray, result.data]
                }

                await res.status(200).send({
                    status: "ok",
                    result: watchListMoviesArray
                })
            }

          } catch (error) {
            // console.log(error);
            res.status(500).send({ error, message: "Internal Server Error" });
          }
    }

    if (req.method === 'PATCH') {
        try {
            const session = await getServerSession(req, res, authOptions)
            console.log('CONNECTING TO MONGO');
            await connectMongo();
            console.log('CONNECTED TO MONGO');
            let movieIdAlreadyInTheList = false
            let user: User | null = null
            if(session?.user)
                user = await User.findOne({ name: session.user.name })
            if(user) {
                if(user.watchListMovies.includes(req.body.movieId)) {
                    movieIdAlreadyInTheList = true
                }
            } else {
                res.status(403).send({
                    status: "err",
                    message: "User not found / wrong session"
                })
            }
            if(!movieIdAlreadyInTheList) {
                res.status(400).send({
                    status: "err",
                    message: "MovieID is not in the list"
                })
            } else {
                let user: User | null = null
                if(session?.user)
                    user = await User.findOneAndUpdate(
                        { name: session?.user.name },
                        { $pull: {watchListMovies: req.body.movieId} },
                        { new: true}
                    )
                if(!user) {
                    res.status(403).send({
                        status: "err",
                        message: "No User Found"
                    })
                } else {
                    res.status(200).send({
                        status: "ok",
                        watchListMovies: user.watchListMovies
                    })
                }
            }

          } catch (error) {
            console.log(error);
            res.status(500).send({ error, message: "Internal Server Error" });
          }
    }

}
