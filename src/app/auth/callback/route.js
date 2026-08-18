import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");

  console.log("CODE EXISTS:", !!code);

  if (code) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("EXCHANGE ERROR:", error);
    console.log("SESSION EXISTS:", !!data?.session);
  }

  return NextResponse.redirect(new URL("/?loginSuccess=true", request.url));
}
