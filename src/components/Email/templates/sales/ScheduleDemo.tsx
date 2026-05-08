import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface ScheduleDemoProps {
  prospectName?: string;
  productName?: string;
  repName?: string;
  schedulingLink?: string;
}

export const ScheduleDemo: React.FC<ScheduleDemoProps> = ({
  prospectName = 'Alex',
  productName = 'Beyond UI',
  repName = 'Jordan',
  schedulingLink = 'https://calendly.com/example/demo'
}) => {
  return (
    <EmailLayout previewText={`Schedule your customized ${productName} demo`} title="Schedule a Demo">
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">Hi {prospectName},</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
        Thanks for requesting a demo of {productName}! I'm excited to show you how our platform can fit into your workflow.
      </Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Please grab a time on my calendar below that works best for you and your team.
      </Text>
      <Section className="mb-6"><EmailButton href={schedulingLink}>Choose a time</EmailButton></Section>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">Talk soon,<br />{repName}</Text>
    </EmailLayout>
  );
};

export default ScheduleDemo;