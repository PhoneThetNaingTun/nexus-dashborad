import { END_POINTS } from "@/lib/api/config";
import {
  accessTokenCookie,
  refreshTokenCookie,
} from "@/lib/api/cookie/cookie-config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refresh_token = cookieStore.get("refresh_token")?.value;

    if (!refresh_token) {
      return NextResponse.json(
        { message: "No refresh token" },
        { status: 401 },
      );
    }

    // Call your backend refresh endpoint
    const backendRes = await fetch(
      `${process.env.API_URL}${END_POINTS.AUTH.REFRESH}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refresh_token}`,
        },
      },
    );

    if (!backendRes.ok) {
      // Refresh token invalid or expired
      return NextResponse.json(
        { message: "Refresh token invalid" },
        { status: 401 },
      );
    }

    const { data } = await backendRes.json();

    const newAccessToken = data.data.access_token;
    const newRefreshTOken = data.data.refresh_token;

    const response = NextResponse.json({ access_token: newAccessToken });

    response.cookies.set("access_token", newAccessToken, accessTokenCookie);
    response.cookies.set("refresh_token", newRefreshTOken, refreshTokenCookie);

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
