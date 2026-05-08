import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const ToolTemplateDelivery: React.FC<{ toolName?: string; link?: string }> = ({ 
  toolName = 'UI Component Checklist', 
  link = '#' 
}) => (
  <EmailLayout previewText={`Access your free tool: ${toolName}`} title="Your Free Tool">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Here is your free template!</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">As promised, you can now access the <strong>{toolName}</strong>. We hope it saves you time and accelerates your workflow.</Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Access Template</EmailButton>
    </Section>
  </EmailLayout>
);
export default ToolTemplateDelivery;
