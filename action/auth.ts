import { LoginSchema } from "@/features/auth/schema/login-schema";
import { api } from "@/lib/api/api";
import { setServerCookie } from "@/lib/api/cookie/cookie-server";

export const getMe = async () => {
  const data = await api.auth.me();
  return data;
};

export const login = async (payload: LoginSchema) => {
  const { data } = await api.auth.login<{
    access_token: string;
    refresh_token: string;
  }>(payload);

  await setServerCookie({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  });
};
