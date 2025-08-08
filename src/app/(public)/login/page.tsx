import { LoginPage } from "@/views/auth/login";

export default function Login() {
  return (
    <section className="h-screen w-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm px-4">
        <LoginPage />
      </div>
    </section>
  )
}
