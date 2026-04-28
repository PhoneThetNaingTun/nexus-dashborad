import Cookie from "js-cookie";
export const getClientCookie = () => {
  if (typeof window === "undefined")
    return { access_token: undefined, refresh_token: undefined };

  const access_token = Cookie.get("access_token");
  const refresh_token = Cookie.get("refresh_token");

  if (!access_token && document.cookie.includes("access_token")) {
    console.warn("Cookie exists but is HttpOnly and inaccessible to JS.");
  }

  return { access_token, refresh_token };
};
