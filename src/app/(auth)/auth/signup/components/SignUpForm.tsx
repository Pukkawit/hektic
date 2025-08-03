"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpWithEmailPassword, signUpWithGoogle } from "../actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FaChrome } from "react-icons/fa6";

// Define schema using Zod for validation
const signUpSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setError(null); // Clear previous errors
    const result = await signUpWithEmailPassword(data);
    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="mb-6 space-y-1 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            Create your account
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email and password to sign up
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
              disabled={isSubmitting}
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              disabled={isSubmitting}
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>
          {error && (
            <p className="text-center text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="relative my-6 flex justify-center text-xs uppercase">
          <span className="z-10 bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            Or continue with
          </span>
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-700"
          onClick={async () => {
            const result = await signUpWithGoogle();
            if (!result?.error) router.push("/dashboard");
            else setError(result.error);
          }}
          disabled={isSubmitting}
        >
          <FaChrome className="mr-2 h-4 w-4" />
          Sign Up with Google
        </button>
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 underline-offset-2 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
