import { Metadata } from "next";
import LoginForm from "./components/LoginForm";

export const metadata: Metadata = {
  title: "Login - Hektic",
  description: "Secure login to your dashboard using Google or email.",
  robots: "index, follow",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <LoginForm />
    </div>
  );
}
