import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface DPANoticeProps {
  userName?: string;
  companyName?: string;
  effectiveDate?: string;
  dpaLink?: string;
}

export const DPANotice: React.FC<DPANoticeProps> = ({
  userName = 'User',
  companyName = 'Beyond Corp',
  effectiveDate = 'July 1, 2026',
  dpaLink = 'https://example.com/legal/dpa'
}) => {
  return (
    <EmailLayout previewText={`Updated Data Processing Agreement for ${companyName}`} title="Legal Notice: DPA Update">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Processing Agreement Update</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, to ensure compliance with recent global data privacy regulations, we have updated our Data Processing Agreement (DPA).
      </Text>
      <Section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
          These updates strengthen our commitment to your data security and clearly outline our sub-processors and data handling protocols. The new terms will automatically take effect on <strong>{effectiveDate}</strong>.
        </Text>
      </Section>
      <Section className="text-center mb-6"><EmailButton href={dpaLink}>Review the Updated DPA</EmailButton></Section>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm">If you have any questions regarding these changes, please reply to this email or contact our legal team.</Text>
    </EmailLayout>
  );
};

export default DPANotice;