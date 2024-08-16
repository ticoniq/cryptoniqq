import { encodeHex, decodeHex } from "oslo/encoding";
import { createTOTPKeyURI, TOTPController } from "oslo/otp";
// @ts-ignore
import QRCode from "qrcode";
import { alphabet, generateRandomString } from "oslo/crypto";
import { customAlphabet } from "nanoid";

export function generateBackupCodes(count: number = 12, length: number = 10): string[] {
  const generateCode = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', length);
  const backupCodes = Array.from({ length: count }, generateCode);
  return backupCodes;
}

export function generateTwoFactorSecret() {
  return crypto.getRandomValues(new Uint8Array(8));
}

export function generateTwoFactorSecretKey() {
  const code = generateRandomString(16, alphabet("A-Z"));
  return code;
}

export function createTwoFactorURI(appName: string, username: string, secret: Uint8Array) {
  return createTOTPKeyURI(appName, username, secret);
}

export async function generateQRCode(uri: string) {
  return QRCode.toDataURL(uri);
}

export async function verifyTOTP(otp: string, secret: string) {
  return new TOTPController().verify(otp, decodeHex(secret));
}