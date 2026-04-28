import { isUnauthorizedError } from "./is-unauthorized-error";
import RefreshAccessToken from "./RefreshAccessToken";

const ServerError = ({ error }: { error: unknown }) => {
  if (isUnauthorizedError(error)) {
    return <RefreshAccessToken />;
  }

  throw error;
};

export default ServerError;
