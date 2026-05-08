import React from 'react';
import { Text, Section, Row, Column } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface WeeklyDigestProps {
  userName?: string;
  stats?: Array<{ label: string; value: string | number }>;
  dashboardLink?: string;
}

export const WeeklyDigest: React.FC<WeeklyDigestProps> = ({
  userName = 'User',
  stats = [
    { label: 'Tasks Completed', value: 42 },
    { label: 'Hours Saved', value: '5.2h' },
    { label: 'New Connections', value: 12 }
  ],
  dashboardLink = 'https://example.com/dashboard'
}) => {
  return (
    <EmailLayout previewText="Your weekly activity summary" title="Weekly Activity Digest">
      <Text className="text-2xl font-bold text-gray-900 mb-4">Your Weekly Summary</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">
        Hi {userName}, here's a quick look at your activity and achievements from the past week.
      </Text>
      
      <Section className="mb-6">
        {stats.map((stat, index) => (
          <Row key={index} className="bg-gray-50 p-4 mb-2 rounded-lg border border-gray-100">
            <Column>
              <Text className="text-gray-600 m-0 font-medium">{stat.label}</Text>
            </Column>
            <Column className="text-right">
              <Text className="text-blue-600 font-bold m-0 text-xl">{stat.value}</Text>
            </Column>
          </Row>
        ))}
      </Section>

      <Section className="text-center mb-6">
        <EmailButton href={dashboardLink}>View Full Report</EmailButton>
      </Section>
      <EmailDivider />
    </EmailLayout>
  );
};

export default WeeklyDigest;