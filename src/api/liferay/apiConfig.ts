import { getAuthToken, getLiferay } from "../../util/liferay";

const AUTH_TOKEN_KEY = "x-csrf-token";

export const getBaseUrl = (): string => {
  if (process.env["NODE_ENV"] === "development") {
    return `http://localhost:8080`;
  } else {
    return getLiferay().ThemeDisplay.getPortalURL();
  }
};

export const liferayFetch = async (
  url: string,
  init?: RequestInit
): Promise<Response> => {
  const authToken = getAuthToken();
  if (init === undefined) init = {};
  if (init.headers === undefined) {
    init.headers = {
      [AUTH_TOKEN_KEY]: authToken,
    };
  } else if (Array.isArray(init.headers)) {
    init.headers.push([AUTH_TOKEN_KEY, authToken]);
  } else if (init.headers instanceof Headers) {
    init.headers.set(AUTH_TOKEN_KEY, authToken);
  } else {
    init.headers[AUTH_TOKEN_KEY] = authToken;
  }

  return fetch(url, init);
};
