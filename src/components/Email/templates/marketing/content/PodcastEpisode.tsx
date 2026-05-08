import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const PodcastEpisode: React.FC<{ episodeTitle?: string; link?: string }> = ({ 
  episodeTitle = 'Ep 42: Scaling React Teams', 
  link = '#' 
}) => (
  <EmailLayout previewText={`New Episode: ${episodeTitle}`} title="New Podcast Episode">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">New Episode Live! 🎧</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">A brand new episode of our podcast is out: <strong>{episodeTitle}</strong>. Tune in wherever you get your podcasts.</Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Listen Now</EmailButton>
    </Section>
  </EmailLayout>
);
export default PodcastEpisode;
