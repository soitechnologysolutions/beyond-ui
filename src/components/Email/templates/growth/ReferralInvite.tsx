import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface ReferralInviteProps {
  referrerName?: string;
  rewardAmount?: string;
  referralLink?: string;
}

export const ReferralInvite: React.FC<ReferralInviteProps> = ({
  referrerName = 'Alex',
  rewardAmount = '$10',
  referralLink = 'https://example.com/signup?ref=alex123'
}) => {
  return (
    <EmailLayout previewText={`${referrerName} invited you!`} title="You've been invited">
      <Text className="text-2xl font-bold text-gray-900 mb-4">You've been invited by {referrerName}</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">
        Hi there, {referrerName} thinks you'd love our platform! Sign up using their invite link and you'll both get {rewardAmount} in credit to use on your first purchase.
      </Text>
      <Section className="bg-blue-50 border border-blue-100 p-6 rounded-lg mb-6 text-center">
        <Text className="text-blue-600 font-bold text-lg m-0 mb-4">Claim your {rewardAmount} credit</Text>
        <EmailButton href={referralLink}>
          Accept Invite
        </EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default ReferralInvite;