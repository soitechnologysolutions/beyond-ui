import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface FollowUpEmailProps {
  prospectName?: string;
  senderName?: string;
  lastContactDays?: number;
  meetingLink?: string;
}

export const FollowUpEmail: React.FC<FollowUpEmailProps> = ({
  prospectName = 'Alex',
  senderName = 'Jordan',
  lastContactDays = 3,
  meetingLink = 'https://calendly.com/example/15min'
}) => {
  return (
    <EmailLayout previewText="Just bubbling this up to the top of your inbox" title="Checking in">
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">Hi {prospectName},</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        I know things can get busy, so I just wanted to bubble my last note up to the top of your inbox. Are you still open to exploring how we can help your team streamline operations?
      </Text>
      <Section className="mb-6"><EmailButton href={meetingLink}>Find a time to chat</EmailButton></Section>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">Best,<br />{senderName}</Text>
    </EmailLayout>
  );
};

export default FollowUpEmail;