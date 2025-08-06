import { auth } from "@/auth";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session && !session.expired) {
    redirect(routes.private.reports.overview);
  }

  return <>{children}</>;
}