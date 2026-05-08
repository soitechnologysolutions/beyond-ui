import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface TipOfWeekProps {
  userName?: string;
  tipTitle?: string;
  tipContent?: string;
  learnMoreLink?: string;
}

export const TipOfWeek: React.FC<TipOfWeekProps> = ({
  userName = 'User',
  tipTitle = 'Keyboard Shortcuts',
  tipContent = 'Save time by using keyboard shortcuts! Press Cmd+K (or Ctrl+K on Windows) to open the quick search menu from anywhere in the app.',
  learnMoreLink = 'https://example.com/help/shortcuts'
}) => {
  return (
    <EmailLayout previewText={`Tip of the Week: ${tipTitle}`} title="Tip of the Week">
      <Text className="text-gray-500 font-bold tracking-widest text-xs uppercase mb-2">Tip of the Week</Text>
      <Text className="text-2xl font-bold text-gray-900 mb-4">{tipTitle} 💡</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">Hi {userName},</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">{tipContent}</Text>
      <Section className="text-center mb-6"><EmailButton href={learnMoreLink}>Read Full Guide</EmailButton></Section>
    </EmailLayout>
  );
};

export default TipOfWeek;