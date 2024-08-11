import { encodeHex, decodeHex } from "oslo/encoding";
import { createTOTPKeyURI, TOTPController } from "oslo/otp";
// @ts-ignore
import QRCode from "qrcode";

export function generateTwoFactorSecret() {
  return crypto.getRandomValues(new Uint8Array(8));
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