import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface ClientReferenceRequestProps {
  clientName?: string;
  senderName?: string;
  reviewLink?: string;
}

export const ClientReferenceRequest: React.FC<ClientReferenceRequestProps> = ({
  clientName = 'Alex',
  senderName = 'Jordan',
  reviewLink = 'https://g2.com/example/review'
}) => {
  return (
    <EmailLayout previewText="Would you mind sharing your experience?" title="Review Request">
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">Hi {clientName},</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        I hope you're having a great week! I'm reaching out because you've been one of our most successful clients, and we truly value our partnership.
      </Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Would you be open to writing a quick review of your experience working with us? It only takes a couple of minutes and helps us immensely.
      </Text>
      <Section className="mb-6"><EmailButton href={reviewLink}>Leave a Review</EmailButton></Section>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">Thanks so much for your support!<br />{senderName}</Text>
    </EmailLayout>
  );
};

export default ClientReferenceRequest;