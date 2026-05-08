import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const ProductUpdateReengagement: React.FC<{ link?: string }> = ({ link = '#' }) => (
  <EmailLayout previewText="We built the feature you wanted!" title="Major Update">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You asked, we listened.</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
      We just rolled out a massive update that completely changes the way you can use our platform. Come back and take it for a spin!
    </Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Try the New Feature</EmailButton>
    </Section>
  </EmailLayout>
);
export default ProductUpdateReengagement;