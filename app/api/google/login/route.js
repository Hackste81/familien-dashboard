import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  const redirectUri =
    "https://familien-dashboard-git-main-familien-dashboard.vercel.app/api/google/callback";

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
scope: "https://www.googleapis.com/auth/calendar.readonly",
    access_type: "offline",
    prompt: "consent",
  });

  return NextResponse.redirect(
`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
}
