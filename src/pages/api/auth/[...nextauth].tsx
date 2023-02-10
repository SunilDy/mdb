import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
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
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
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
