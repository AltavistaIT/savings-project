import { LoginForm } from "@/features/auth/components/login-form";

export const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto h-screen flex flex-col justify-center py-16 space-y-6">
      <LoginForm />
    </div>
  )
};