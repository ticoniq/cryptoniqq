import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface AccountDeleteProps {
  websiteUrl: string;
  firstname: string;
}

export const AccountDelete = ({
  websiteUrl,
  firstname,
}: AccountDeleteProps) => {
  return (
    <Html>
      <Head />
      <Preview>Account Deletion Confirmation</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${websiteUrl}/logo/logo.png`}
            alt="cryptoniq Logo"
            width={160}
            height={32}
          />
          <Section>
            <Text style={text}>Hi {firstname},</Text>
            <Text style={text}>
              We&apos;re reaching out to confirm that your account has been successfully deleted. We&apos;re truly sorry to see you leave our community.
            </Text>
            <Text style={text}>Here&apos;s what you need to know:</Text>
            <ul>
              <li>
                <Text style={text}>Your account has been successfully deleted from our system.</Text>
              </li>
              <li>
                <Text style={text}>Any remaining data associated with your account will be permanently removed within the next 30 days.</Text>
              </li>
              <li>
                <Text style={text}>If you have any outstanding balances or credits, our finance team will be in touch separately.</Text>
              </li>
            </ul>
            <Text style={text}>
              We constantly strive to improve our service. If you&apos;re willing, we&apos;d greatly appreciate your feedback on why you decided to leave. Your insights can help us serve our community better.
            </Text>
            <Text style={text}>
              If you believe this account closure was made in error, or if you change your mind, please don&apos;t hesitate to contact us at <a href="mailto:support@cryptoniq.tech">support@cryptoniq.tech</a> within the next 15 days. We may be able to reactivate your account.
            </Text>
            <Text style={text}>Thank you for being a part of Cryptoniq. We wish you all the best in your future endeavors.</Text>
            <Text style={text}>Warm regards, <br /> The Cryptoniq Team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AccountDelete;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};
