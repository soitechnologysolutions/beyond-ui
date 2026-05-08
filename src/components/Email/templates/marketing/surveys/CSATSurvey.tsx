import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const CSATSurvey: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="How was your recent support experience?" title="CSAT Survey">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Rate Your Experience</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      Your support ticket was recently closed. Could you take 10 seconds to let us know how our agent handled your request?
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Leave Feedback</EmailButton>
    </Section>
  </EmailLayout>
);
export default CSATSurvey;
