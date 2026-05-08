import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface TicketResolvedEmailProps {
  userName?: string;
  ticketId?: string;
  resolutionSummary?: string;
  feedbackLink?: string;
}

export const TicketResolvedEmail: React.FC<TicketResolvedEmailProps> = ({
  userName = 'User',
  ticketId = '#12345',
  resolutionSummary = 'We have successfully fixed the login issue on your account. You should now be able to access the dashboard normally.',
  feedbackLink = 'https://example.com/support/feedback/12345'
}) => {
  return (
    <EmailLayout previewText={`Ticket ${ticketId} has been resolved`} title="Ticket Resolved">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your ticket has been resolved</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, your support request ({ticketId}) has been marked as resolved by our team.
      </Text>
      <Section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="font-semibold text-gray-900 dark:text-white m-0 mb-2">Resolution Note:</Text>
        <Text className="text-gray-700 dark:text-gray-300 m-0 italic">"{resolutionSummary}"</Text>
      </Section>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        How did we do? We'd love to hear your feedback on how we handled your request.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={feedbackLink}>Leave Feedback</EmailButton>
      </Section>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm">If your issue is still not resolved, you can reply directly to this email to reopen the ticket.</Text>
    </EmailLayout>
  );
};

export default TicketResolvedEmail;