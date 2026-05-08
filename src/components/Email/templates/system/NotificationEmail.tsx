import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface NotificationEmailProps {
  userName?: string;
  title?: string;
  message?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const NotificationEmail: React.FC<NotificationEmailProps> = ({
  userName = 'User',
  title = 'Important Update',
  message = 'We have an important update regarding your account. Please review the details by logging into your dashboard.',
  ctaText = 'View Update',
  ctaLink = 'https://example.com/dashboard'
}) => {
  return (
    <EmailLayout previewText={title} title={title}>
      <Text className="text-2xl font-bold text-gray-900 mb-4">{title}</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">Hi {userName},</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">{message}</Text>
      {ctaLink && ctaText && (
        <Section className="text-center mb-6">
          <EmailButton href={ctaLink}>{ctaText}</EmailButton>
        </Section>
      )}
      <EmailDivider />
      <Text className="text-gray-500 text-sm">This is an automated notification from the system.</Text>
    </EmailLayout>
  );
};

export default NotificationEmail;