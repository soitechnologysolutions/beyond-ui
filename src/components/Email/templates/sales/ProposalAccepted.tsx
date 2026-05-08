import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface ProposalAcceptedProps {
  clientName?: string;
  projectName?: string;
  repName?: string;
  nextStepsLink?: string;
}

export const ProposalAccepted: React.FC<ProposalAcceptedProps> = ({
  clientName = 'Alex',
  projectName = 'Q4 Enterprise Engagement',
  repName = 'Jordan',
  nextStepsLink = 'https://example.com/onboarding/start'
}) => {
  return (
    <EmailLayout previewText="It's official! Let's get started." title="Proposal Accepted">
      <Text className="text-3xl text-center mb-4">🎉</Text>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">It's Official!</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {clientName}, we received your signed proposal for the <strong>{projectName}</strong>. We are thrilled to officially welcome you aboard and can't wait to start working together!
      </Text>
      <Section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border border-gray-100 dark:border-gray-600 text-center">
        <Text className="text-gray-900 dark:text-white font-semibold m-0 mb-4">Ready to kick things off?</Text>
        <EmailButton href={nextStepsLink}>Start Onboarding</EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default ProposalAccepted;