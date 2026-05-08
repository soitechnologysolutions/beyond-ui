import React from 'react';
import { Text, Section, Link, Row, Column } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export interface MonthlyDigestProps {
  userName?: string;
  monthName?: string;
  topStories?: { title: string; link: string }[];
  stats?: { label: string; value: string | number }[];
  dashboardLink?: string;
}

export const MonthlyDigest: React.FC<MonthlyDigestProps> = ({
  userName = 'Alex',
  monthName = 'October',
  topStories = [
    { title: 'The Future of AI in SaaS', link: 'https://example.com/blog/ai' },
    { title: '10 Tips to Boost Productivity', link: 'https://example.com/blog/productivity' }
  ],
  stats = [
    { label: 'Hours Saved', value: 12 },
    { label: 'Tasks Completed', value: 45 }
  ],
  dashboardLink = 'https://example.com/dashboard'
}) => {
  return (
    <EmailLayout previewText={`Your ${monthName} recap is here!`} title={`${monthName} Digest`}>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your {monthName} Recap</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, {monthName} was a busy month! Here is a quick look at what you accomplished and what you might have missed.
      </Text>

      <Section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="text-gray-900 dark:text-white font-bold mb-4 m-0">Your Impact</Text>
        {stats.map((stat, index) => (
          <Row key={index} className="mb-2">
            <Column><Text className="text-gray-600 dark:text-gray-300 m-0">{stat.label}</Text></Column>
            <Column className="text-right"><Text className="text-blue-600 dark:text-blue-400 font-bold m-0">{stat.value}</Text></Column>
          </Row>
        ))}
      </Section>

      <Section className="mb-6">
        <Text className="text-gray-900 dark:text-white font-bold mb-4 m-0">Top Stories</Text>
        {topStories.map((story, index) => (
          <Text key={index} className="m-0 mb-2">
            <Link href={story.link} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              {story.title}
            </Link>
          </Text>
        ))}
      </Section>

      <Section className="text-center mb-6">
        <EmailButton href={dashboardLink}>View Your Dashboard</EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default MonthlyDigest;
