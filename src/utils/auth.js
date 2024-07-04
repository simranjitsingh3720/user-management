import { TOKEN, TOKEN_EXPIRATION } from "./globalConstants";

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN);
  const expirationTime = localStorage.getItem(TOKEN_EXPIRATION);
  if (!token || !expirationTime) return false;
  if (new Date().getTime() >= parseInt(expirationTime)) {
    console.log("token expired");
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(TOKEN_EXPIRATION);
  }
  return new Date().getTime() <= parseInt(expirationTime);
};

export const expirationTime = () => {
  const expiration = new Date().getTime() + 30 * 60 * 1000;
  return expiration;
};
