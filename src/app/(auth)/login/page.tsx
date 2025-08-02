import { Metadata } from "next";
import LoginForm from "./components/LoginForm";

export const metadata: Metadata = {
  title: "Login - My App",
  description: "Secure login to your dashboard using Google or email.",
  robots: "index, follow",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
