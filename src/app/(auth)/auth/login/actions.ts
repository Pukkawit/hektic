"use server";

import { createSupabaseServerClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";

export async function loginWithEmailPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error !== null && error !== undefined) {
    throw new Error(error.message);
  }

  redirect("/dashboard");
  return error ? { error: error?.message } : { success: true };
}

export async function loginWithGoogle() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect(data.url);
  return error ? { error: error?.message } : { success: true };
}
