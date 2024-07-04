import { TOKEN, TOKEN_EXPIRATION } from "./globalConstants";

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN);
  const expirationTime = localStorage.getItem(TOKEN_EXPIRATION);
  if (!token || !expirationTime) return false;
  // if (new Date().getTime() >= parseInt(expirationTime)) {
  //   console.log("token expired");
  // }
  return new Date().getTime() <= parseInt(expirationTime);
};

export const expirationTime = () => {
  const expiration = new Date().getTime() + 1 * 60 * 1000;
  return expiration;
};
