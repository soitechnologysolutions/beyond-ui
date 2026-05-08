import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface ReferralConvertedProps {
  userName?: string;
  friendName?: string;
  rewardAmount?: string;
  dashboardLink?: string;
}

export const ReferralConverted: React.FC<ReferralConvertedProps> = ({
  userName = 'User',
  friendName = 'Alex',
  rewardAmount = '$15 Credit',
  dashboardLink = 'https://example.com/rewards'
}) => {
  return (
    <EmailLayout previewText={`Your friend ${friendName} just signed up!`} title="Successful Referral">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your friend joined!</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Great news, {userName}! <strong>{friendName}</strong> just used your referral link to sign up and start their subscription.
      </Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">As a thank you, we have added <strong>{rewardAmount}</strong> to your account balance.</Text>
      <Section className="text-center mb-6"><EmailButton href={dashboardLink}>View Your Rewards</EmailButton></Section>
    </EmailLayout>
  );
};

export default ReferralConverted;