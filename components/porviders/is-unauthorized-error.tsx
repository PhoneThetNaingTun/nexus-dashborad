export const isUnauthorizedError = (error: any) => {
  if (error?.response?.status === 401) {
    return true;
  }
  return false;
};
