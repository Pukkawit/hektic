// app/(auth)/login/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginWithEmailPassword, loginWithGoogle } from "../actions";
export const metadata = {
  title: "Login - Hektic SaaS",
  description:
    "Secure login to your Hektic SaaS dashboard. Access your multi-tenant workspace now.",
  keywords: ["login", "SaaS", "multi-tenant", "dashboard", "auth"],
  robots: "index, follow",
  openGraph: {
    title: "Login - Hektic SaaS",
    description: "Secure login to your Hektic SaaS dashboard.",
    url: "https://hektic-pukkawit-projects.vercel.app/login",
    siteName: "Hektic SaaS",
    locale: "en_US",
    type: "website",
  },
};

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Submitting:", data);

    await loginWithEmailPassword(data);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-2xl shadow-md">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <div className="text-center text-sm text-gray-500">or</div>

        <button
          type="button"
          className="w-full bg-red-500 hover:bg-red-600"
          onClick={async () => await loginWithGoogle()}
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}
