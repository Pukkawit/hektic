"use server";

import { createSupabaseServerClient } from "@/lib/supabase/serverClient";

export async function signUpWithEmailPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({ email, password });
  return error ? { error: error.message } : { success: true };
}

export async function signUpWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/login` },
  });
  return error ? { error: error.message } : { success: true };
}
