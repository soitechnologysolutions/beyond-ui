import React from 'react';
import { Text, Section, Link } from '@react-email/components';

export interface EmailFooterProps {
  companyName?: string;
  supportEmail?: string;
  unsubscribeUrl?: string;
}

export const EmailFooter: React.FC<EmailFooterProps> = ({
  companyName = 'Beyond Corp',
  supportEmail,
  unsubscribeUrl,
}) => (
  <Section className="mt-8 text-center border-t border-gray-100 dark:border-gray-700 pt-6">
    <Text className="text-gray-400 dark:text-gray-500 text-xs m-0">
      © {new Date().getFullYear()} {companyName}. All rights reserved.
    </Text>
    {supportEmail && (
      <Text className="text-gray-400 dark:text-gray-500 text-xs mt-1">
        Need help? Contact our support team at <Link href={`mailto:${supportEmail}`} className="text-purple-600 dark:text-purple-400 underline">{supportEmail}</Link>
      </Text>
    )}
    {unsubscribeUrl && (
      <Text className="text-gray-400 dark:text-gray-500 text-xs mt-2">
        If you no longer wish to receive these emails, you can <Link href={unsubscribeUrl} className="text-gray-500 dark:text-gray-400 underline">unsubscribe</Link>.
      </Text>
    )}
  </Section>
);

export default EmailFooter;
