import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const YouTubeNotification: React.FC<{ videoTitle?: string; link?: string }> = ({ 
  videoTitle = 'Building a Component Library in 10 Minutes', 
  link = '#' 
}) => (
  <EmailLayout previewText={`Watch: ${videoTitle}`} title="New Video Upload">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">New Video Uploaded 📺</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">We just uploaded a new tutorial to our channel: <strong>{videoTitle}</strong>.</Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Watch on YouTube</EmailButton>
    </Section>
  </EmailLayout>
);
export default YouTubeNotification;
