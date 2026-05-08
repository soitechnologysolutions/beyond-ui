import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const UserSpotlight: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Check out this month's featured user" title="User Spotlight">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Spotlight 🌟</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      Every month we highlight a user who is doing amazing things. Meet this month's featured creator and learn how they are finding success.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Read Their Story</EmailButton>
    </Section>
  </EmailLayout>
);
export default UserSpotlight;
