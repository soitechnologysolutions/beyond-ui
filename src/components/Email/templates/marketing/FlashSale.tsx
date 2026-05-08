import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface FlashSaleProps {
  discountAmount?: string;
  saleName?: string;
  endTime?: string;
  shopLink?: string;
}

export const FlashSale: React.FC<FlashSaleProps> = ({
  discountAmount = '40%',
  saleName = 'Summer Flash Sale',
  endTime = 'Midnight Tonight',
  shopLink = 'https://example.com/sale'
}) => {
  return (
    <EmailLayout previewText={`${discountAmount} OFF ends ${endTime}!`} title={saleName}>
      <Section className="bg-red-600 dark:bg-red-700 p-8 rounded-lg mb-6 text-center">
        <Text className="text-white font-bold tracking-widest text-xs uppercase m-0 mb-2">{saleName}</Text>
        <Text className="text-6xl font-bold text-white m-0 mb-4">{discountAmount} OFF</Text>
        <Text className="text-red-100 text-base m-0">Everything sitewide. No code needed.</Text>
      </Section>

      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6 text-center">
        Our biggest sale of the season is here, but it won't last long. Grab your favorite items before the prices go back up at <strong>{endTime}</strong>.
      </Text>

      <Section className="text-center mb-6"><EmailButton href={shopLink}>Shop The Sale Now</EmailButton></Section>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm text-center">Discount applies automatically at checkout. Excludes enterprise plans.</Text>
    </EmailLayout>
  );
};

export default FlashSale;