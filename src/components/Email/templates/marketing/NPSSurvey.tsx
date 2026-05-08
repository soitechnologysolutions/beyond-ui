import React from 'react';
import { Text, Section, Row, Column, Link } from '@react-email/components';
import { EmailLayout, EmailDivider } from '../../components';

export interface NPSSurveyProps {
  userName?: string;
  surveyLinkBase?: string;
}

export const NPSSurvey: React.FC<NPSSurveyProps> = ({
  userName = 'Alex',
  surveyLinkBase = 'https://example.com/survey/nps?score='
}) => {
  const scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <EmailLayout previewText="How likely are you to recommend us?" title="How are we doing?">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How are we doing?</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, we are always looking for ways to improve our platform. Based on your recent experience, how likely are you to recommend us to a friend or colleague?
      </Text>

      <Section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
          0 = Not likely at all, 10 = Extremely likely
        </Text>
        <Row className="text-center">
          {scores.map((score) => (
            <Column key={score} className="px-0.5">
              <Link href={`${surveyLinkBase}${score}`} className="inline-block w-full py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/50" style={{ textDecoration: 'none' }}>
                {score}
              </Link>
            </Column>
          ))}
        </Row>
      </Section>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm text-center">It only takes a click, and your feedback means the world to us!</Text>
    </EmailLayout>
  );
};

export default NPSSurvey;