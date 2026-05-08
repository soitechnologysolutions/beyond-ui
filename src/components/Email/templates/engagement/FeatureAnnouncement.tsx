import React from 'react';
import { Text, Section, Img } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface FeatureAnnouncementProps {
  userName?: string;
  featureName?: string;
  description?: string;
  ctaLink?: string;
  imageUrl?: string;
}

export const FeatureAnnouncement: React.FC<FeatureAnnouncementProps> = ({
  userName = 'User',
  featureName = 'Dark Mode',
  description = 'You asked, we listened! Dark mode is finally here. You can now toggle dark mode from your account settings to reduce eye strain and save battery life.',
  ctaLink = 'https://example.com/dashboard/settings',
  imageUrl = 'https://via.placeholder.com/600x300'
}) => {
  return (
    <EmailLayout previewText={`Introducing ${featureName}!`} title="New Feature Announcement">
      <Img src={imageUrl} width="100%" height="auto" alt={featureName} className="rounded-lg mb-6" />
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introducing {featureName} 🎉</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName},
      </Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        {description}
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={ctaLink}>
          Try it now
        </EmailButton>
      </Section>
      <EmailDivider />
      <Text className="text-gray-500 dark:text-gray-400 text-sm">
        We're constantly working to improve our platform. Let us know what you think!
      </Text>
    </EmailLayout>
  );
};

export default FeatureAnnouncement;