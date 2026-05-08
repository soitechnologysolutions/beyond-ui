import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export interface ExitInterviewRequestProps {
  employeeName?: string;
  hrContact?: string;
  schedulingLink?: string;
}

export const ExitInterviewRequest: React.FC<ExitInterviewRequestProps> = ({
  employeeName = 'Alex',
  hrContact = 'the HR Team',
  schedulingLink = 'https://calendly.com/hr/exit-interview'
}) => {
  return (
    <EmailLayout previewText="Please schedule your exit interview" title="Exit Interview Request">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Exit Interview Request</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {employeeName}, as your final day approaches, we'd love to sit down with you for a brief exit interview. Your candid feedback is vital for helping us improve the employee experience.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={schedulingLink}>Schedule Interview</EmailButton>
      </Section>
      <Text className="text-gray-500 dark:text-gray-400 text-sm text-center">Thank you from {hrContact}.</Text>
    </EmailLayout>
  );
};

export default ExitInterviewRequest;