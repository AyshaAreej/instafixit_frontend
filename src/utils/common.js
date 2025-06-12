import { getDecryptedData } from "./cryptoUtils";

export const getToken = () => {
  const data = getDecryptedData();
  return data?.accessToken;
};
 