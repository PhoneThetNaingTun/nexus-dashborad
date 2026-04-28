export const getErrorMessage = (error: unknown) => {
  const errormessage =
    error instanceof Error
      ? error.message
      : "Something went wrong, please try again later.";
  return errormessage;
};
