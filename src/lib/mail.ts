import ConfirmEmail from "@/components/mail/ConfirmEmail";
import ResetPasswordEmail from "@/components/mail/ResetPassword";
import { Resend } from "resend";
import { APP_TITLE, EMAIL_SENDER } from "@/lib/constants";
import AccountDelete from "@/components/mail/AccountDelete";
import { formattedDateTime } from "./utils";
import RecentLoginEmail from "@/components/mail/RecentLoginEmail";

const RESEND_API_KEY = new Resend(process.env.RESEND_API_KEY);
const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL as string;

export const sendVerificationCode = async (email: string, verificationCode: string) => {
  await RESEND_API_KEY.emails.send({
    from: `${EMAIL_SENDER}`,
    to: email,
    subject: `Confirm your ${APP_TITLE} account`,
    react: ConfirmEmail({ websiteUrl: WEBSITE_URL, verificationCode: verificationCode }),
  });
};

export const passwordVerificationLink = async (email: string, name: string, resetPasswordLink: string) => {
  await RESEND_API_KEY.emails.send({
    from: EMAIL_SENDER,
    to: email,
    subject: `${APP_TITLE} reset your password`,
    react: ResetPasswordEmail({ websiteUrl: WEBSITE_URL, firstname: name, resetPasswordLink: resetPasswordLink }),
  });
};

export const AccountDeletionEmail = async (email: string, name: string) => {
  await RESEND_API_KEY.emails.send({
    from: EMAIL_SENDER,
    to: email,
    subject: `Farewell from ${APP_TITLE} - Account Closure Confirmation`,
    react: AccountDelete({ websiteUrl: WEBSITE_URL, firstname: name }),
  });
};

const date = formattedDateTime(new Date());
const location = "Upland, California, United States";
const ip = "47.149.53.167";

export const sendNewDeviceNotification = async (email: string, firstname: string, device: string) => {
  await RESEND_API_KEY.emails.send({
    from: EMAIL_SENDER,
    to: email,
    subject: `Recent login to your ${APP_TITLE} account.`,
    react: RecentLoginEmail({ websiteUrl: WEBSITE_URL, firstname: firstname, loginDate: date, loginDevice: device, loginLocation: location, loginIp: ip }),
  });
};