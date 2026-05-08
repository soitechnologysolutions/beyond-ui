import { render } from '@react-email/render';
import React from 'react';

/**
 * Renders a React Email component into both HTML and Plain Text strings.
 * This is crucial for avoiding spam filters and ensuring deliverability
 * through corporate firewalls that block HTML emails.
 * 
 * @example
 * const { html, text } = await renderEmailParams(<WelcomeEmail userName="Alex" />);
 * await resend.emails.send({ ... html, text });
 */
export const renderEmailParams = async (
  component: React.ReactElement
): Promise<{ html: string; text: string }> => {
  const [html, text] = await Promise.all([
    // Render standard HTML with inline CSS
    render(component),
    // Render semantic Plain Text fallback
    render(component, { plainText: true }),
  ]);

  return { html, text };
};