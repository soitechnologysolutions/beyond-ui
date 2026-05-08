import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface ReferralRewardProps {
  userName?: string;
  rewardType?: string;
  rewardValue?: string;
  referralCount?: number;
  redeemLink?: string;
}

export const ReferralReward: React.FC<ReferralRewardProps> = ({
  userName = 'User',
  rewardType = 'Account Credit',
  rewardValue = '$25',
  referralCount = 1,
  redeemLink = 'https://example.com/rewards'
}) => {
  return (
    <EmailLayout previewText={`You earned a ${rewardValue} reward!`} title="Referral Reward Earned">
      <Text className="text-3xl text-center mb-2">🎁</Text>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">You earned a reward!</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6 text-center">
        Hi {userName}, thanks for spreading the word! A friend you referred just joined, and to say thanks, we've added a reward to your account.
      </Text>
      <Section className="bg-green-50 dark:bg-green-900 border border-green-100 dark:border-green-800 p-6 rounded-lg mb-6 text-center">
        <Text className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider text-xs m-0 mb-2">{rewardType}</Text>
        <Text className="text-4xl font-bold text-green-600 dark:text-green-400 m-0">{rewardValue}</Text>
      </Section>
      <Section className="text-center mb-6"><EmailButton href={redeemLink}>Redeem Reward</EmailButton></Section>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm text-center">You've successfully referred {referralCount} friends so far. Keep sharing your link to earn more!</Text>
    </EmailLayout>
  );
};

export default ReferralReward;