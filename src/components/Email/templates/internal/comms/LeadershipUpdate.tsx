import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout, EmailDivider } from '../../../components';

export interface LeadershipUpdateProps {
  senderName?: string;
  senderTitle?: string;
  subject?: string;
  messageBlocks?: string[];
}

export const LeadershipUpdate: React.FC<LeadershipUpdateProps> = ({
  senderName = 'Jane Doe',
  senderTitle = 'CEO',
  subject = 'Q3 Company Update',
  messageBlocks = [
    'I want to take a moment to reflect on our outstanding performance this past quarter. Thanks to your hard work, we hit all of our primary OKRs.',
    'As we move into Q4, our focus will shift towards expanding our enterprise offerings and finalizing the upcoming product launch.',
    'Thank you all for your continued dedication.'
  ]
}) => {
  return (
    <EmailLayout previewText={subject} title={subject}>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{subject}</Text>
      {messageBlocks.map((block, index) => (
        <Text key={index} className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
          {block}
        </Text>
      ))}
      <EmailDivider />
      <Text className="text-gray-900 dark:text-white font-semibold text-base m-0">{senderName}</Text>
      <Text className="text-gray-500 dark:text-gray-400 text-sm m-0">{senderTitle}</Text>
    </EmailLayout>
  );
};

export default LeadershipUpdate;