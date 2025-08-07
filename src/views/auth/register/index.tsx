import { RegisterForm } from "@/features/auth/components/register-form";

export const RegisterPage = () => {
  return (
    <div className="max-w-md mx-auto h-screen flex flex-col justify-center py-16 space-y-6">
      <RegisterForm />
    </div>
  );
}