import { supabase } from "@/lib/supabase";

export async function saveQuizProgress(
  isLoggedIn,
  hasSavedToSupabase,
  quizProgressData,
  loggedInUserName,
) {
  if (!isLoggedIn || hasSavedToSupabase.current) return;

  hasSavedToSupabase.current = true;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !quizProgressData) return;

  const databaseQuizProgress = {
    ...quizProgressData,
    user_id: user.id,
    username: loggedInUserName,
  };

  const { error } = await supabase
    .from("user_lesson_progress")
    .upsert(databaseQuizProgress, {
      onConflict: "user_id,lesson_id",
    });

  if (error) {
    console.error(error);
    return;
  }
}
