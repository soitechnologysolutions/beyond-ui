import React from 'react';
import { Text, Section, Row, Column, Img } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../../components';

export interface EmailCartItem {
  name: string;
  price: string;
  image: string;
}

export interface AbandonedCartProps {
  userName?: string;
  cartItems?: EmailCartItem[];
  totalValue?: string;
  checkoutLink?: string;
  discountCode?: string;
}

export const AbandonedCart: React.FC<AbandonedCartProps> = ({
  userName = 'Alex',
  cartItems = [
    { name: 'Premium UI Kit License', price: '$49.00', image: 'https://via.placeholder.com/100' },
    { name: '1 Year Updates & Support', price: '$29.00', image: 'https://via.placeholder.com/100' }
  ],
  totalValue = '$78.00',
  checkoutLink = 'https://example.com/checkout/recover/123',
  discountCode = 'COMEBACK10'
}) => {
  return (
    <EmailLayout previewText="You left something behind..." title="Complete Your Purchase">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Did you forget something?</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, we noticed you left some great items in your cart. They are selling out fast, but we've saved them for you for a little while longer!
      </Text>

      <Section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        {cartItems.map((item, index) => (
          <Row key={index} className="mb-4">
            <Column style={{ width: '60px' }}>
              <Img src={item.image} width="50" height="50" alt={item.name} className="rounded-md border border-gray-200 dark:border-gray-600" />
            </Column>
            <Column>
              <Text className="text-gray-900 dark:text-white font-semibold m-0">{item.name}</Text>
              <Text className="text-gray-500 dark:text-gray-400 text-sm m-0">{item.price}</Text>
            </Column>
          </Row>
        ))}
        <EmailDivider />
        <Text className="text-gray-900 dark:text-white font-bold text-right m-0">Total: {totalValue}</Text>
      </Section>

      <Section className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-6 text-center border border-blue-100 dark:border-blue-800">
        <Text className="text-blue-800 dark:text-blue-200 font-semibold m-0 mb-2">Ready to checkout? Use this code for 10% off:</Text>
        <Text className="text-2xl font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 m-0">{discountCode}</Text>
      </Section>

      <Section className="text-center mb-6">
        <EmailButton href={checkoutLink}>Complete Purchase</EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default AbandonedCart;
