import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../../components';

export interface NewHireAnnouncementProps {
  newHireName?: string;
  role?: string;
  department?: string;
  managerName?: string;
  funFact?: string;
  contactEmail?: string;
}

export const NewHireAnnouncement: React.FC<NewHireAnnouncementProps> = ({
  newHireName = 'Sarah Jenkins',
  role = 'Senior Frontend Engineer',
  department = 'Engineering',
  managerName = 'Alex',
  funFact = 'She once hiked the entire Pacific Crest Trail!',
  contactEmail = 'sarah@example.com'
}) => {
  return (
    <EmailLayout previewText={`Welcome ${newHireName} to the team! 🎉`} title={`Welcome ${newHireName}!`}>
      <Text className="text-4xl text-center mb-4">🎉</Text>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Welcome to the team, {newHireName}!</Text>
      
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6 text-center">
        Hi team, please join us in welcoming <strong>{newHireName}</strong> as our new <strong>{role}</strong> in the <strong>{department}</strong> department! {newHireName} will be reporting to {managerName}.
      </Text>

      <Section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="text-gray-900 dark:text-white font-semibold m-0 mb-2">A little about {newHireName}:</Text>
        <Text className="text-gray-700 dark:text-gray-300 m-0 italic">"{funFact}"</Text>
      </Section>

      <Section className="text-center mb-6"><EmailButton href={`mailto:${contactEmail}`}>Say Hello 👋</EmailButton></Section>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm text-center">They start today, so feel free to drop a message on Slack to welcome them aboard!</Text>
    </EmailLayout>
  );
};

export default NewHireAnnouncement;