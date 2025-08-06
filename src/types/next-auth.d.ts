// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
    expired: boolean;
    accessToken?: string;
  }

  interface User {
    id: string;
    accessToken?: string;
    accessTokenExpires?: number;
  }

  interface JWT {
    accessToken?: string;
    user?: User;
  }
}
