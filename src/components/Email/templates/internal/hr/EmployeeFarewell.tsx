import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailDivider } from '../../../components';

export interface EmployeeFarewellProps {
  employeeName?: string;
  role?: string;
  lastDay?: string;
  farewellMessage?: string;
}

export const EmployeeFarewell: React.FC<EmployeeFarewellProps> = ({
  employeeName = 'Jordan Smith',
  role = 'Product Manager',
  lastDay = 'Friday, October 20th',
  farewellMessage = 'Jordan is moving on to a new adventure. We are incredibly grateful for their contributions over the past few years.'
}) => {
  return (
    <EmailLayout previewText={`Farewell to ${employeeName}`} title={`Farewell ${employeeName}`}>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Farewell, {employeeName}</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Team, we want to share that <strong>{employeeName}</strong>, our <strong>{role}</strong>, will be leaving the company. Their last day will be <strong>{lastDay}</strong>.
      </Text>
      <Section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="text-gray-700 dark:text-gray-300 m-0 italic">"{farewellMessage}"</Text>
      </Section>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm">Please take a moment to reach out and wish them the best in their next chapter!</Text>
    </EmailLayout>
  );
};

export default EmployeeFarewell;