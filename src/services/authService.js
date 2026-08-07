import { supabase } from "@/lib/supabase";

export async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    alert(error.message);
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error.message);
  } else {
    window.location.href = "/";
  }
}
