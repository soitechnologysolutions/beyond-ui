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
    <Tailwind config={{ theme: { extend: { colors: theme.colors } } }}>
      <Head><title>{title}</title></Head>
      {previewText && <Preview>{previewText}</Preview>}
      <Body className="bg-gray-50 dark:bg-gray-900 my-auto mx-auto font-sans px-2">
        <Container className="max-w-[600px] mx-auto bg-white dark:bg-gray-800 rounded-lg p-8 my-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <EmailHeader />
          {children}
          <EmailFooter />
        </Container>
      </Body>
    </Tailwind>
  </Html>
);