declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: User;
  }

  interface User {
    id: string;
    accessToken?: string;
  }

  interface JWT {
    accessToken?: string;
    user?: User;
  }
}
