import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface SendProposalProps {
  clientName?: string;
  projectName?: string;
  senderName?: string;
  proposalLink?: string;
}

export const SendProposal: React.FC<SendProposalProps> = ({
  clientName = 'Alex',
  projectName = 'Q4 Enterprise Engagement',
  senderName = 'Jordan',
  proposalLink = 'https://example.com/proposals/123'
}) => {
  return (
    <EmailLayout previewText={`Your proposal for ${projectName} is ready`} title="Proposal Attached">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Proposal is Ready</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">Hi {clientName},</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        It was great speaking with you recently! I have put together a formal proposal and statement of work for the <strong>{projectName}</strong> based on our discussion.
      </Text>
      <Section className="text-center mb-6"><EmailButton href={proposalLink}>Review Proposal</EmailButton></Section>
      <EmailDivider />
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">Please take a look when you have a moment. Let me know if you have any questions or if you'd like to schedule a quick call to go over the details.</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mt-4">Best,<br />{senderName}</Text>
    </EmailLayout>
  );
};

export default SendProposal;