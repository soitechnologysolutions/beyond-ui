import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface TeamInviteEmailProps {
  inviterName?: string;
  teamName?: string;
  role?: string;
  inviteLink?: string;
}

export const TeamInviteEmail: React.FC<TeamInviteEmailProps> = ({
  inviterName = 'Alex',
  teamName = 'Acme Corp',
  role = 'Editor',
  inviteLink = 'https://example.com/team/invite/123'
}) => {
  return (
    <EmailLayout previewText={`You've been invited to join ${teamName}`} title="Team Invitation">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Join {teamName}</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi there, <strong>{inviterName}</strong> has invited you to join the <strong>{teamName}</strong> team as an <strong>{role}</strong>.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={inviteLink}>
          Accept Invitation
        </EmailButton>
      </Section>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm">
        If you don't recognize this invitation, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
};

export default TeamInviteEmail;