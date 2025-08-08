import { RegisterPage } from "@/views/auth/register";

export default function Register() {
  return (
    <section className="h-screen w-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm px-4">
        <RegisterPage />
      </div>
    </section>
  )
}
