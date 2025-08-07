import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginAction } from "./features/auth/actions/login";
import { decodeJwt } from "jose";

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
          const { email, password } = credentials;
          if (!email || !password) {
            return null;
          }

          const res = await loginAction({
            email: String(email),
            password: String(password),
          });

          if (!res?.success || !res?.data) {
            return null;
          }

          const { email: userEmail, token, name, id } = res.data;
          const { exp } = decodeJwt(token);

          return {
            id: String(id),
            email: userEmail,
            name,
            accessToken: token,
            accessTokenExpires: exp,
          };
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
        return {
          ...token,
          id: user.id,
          accessToken: user.accessToken,
          accessTokenExpires: user.accessTokenExpires,
        };
      }

      return token;
    },
    async session({ session, token }) {
      const now = Math.floor(Date.now() / 1000);
      const exp = Number(token.accessTokenExpires ?? 0);
      const isExpired = exp < now;

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
        accessToken: token.accessToken as string,
        expired: isExpired,
        expires: new Date(
          Number(token.accessTokenExpires) * 1000
        ).toISOString(),
      };
    },
  },
});
