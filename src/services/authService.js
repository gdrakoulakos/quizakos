import { supabase } from "@/lib/supabase";

export async function signUp(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  return { data, error };
}

export async function signInWithGoogle() {
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

export async function signInWithPassword(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    throw error;
  }

  window.location.href = "/?loginSuccess=true";
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error.message);
  } else {
    window.location.href = "/";
  }
}

export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    console.error(error.message);
    throw error;
  }
}

export async function deleteAccount() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("No user logged in");
    return;
  }

  const response = await fetch("/api/delete-account", {
    method: "DELETE",
    body: JSON.stringify({
      userId: user.id,
    }),
  });

  const result = await response.json();

  if (response.ok) {
    await supabase.auth.signOut();

    window.location.href = "/";
  } else {
    console.error(result.error);
  }
}
