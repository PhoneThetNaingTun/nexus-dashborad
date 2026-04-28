"use server";

import { cookies } from "next/headers";
import { accessTokenCookie, refreshTokenCookie } from "./cookie-config";

export const getServerCookie = async (): Promise<{
  access_token?: string | null;
  refresh_token?: string | null;
}> => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;
  const refresh_token = cookieStore.get("refresh_token")?.value;

  return { access_token, refresh_token };
};

export const setServerCookie = async (payload: {
  access_token?: string | null;
  refresh_token?: string | null;
}) => {
  const cookieStore = await cookies();
  if (payload.access_token) {
    cookieStore.set("access_token", payload.access_token, accessTokenCookie);
  }
  if (payload.refresh_token) {
    cookieStore.set("refresh_token", payload.refresh_token, refreshTokenCookie);
  }
};
