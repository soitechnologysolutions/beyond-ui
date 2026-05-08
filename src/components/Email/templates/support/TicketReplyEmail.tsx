import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface TicketReplyEmailProps {
  userName?: string;
  ticketId?: string;
  replyPreview?: string;
  portalLink?: string;
}

export const TicketReplyEmail: React.FC<TicketReplyEmailProps> = ({
  userName = 'User',
  ticketId = '#12345',
  replyPreview = "Hello! I've taken a look at your account and I believe I found the issue. We've applied a fix on our end...",
  portalLink = 'https://example.com/support/12345'
}) => {
  return (
    <EmailLayout previewText={`New reply on ticket ${ticketId}`} title="New Ticket Reply">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Update on your request</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, a support agent has replied to your ticket (<strong>{ticketId}</strong>).
      </Text>
      <Section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border-l-4 border-blue-500 dark:border-blue-400">
        <Text className="text-gray-700 dark:text-gray-300 m-0 italic">"{replyPreview}"</Text>
      </Section>
      <Section className="text-center mb-6"><EmailButton href={portalLink}>View Full Reply</EmailButton></Section>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm">You can also reply directly to this email to update your ticket.</Text>
    </EmailLayout>
  );
};

export default TicketReplyEmail;