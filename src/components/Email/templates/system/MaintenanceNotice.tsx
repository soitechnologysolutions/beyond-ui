import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface MaintenanceNoticeProps {
  userName?: string;
  maintenanceStart?: string;
  maintenanceEnd?: string;
  statusPageLink?: string;
}

export const MaintenanceNotice: React.FC<MaintenanceNoticeProps> = ({
  userName = 'User',
  maintenanceStart = 'Saturday, May 16, 02:00 AM UTC',
  maintenanceEnd = 'Saturday, May 16, 04:00 AM UTC',
  statusPageLink = 'https://status.example.com'
}) => {
  return (
    <EmailLayout previewText="Scheduled Maintenance Notice" title="Scheduled Maintenance">
      <Text className="text-2xl font-bold text-gray-900 mb-4">Scheduled Maintenance Notice</Text>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">
        Hi {userName}, we will be performing scheduled maintenance to upgrade our infrastructure and improve performance.
      </Text>
      <Section className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
        <Text className="text-gray-700 m-0 mb-2"><strong>Start Time:</strong> {maintenanceStart}</Text>
        <Text className="text-gray-700 m-0"><strong>End Time:</strong> {maintenanceEnd}</Text>
      </Section>
      <Text className="text-gray-700 text-base leading-relaxed mb-6">
        During this window, the platform may be temporarily unavailable. We apologize for any inconvenience.
      </Text>
      <Section className="text-center mb-6">
        <EmailButton href={statusPageLink}>
          Check Status Page
        </EmailButton>
      </Section>
    </EmailLayout>
  );
};

export default MaintenanceNotice;