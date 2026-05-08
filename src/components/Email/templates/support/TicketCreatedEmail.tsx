import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface TicketCreatedEmailProps {
  userName?: string;
  ticketId?: string;
  subject?: string;
  portalLink?: string;
}

export const TicketCreatedEmail: React.FC<TicketCreatedEmailProps> = ({
  userName = 'User',
  ticketId = '#12345',
  subject = 'Issue with login',
  portalLink = 'https://example.com/support/12345'
}) => {
  return (
    <EmailLayout previewText={`Ticket Received: ${ticketId}`} title="Ticket Created">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">We've received your request</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, thanks for reaching out. We have created a support ticket for your request ({ticketId}). Our team will get back to you as soon as possible.
      </Text>
      <Section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="font-semibold text-gray-900 dark:text-white m-0">Subject:</Text>
        <Text className="text-gray-700 dark:text-gray-300 m-0 mt-1">{subject}</Text>
      </Section>
      <Section className="text-center mb-6">
        <EmailButton href={portalLink}>
          View Ticket Status
        </EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default TicketCreatedEmail;