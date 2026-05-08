import React from 'react';
import { Html, Body, Container, Tailwind, Head, Preview } from '@react-email/components';
import { EmailHeader } from './EmailHeader';
import { EmailFooter } from './EmailFooter';
import { theme } from './theme';

export const EmailLayout = ({ children, previewText, title }: { 
  children: React.ReactNode; 
  previewText?: string; 
  title?: string;
}) => (
  <Html>
    <Head><title>{title}</title></Head>
    {previewText && <Preview>{previewText}</Preview>}
    <Tailwind config={{ theme: { extend: { colors: theme.colors } } }}>
      <Body className="bg-gray-50 my-auto mx-auto font-sans px-2">
        <Container className="max-w-[600px] mx-auto bg-white rounded-lg p-8 my-8 shadow-sm border border-gray-100">
          <EmailHeader />
          {children}
          <EmailFooter />
        </Container>
      </Body>
    </Tailwind>
  </Html>
);