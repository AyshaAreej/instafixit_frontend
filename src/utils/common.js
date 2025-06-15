import { getDecryptedData } from "./cryptoUtils";

export const getToken = () => {
  const data = getDecryptedData();
  return data?.accessToken;
};
 export const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};