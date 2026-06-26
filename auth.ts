import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import { configDotenv } from "dotenv";

export const {handlers, auth, signIn, signOut} = NextAuth({
    trustHost: true,
    adapter : PrismaAdapter(prisma),
    session : {strategy : "jwt"},
    providers : [Google({
        clientId : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET
    })],
    callbacks: {
        
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
})