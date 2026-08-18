import { createBrowserClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");

  if (code) {
    const supabase = await createBrowserClient();

    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL("/?loginSuccess=true", request.url));
}
