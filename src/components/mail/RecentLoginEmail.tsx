import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";

interface RecentLoginEmailProps {
  websiteUrl: string;
  firstname?: string;
  loginDate?: string;
  loginDevice?: string;
  loginLocation?: string;
  loginIp?: string;
}

export const RecentLoginEmail = ({
  websiteUrl,
  firstname,
  loginDate,
  loginDevice,
  loginLocation,
  loginIp,
}: RecentLoginEmailProps) => {

  return (
    <Html>
      <Head />
      <Preview>Cryptoniq recent login</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img
              src={`${websiteUrl}/logo/logo.png`}
              alt="cryptoniq Logo"
              width={160}
              height={32}
            />
          </Section>

          <Section style={content}>
            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Hi {firstname},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  We noticed a recent login to your Cryptoniq account.
                </Heading>

                <Text style={paragraph}>
                  <b>Time: </b>
                  {loginDate}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Device: </b>
                  {loginDevice}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Location: </b>
                  {loginLocation}
                </Text>
                <Text
                  style={{
                    color: "rgb(0,0,0, 0.5)",
                    fontSize: 14,
                    marginTop: -5,
                  }}
                >
                  *Approximate geographic location based on IP address:
                  {loginIp}
                </Text>

                <Text style={paragraph}>
                  If this was you, there&apos;s nothing else you need to do.
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  If this wasn&apos;t you or if you have additional questions, please
                  see our support page.
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Link
                  style={button}
                  href={`${websiteUrl}/blog`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </Link>
              </Column>
            </Row>
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            &copy; 2022 | Crytoniq Inc. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default RecentLoginEmail;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "0 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#3772FF",
  borderRadius: 3,
  color: "#FFFFFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  margin: "0 auto",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const boxInfos = {
  padding: "20px",
};