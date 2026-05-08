import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const ShareYourStory: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="We want to hear from you!" title="Share Your Story">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tell us your story</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      How has our platform helped you? Share your experience with us on social media using our hashtag, and you might get featured on our page!
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Post on Social</EmailButton>
    </Section>
  </EmailLayout>
);
export default ShareYourStory;
