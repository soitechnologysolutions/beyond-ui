import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailDivider } from '../../components';

export interface ProjectTerminationProps {
  clientName?: string;
  projectName?: string;
  effectiveDate?: string;
  senderName?: string;
}

export const ProjectTermination: React.FC<ProjectTerminationProps> = ({
  clientName = 'Alex',
  projectName = 'Monthly Retainer',
  effectiveDate = 'December 31st',
  senderName = 'Jordan'
}) => {
  return (
    <EmailLayout previewText={`Notice regarding ${projectName}`} title="Project Termination">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contract Notice</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">Hi {clientName},</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        I am writing to formally confirm that we will be concluding our work on the <strong>{projectName}</strong>. As per our recent discussion, our final day of service will be <strong>{effectiveDate}</strong>.
      </Text>
      <Section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="text-gray-700 dark:text-gray-300 m-0">We will ensure all final deliverables and documentation are securely handed over prior to this date. Final invoicing will be prorated accordingly.</Text>
      </Section>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mt-4">Thank you for the opportunity to work together. Best,<br />{senderName}</Text>
    </EmailLayout>
  );
};

export default ProjectTermination;