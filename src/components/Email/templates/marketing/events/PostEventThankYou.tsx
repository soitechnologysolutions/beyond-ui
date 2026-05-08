import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const PostEventThankYou: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Thanks for an amazing event!" title="Thank You">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">That's a Wrap! 🎬</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      Thank you so much for joining us and making the event a massive success. The gallery of photos and session replays are now available online.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>View Gallery</EmailButton>
    </Section>
  </EmailLayout>
);
export default PostEventThankYou;
