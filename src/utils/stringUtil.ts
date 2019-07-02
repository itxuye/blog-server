import * as CryptoJS from 'crypto-js/crypto-js';
/**
 * usual string md5
 * @param content encode str
 */
export function md5Sign(content) {
  return CryptoJS.MD5(`${content}itxuye`).toString();
}
/**
 * @desc encrypt
 * @param content string
 * @param keys encode key 16bite
 * @param ivs 16bite
 */
export function encryptString(content, keys, ivs) {
  const key = CryptoJS.enc.Utf8.parse(keys);
  const iv = CryptoJS.enc.Utf8.parse(ivs);
  const srcs = CryptoJS.enc.Utf8.parse(content);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}
/**
 * @desc decrypt
 * @param content
 * @param keys 16bite
 * @param ivs 16bite
 */
export function decryptString(content, keys, ivs) {
  const key = CryptoJS.enc.Utf8.parse(keys); // 加密秘钥 16 bite
  const iv = CryptoJS.enc.Utf8.parse(ivs); //  矢量
  const baseResult = CryptoJS.enc.Base64.parse(content); // Base64解密
  const ciphertext = CryptoJS.enc.Base64.stringify(baseResult); // Base64解密
  const decryptResult = CryptoJS.AES.decrypt(ciphertext, key, {
    //  AES解密
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decryptResult.toString(CryptoJS.enc.Utf8).toString();
}
