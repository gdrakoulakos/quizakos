import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  console.log("hello");

  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    await supabase.auth.exchangeCodeForSession(code);
  }

  const response = NextResponse.redirect(new URL("/", request.url));

  response.cookies.set("login_success", "true", {
    maxAge: 10,
    path: "/",
  });

  return response;
}
