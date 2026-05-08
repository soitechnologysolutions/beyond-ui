import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface WelcomeEmailProps {
  userName?: string;
  loginUrl?: string;
  companyName?: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  userName = 'User',
  loginUrl = 'https://example.com/login',
  companyName = 'Beyond Corp'
}) => {
  return (
    <EmailLayout 
      previewText={`Welcome to ${companyName}!`}
      title={`Welcome to ${companyName}`}
    >
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome to {companyName}, {userName}!</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        We're thrilled to have you on board. To get started, please log in to your account.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={loginUrl}>
          Get Started
        </EmailButton>
      </Section>
      <Text className="text-gray-700 dark:text-gray-300 text-base">
        Best,<br />
        The {companyName} Team
      </Text>
    </EmailLayout>
  );
};

export default WelcomeEmail;