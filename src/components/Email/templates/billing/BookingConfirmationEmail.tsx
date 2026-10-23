import React from 'react';
import { Text, Section, Row, Column } from '@react-email/components';
import { EmailLayout, EmailButton, EmailDivider } from '../../components';

export interface BookingConfirmationEmailProps {
  customerName?: string;
  serviceName?: string;
  date?: string;
  time?: string;
  price?: string;
  specialistName?: string;
  tenantName?: string;
  locationUrl?: string;
  notes?: string;
  companyName?: string;
}

export const BookingConfirmationEmail: React.FC<BookingConfirmationEmailProps> = ({
  customerName = 'Valued Guest',
  serviceName = 'Swedish Massage & Aromatherapy',
  date = 'Friday, October 24, 2026',
  time = '10:00 AM',
  price = 'Ksh 3,500',
  specialistName,
  tenantName = 'Zenora Wellness',
  locationUrl = 'https://spa.samaritansystem.com',
  notes,
  companyName = 'Zenora',
}) => {
  return (
    <EmailLayout 
      previewText={`Your appointment for ${serviceName} on ${date} is confirmed!`}
      title="Booking Confirmation"
      companyName={tenantName || companyName}
    >
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Appointment Confirmed!
      </Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hello {customerName}, we are excited to welcome you to {tenantName || companyName}. Your appointment details are outlined below.
      </Text>

      <Section className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 font-bold m-0 mb-3">
          Service Details
        </Text>
        <Text className="text-xl font-bold text-gray-900 dark:text-white m-0 mb-4">
          {serviceName}
        </Text>

        <Row className="mb-2">
          <Column><Text className="text-gray-500 dark:text-gray-400 m-0 text-sm">Date</Text></Column>
          <Column className="text-right"><Text className="text-gray-900 dark:text-white font-medium m-0 text-sm">{date}</Text></Column>
        </Row>
        <Row className="mb-2">
          <Column><Text className="text-gray-500 dark:text-gray-400 m-0 text-sm">Time</Text></Column>
          <Column className="text-right"><Text className="text-gray-900 dark:text-white font-medium m-0 text-sm">{time}</Text></Column>
        </Row>
        {specialistName && (
          <Row className="mb-2">
            <Column><Text className="text-gray-500 dark:text-gray-400 m-0 text-sm">Specialist</Text></Column>
            <Column className="text-right"><Text className="text-gray-900 dark:text-white font-medium m-0 text-sm">{specialistName}</Text></Column>
          </Row>
        )}
        {price && (
          <Row className="mb-2">
            <Column><Text className="text-gray-500 dark:text-gray-400 m-0 text-sm">Price</Text></Column>
            <Column className="text-right"><Text className="text-gray-900 dark:text-white font-bold m-0 text-sm">{price}</Text></Column>
          </Row>
        )}
      </Section>

      {notes && (
        <Section className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg mb-6 border border-amber-200 dark:border-amber-800">
          <Text className="text-amber-800 dark:text-amber-300 text-sm m-0">
            <strong>Important note:</strong> {notes}
          </Text>
        </Section>
      )}

      <Section className="text-center mb-6">
        <EmailButton href={locationUrl} variant="purple">
          View Location & Details
        </EmailButton>
      </Section>

      <EmailDivider />

      <Text className="text-gray-500 dark:text-gray-400 text-xs text-center mt-4">
        Need to reschedule or cancel? Please let us know at least 2 hours in advance.
      </Text>
    </EmailLayout>
  );
};

export default BookingConfirmationEmail;
