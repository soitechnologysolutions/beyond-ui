import React from 'react';
import { Img, Section } from '@react-email/components';

export const EmailHeader = ({ logoUrl = 'https://via.placeholder.com/150x50', companyName = 'Beyond Corp' }) => (
  <Section className="mt-8 mb-8">
    <Img src={logoUrl} width="150" height="50" alt={companyName} className="mx-auto" />
  </Section>
);