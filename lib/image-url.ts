const UPLOADS_IMAGE_PATH = "/uploads/images/";

export const getPublicImageUrl = (image?: string | null) => {
  const value = image?.trim();
  if (!value) return undefined;

  if (/^(https?:|data:|blob:)/i.test(value)) return value;

  const path = value.startsWith("/uploads/")
    ? value
    : value.startsWith("uploads/")
      ? `/${value}`
      : `${UPLOADS_IMAGE_PATH}${value.replace(/^\/+/, "")}`;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl?.startsWith("http")) return path;

  return new URL(path, new URL(apiUrl).origin).toString();
};
