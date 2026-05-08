import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const ComeBack60Day: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="You've been missed!" title="Come Back">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">It's been a while!</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      It's been two months since we last saw you. Our platform has evolved a lot since then, and we'd love to show you around. 
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Log In to See What's New</EmailButton>
    </Section>
  </EmailLayout>
);
export default ComeBack60Day;
