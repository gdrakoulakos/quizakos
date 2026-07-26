import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function DELETE(request) {
  const { userId } = await request.json();

  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({
    message: "Account deleted",
  });
}
