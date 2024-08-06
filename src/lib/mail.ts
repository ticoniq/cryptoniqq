import ConfirmEmail from "@/components/mail/ConfirmEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const websiteUrl = process.env.WEBSITE_URL;
const websiteEmail = process.env.WEBSITE_EMAIL;

export const sendVerificationCode = async (email: string, verificationCode: string) => {
  await resend.emails.send({
    from: `Cryptoniq <${websiteEmail}>`,
    to: email,
    subject: "Confirm your email",
    react: ConfirmEmail({ websiteUrl: websiteUrl, code: verificationCode }),
  });
};