import ConfirmEmail from "@/components/mail/ConfirmEmail";
import ResetPasswordEmail from "@/components/mail/ResetPassword";
import { Resend } from "resend";
import { APP_TITLE, EMAIL_SENDER } from "@/lib/constants";

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