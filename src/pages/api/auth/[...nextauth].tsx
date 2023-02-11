import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "utils/mongodb";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      // @ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      // @ts-ignore
      clientId: process.env.GITHUB_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: "BestKeptSecret",
};
export default NextAuth(authOptions);

// export default NextAuth({
//     adapter: MongoDBAdapter(clientPromise),
//     providers: [
//         GoogleProvider({
//           // @ts-ignore
//           clientId: process.env.GOOGLE_CLIENT_ID,
//           // @ts-ignore
//           clientSecret: process.env.GOOGLE_SECRET,
//         }),
//         // ...add more providers here
//       ],
//   })
