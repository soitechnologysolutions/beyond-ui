import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const WebinarFollowup: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="Thanks for attending! Here's the recording." title="Webinar Followup">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Thanks for joining us!</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      It was great having you at our latest live session. In case you missed anything, or if you want to review the slides, we've uploaded the full replay.
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Watch the Replay</EmailButton>
    </Section>
  </EmailLayout>
);
export default WebinarFollowup;