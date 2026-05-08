import React from 'react';
import { Text, Section, Row, Column } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export interface MeetingRecapProps {
  meetingTitle?: string;
  date?: string;
  summary?: string;
  actionItems?: string[];
  notesLink?: string;
}

export const MeetingRecap: React.FC<MeetingRecapProps> = ({
  meetingTitle = 'Weekly Engineering Sync',
  date = 'May 8, 2026',
  summary = 'We discussed the upcoming deployment schedule and identified potential bottlenecks in the CI/CD pipeline.',
  actionItems = [
    'Alex: Review the staging server logs',
    'Jordan: Draft the deployment runbook',
    'Sam: Update the frontend dependencies'
  ],
  notesLink = 'https://docs.example.com/meetings/123'
}) => {
  return (
    <EmailLayout previewText={`Notes from ${meetingTitle}`} title="Meeting Recap">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{meetingTitle}</Text>
      <Text className="text-gray-500 dark:text-gray-400 text-sm mb-6">{date}</Text>
      
      <Section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="text-gray-900 dark:text-white font-semibold m-0 mb-2">Summary:</Text>
        <Text className="text-gray-700 dark:text-gray-300 m-0">{summary}</Text>
      </Section>

      <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">Action Items</Text>
      <Section className="mb-6">
        {actionItems.map((item, index) => (
          <Row key={index} className="mb-2">
            <Column style={{ width: '24px' }}><Text className="m-0 text-gray-400">☐</Text></Column>
            <Column><Text className="m-0 text-gray-700 dark:text-gray-300">{item}</Text></Column>
          </Row>
        ))}
      </Section>
      <Section className="text-center"><EmailButton href={notesLink}>View Full Notes</EmailButton></Section>
    </EmailLayout>
  );
};

export default MeetingRecap;