import React from 'react';
import { Html, Head, Body, Container, Section, Text, Button, Img, Hr, Preview } from '@react-email/components';

export interface WelcomeEmailProps {
  userName?: string;
  loginUrl?: string;
  companyName?: string;
  logoUrl?: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  userName = 'User',
  loginUrl = 'https://example.com/login',
  companyName = 'Beyond Corp',
  logoUrl = 'https://via.placeholder.com/150x50'
}) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {companyName}!</Preview>
      <Body style={main}>in our library or in the service?
        <Container style={container}>
          <Img src={logoUrl} width="150" height="50" alt={companyName} style={logo} />
          <Text style={heading}>Welcome to {companyName}, {userName}!</Text>
          <Text style={paragraph}>
            We're thrilled to have you on board. To get started, please log in to your account.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={loginUrl}>
              Get Started
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,<br />
            The {companyName} Team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = { 
  backgroundColor: '#ffffff', 
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif' 
};
const container = { margin: '0 auto', padding: '20px 0 48px' };
const logo = { margin: '0 auto', marginBottom: '24px' };
const heading = { fontSize: '24px', letterSpacing: '-0.5px', lineHeight: '1.3', fontWeight: '400', color: '#484848', padding: '17px 0 0' };
const paragraph = { margin: '0 0 15px', fontSize: '15px', lineHeight: '1.4', color: '#3c4149' };
const btnContainer = { textAlign: 'center' as const, padding: '24px 0' };
const button = { backgroundColor: '#007ee6', borderRadius: '3px', color: '#fff', fontSize: '16px', textDecoration: 'none', textAlign: 'center' as const, display: 'block', padding: '12px 24px' };
const hr = { borderColor: '#cccccc', margin: '20px 0' };
const footer = { color: '#8898aa', fontSize: '12px' };

export default WelcomeEmail;