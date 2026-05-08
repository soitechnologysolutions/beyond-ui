import React from 'react';
import { Text, Section, Row, Column } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface WaitlistWelcomeProps {
  userName?: string;
  position?: number;
  estimatedInviteDate?: string;
  referralLink?: string;
}

export const WaitlistWelcome: React.FC<WaitlistWelcomeProps> = ({
  userName = 'User',
  position = 1492,
  estimatedInviteDate = 'Next month',
  referralLink = 'https://example.com/waitlist?ref=user123'
}) => {
  return (
    <EmailLayout previewText="You're on the waitlist!" title="Welcome to the waitlist">
      <Text className="text-2xl font-bold text-gray-900 mb-4">You're on the list, {userName}!</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">
        Thanks for joining the waitlist. We're rolling out access in batches, and you are currently in position <strong>#{position.toLocaleString()}</strong>. We estimate your invite will arrive <strong>{estimatedInviteDate}</strong>.
      </Text>
      <EmailDivider />
      <Text className="text-lg font-bold text-gray-900 mb-2">Want to skip the line?</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">
        Share your unique referral link with friends. For every friend who joins the waitlist, you'll jump 100 spots ahead!
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={referralLink}>Copy Referral Link</EmailButton>
      </Section>
    </EmailLayout>
  );
};