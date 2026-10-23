import React from 'react';
import { Html, Body, Container, Tailwind, Head, Preview } from '@react-email/components';
import { EmailHeader } from './EmailHeader';
import { EmailFooter } from './EmailFooter';
import { theme } from './theme';

export interface EmailLayoutProps {
  children: React.ReactNode;
  previewText?: string;
  title?: string;
  companyName?: string;
  logoUrl?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  supportEmail?: string;
  unsubscribeUrl?: string;
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({
  children,
  previewText,
  title,
  companyName = 'Beyond Corp',
  logoUrl,
  showHeader = true,
  showFooter = true,
  supportEmail,
  unsubscribeUrl,
}) => (
  <Html>
    <Tailwind config={{ theme: { extend: { colors: theme.colors } } }}>
      <Head><title>{title}</title></Head>
      {previewText && <Preview>{previewText}</Preview>}
      <Body className="bg-gray-50 dark:bg-gray-900 my-auto mx-auto font-sans px-2">
        <Container className="max-w-[600px] mx-auto bg-white dark:bg-gray-800 rounded-lg p-8 my-8 shadow-sm border border-gray-100 dark:border-gray-700">
          {showHeader && <EmailHeader logoUrl={logoUrl} companyName={companyName} />}
          {children}
          {showFooter && (
            <EmailFooter
              companyName={companyName}
              supportEmail={supportEmail}
              unsubscribeUrl={unsubscribeUrl}
            />
          )}
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default EmailLayout;
