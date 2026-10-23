import React from 'react';
import { Img, Section, Text } from '@react-email/components';

export interface EmailHeaderProps {
  logoUrl?: string;
  companyName?: string;
}

export const EmailHeader: React.FC<EmailHeaderProps> = ({
  logoUrl,
  companyName = 'Beyond Corp'
}) => (
  <Section className="mt-4 mb-6 text-center">
    {logoUrl && !logoUrl.includes('placeholder') ? (
      <Img src={logoUrl} width="160" height="48" alt={companyName} className="mx-auto max-h-[48px] object-contain" />
    ) : (
      <Text className="text-xl font-bold tracking-tight text-purple-700 dark:text-purple-400 m-0 inline-block px-4 py-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800">
        {companyName}
      </Text>
    )}
  </Section>
);

export default EmailHeader;
