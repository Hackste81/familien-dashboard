import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(
      new URL("/termine?google=error", request.url)
    );
  }

  const redirectUri =
    "https://familien-dashboard-git-main-familien-dashboard.vercel.app/api/google/callback";

const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const tokens = await response.json();

  if (!response.ok || !tokens.access_token) {
    console.error("Google Token Fehler:", tokens);

    return NextResponse.redirect(
      new URL("/termine?google=token_error", request.url)
    );
  }

  const redirect = NextResponse.redirect(
    new URL("/termine?google=connected", request.url)
  );

  redirect.cookies.set("google_access_token", tokens.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: tokens.expires_in || 3600,
  });

  if (tokens.refresh_token) {
    redirect.cookies.set("google_refresh_token", tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return redirect;
}
