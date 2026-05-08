import React from 'react';
import { Text, Section, Row, Column } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../components';

export interface SupportFeedbackRequestProps {
  userName?: string;
  ticketId?: string;
  goodFeedbackLink?: string;
  badFeedbackLink?: string;
}

export const SupportFeedbackRequest: React.FC<SupportFeedbackRequestProps> = ({
  userName = 'User',
  ticketId = '#12345',
  goodFeedbackLink = 'https://example.com/support/feedback?rating=good',
  badFeedbackLink = 'https://example.com/support/feedback?rating=bad'
}) => {
  return (
    <EmailLayout previewText={`How was your support experience for ${ticketId}?`} title="How did we do?">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How did we do?</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, your support request ({ticketId}) has been closed. We'd love to know how your experience was to help us improve our support.
      </Text>
      <Section className="mb-6">
        <Row>
          <Column className="pr-2">
            <EmailButton href={goodFeedbackLink}>👍 Great</EmailButton>
          </Column>
          <Column className="pl-2">
            <EmailButton href={badFeedbackLink}>👎 Needs Work</EmailButton>
          </Column>
        </Row>
      </Section>
    </EmailLayout>
  );
};

export default SupportFeedbackRequest;