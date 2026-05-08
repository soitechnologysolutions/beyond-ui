import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../../components';

export interface DripCampaignDay1Props {
  userName?: string;
  courseName?: string;
  lessonTitle?: string;
  lessonContent?: string;
  actionItem?: string;
  courseLink?: string;
}

export const DripCampaignDay1: React.FC<DripCampaignDay1Props> = ({
  userName = 'Alex',
  courseName = '5 Days to Better UI Design',
  lessonTitle = 'Day 1: Mastering Whitespace',
  lessonContent = 'Whitespace (or negative space) is the empty space between and around elements of a design or page layout. It is often overlooked, but it is one of the most powerful tools in your design arsenal.',
  actionItem = 'Take a look at your current project. Can you identify an area where adding 16px to 32px of margin drastically improves readability?',
  courseLink = 'https://example.com/course/day-1'
}) => {
  return (
    <EmailLayout previewText={`${courseName} - ${lessonTitle}`} title={lessonTitle}>
      <Text className="text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">{courseName}</Text>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{lessonTitle}</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">Hi {userName},</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">{lessonContent}</Text>
      
      <Section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="text-gray-900 dark:text-white font-bold m-0 mb-2">Today's Action Item 🎯</Text>
        <Text className="text-gray-700 dark:text-gray-300 m-0">{actionItem}</Text>
      </Section>

      <Section className="text-center mb-6">
        <EmailButton href={courseLink}>Read the Full Lesson</EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default DripCampaignDay1;
