import React from 'react';
import { Text, Section, Row, Column, Link } from '@react-email/components';
import { EmailLayout, EmailDivider } from '../../../components';

export interface ExitSurveyProps {
  userName?: string;
  feedbackLinkBase?: string;
}

export const ExitSurvey: React.FC<ExitSurveyProps> = ({
  userName = 'User',
  feedbackLinkBase = 'https://example.com/survey/exit?reason='
}) => {
  const reasons = [
    { id: 'too-expensive', label: 'It is too expensive' },
    { id: 'too-complex', label: 'It was too hard to use' },
    { id: 'missing-features', label: 'It is missing features I need' },
    { id: 'switched-product', label: 'I am switching to another product' },
    { id: 'other', label: 'Other reason' }
  ];

  return (
    <EmailLayout previewText="We're sorry to see you go! Can you tell us why?" title="Exit Survey">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">We're sorry to see you go!</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, your subscription has been cancelled. As a growing company, your feedback is the absolute best way for us to improve. Could you click the option below that best describes why you are leaving?
      </Text>

      <Section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        {reasons.map((reason) => (
          <Link key={reason.id} href={`${feedbackLinkBase}${reason.id}`} className="block w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-md p-3 mb-2 text-center text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700" style={{ textDecoration: 'none' }}>
            {reason.label}
          </Link>
        ))}
      </Section>
    </EmailLayout>
  );
};

export default ExitSurvey;
