import React from 'react';
import { Text, Section, Link } from '@react-email/components';

export const EmailFooter = ({ companyName = 'Beyond Corp' }) => (
  <Section className="mt-8 text-center">
    <Text className="text-gray-400 text-xs">
      © {new Date().getFullYear()} {companyName}. All rights reserved.
    </Text>
    <Text className="text-gray-400 text-xs mt-2">
      If you no longer wish to receive these emails, you can <Link href="#" className="text-gray-500 underline">unsubscribe</Link>.
    </Text>
  </Section>
);