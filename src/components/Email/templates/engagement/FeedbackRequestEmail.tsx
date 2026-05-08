import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface FeedbackRequestEmailProps {
  userName?: string;
  productName?: string;
  surveyLink?: string;
}

export const FeedbackRequestEmail: React.FC<FeedbackRequestEmailProps> = ({
  userName = 'User',
  productName = 'Beyond Corp',
  surveyLink = 'https://example.com/survey/123'
}) => {
  return (
    <EmailLayout previewText={`How is your experience with ${productName}?`} title="We value your feedback">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">We'd love your feedback!</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, thanks for using {productName}. We're always trying to improve, and your feedback is incredibly valuable to us.
      </Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Do you have 2 minutes to answer a quick question about your experience so far?
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={surveyLink}>
          Take the quick survey
        </EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default FeedbackRequestEmail;