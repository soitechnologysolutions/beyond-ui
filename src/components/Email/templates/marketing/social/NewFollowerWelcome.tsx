import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const NewFollowerWelcome: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Thanks for following us!" title="Welcome to the Community">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Thanks for following!</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      We love connecting with our community on social media. Check out some of our most popular posts and feel free to jump into the conversation!
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Join the Chat</EmailButton>
    </Section>
  </EmailLayout>
);
export default NewFollowerWelcome;
