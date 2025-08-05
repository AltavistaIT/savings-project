import { auth } from "@/auth";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect(routes.private.reports.overview);
  } else {
    redirect(routes.public.login);
  }
}
