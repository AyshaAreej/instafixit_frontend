import * as CryptoJS from "crypto-js";

export const secretKey = '123sdf12esad2ef34tgb34'; //Secret Key

// Encrypt data and store in localStorage
export const encryptAndStore = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey,
  ).toString();
  localStorage.setItem('encryptedData', encryptedData);
};

// Get encrypted data from localStorage and decrypt it
export const getDecryptedData = () => {
  const encryptedData = localStorage.getItem('encryptedData');
  if (!encryptedData) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
};
