import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface MilestoneEmailProps {
  userName?: string;
  milestoneName?: string;
  achievementValue?: string;
  shareLink?: string;
}

export const MilestoneEmail: React.FC<MilestoneEmailProps> = ({
  userName = 'User',
  milestoneName = 'Tasks Completed',
  achievementValue = '100',
  shareLink = 'https://example.com/share/milestone/123'
}) => {
  return (
    <EmailLayout previewText="You just hit a new milestone! 🎉" title="Milestone Unlocked">
      <Text className="text-3xl text-center mb-2">🏆</Text>
      <Text className="text-2xl font-bold text-gray-900 mb-4 text-center">Incredible work, {userName}!</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6 text-center">
        You just hit a major milestone on our platform. We are thrilled to celebrate this achievement with you.
      </Text>
      <Section className="bg-yellow-50 border border-yellow-100 p-6 rounded-lg mb-6 text-center">
        <Text className="text-gray-500 font-semibold uppercase tracking-wider text-xs m-0 mb-2">{milestoneName}</Text>
        <Text className="text-4xl font-bold text-yellow-600 m-0">{achievementValue}</Text>
      </Section>
      <Section className="text-center mb-6">
        <EmailButton href={shareLink}>
          Share Your Achievement
        </EmailButton>
      </Section>
      <EmailDivider />
      <Text className="text-gray-500 text-sm text-center">Keep up the great work! We can't wait to see what you do next.</Text>
    </EmailLayout>
  );
};

export default MilestoneEmail;