import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./features/auth/actions/login";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await login({
            email: credentials?.email as string,
            password: credentials?.password as string,
          });

          if (!res) {
            return null;
          }

          if (res.success && res.data) {
            const { email, token, name, id } = res.data;
            return {
              id: String(id),
              email,
              name,
              accessToken: token,
            };
          }

          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = {
        ...session.user,
        id: token.id as string,
      };
      return session;
    },
  },
});
