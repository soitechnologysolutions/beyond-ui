import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const VIPInvite: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="You're invited to an exclusive gathering" title="VIP Invitation">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You're Invited</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      As one of our most valued members, we'd like to formally invite you to an exclusive, invite-only VIP gathering. 
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>RSVP Now</EmailButton>
    </Section>
  </EmailLayout>
);
export default VIPInvite;