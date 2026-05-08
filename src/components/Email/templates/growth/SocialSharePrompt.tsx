import React from 'react';
import { Text, Section, Row, Column } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface SocialSharePromptProps {
  userName?: string;
  twitterLink?: string;
  linkedinLink?: string;
}

export const SocialSharePrompt: React.FC<SocialSharePromptProps> = ({
  userName = 'User',
  twitterLink = 'https://twitter.com/intent/tweet?text=I%20love%20using%20Beyond%20Corp!',
  linkedinLink = 'https://www.linkedin.com/sharing/share-offsite/?url=https://example.com'
}) => {
  return (
    <EmailLayout previewText="Tell the world what you think!" title="Share your experience">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Enjoying the platform?</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, we noticed you've been getting a lot of value out of our product recently. We rely heavily on word-of-mouth to grow, and it would mean the world to us if you shared your experience on social media!
      </Text>
      <Section className="mb-6">
        <Row>
          <Column className="pr-2"><EmailButton href={twitterLink}>Share on X</EmailButton></Column>
          <Column className="pl-2"><EmailButton href={linkedinLink}>Share on LinkedIn</EmailButton></Column>
        </Row>
      </Section>
    </EmailLayout>
  );
};

export default SocialSharePrompt;