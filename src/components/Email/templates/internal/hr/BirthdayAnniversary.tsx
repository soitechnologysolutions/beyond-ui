import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../../../components';

export interface BirthdayAnniversaryProps {
  employeeName?: string;
  type?: 'Birthday' | 'Work Anniversary';
  years?: number;
}

export const BirthdayAnniversary: React.FC<BirthdayAnniversaryProps> = ({
  employeeName = 'Alex',
  type = 'Work Anniversary',
  years = 3
}) => {
  const isBirthday = type === 'Birthday';
  return (
    <EmailLayout previewText={`Happy ${type}, ${employeeName}!`} title={`Happy ${type}!`}>
      <Text className="text-4xl text-center mb-4">{isBirthday ? '🎂' : '🏆'}</Text>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Happy {type}, {employeeName}!
      </Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6 text-center">
        {isBirthday 
          ? 'Wishing you a fantastic birthday and a great year ahead! We hope you take some time to celebrate and enjoy your special day.' 
          : `Thank you for being an amazing part of our team for ${years} ${years === 1 ? 'year' : 'years'}! We deeply appreciate your hard work and dedication.`}
      </Text>
    </EmailLayout>
  );
};

export default BirthdayAnniversary;