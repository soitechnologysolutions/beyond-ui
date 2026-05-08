import React from 'react';
import { Html, Head, Body, Container, Section, Text, Button, Preview } from '@react-email/components';

export interface ResetPasswordEmailProps {
  userName?: string;
  resetUrl?: string;
  companyName?: string;
}

export const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({
  userName = 'User',
  resetUrl = 'https://example.com/reset-password',
  companyName = 'Beyond Corp'
}) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your {companyName} password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>Reset Password</Text>
          <Text style={paragraph}>Hello {userName},</Text>
          <Text style={paragraph}>
            Someone recently requested a password change for your {companyName} account. If this was you, you can set a new password here:
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={resetUrl}>
              Reset Password
            </Button>
          </Section>
          <Text style={paragraph}>
            If you don't want to change your password or didn't request this, just ignore and delete this message.
          </Text>
          <Text style={paragraph}>
            Thanks,<br />
            The {companyName} Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = { backgroundColor: '#f6f9fc', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '20px 0 48px', marginBottom: '64px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)' };
const heading = { fontSize: '24px', fontWeight: '600', color: '#333', padding: '20px 24px', margin: '0' };
const paragraph = { fontSize: '16px', lineHeight: '24px', color: '#525f7f', padding: '0 24px', margin: '16px 0' };
const btnContainer = { padding: '0 24px', margin: '24px 0' };
const button = { backgroundColor: '#007ee6', borderRadius: '4px', color: '#fff', fontSize: '16px', textDecoration: 'none', textAlign: 'center' as const, display: 'inline-block', padding: '12px 24px' };

export default ResetPasswordEmail;