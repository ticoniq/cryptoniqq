import ConfirmEmail from "@/components/mail/ConfirmEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL as string;
const websiteEmail = "no-reply@cryptoniq.tech";

export const sendVerificationCode = async (email: string, verificationCode: string) => {
  await resend.emails.send({
    from: `Cryptoniq <${websiteEmail}>`,
    to: email,
    subject: "Confirm your Cryptoniq account",
    react: ConfirmEmail({ websiteUrl: websiteUrl, verificationCode: verificationCode }),
  });
};