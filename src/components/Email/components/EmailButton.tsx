import React from 'react';
import { Button } from '@react-email/components';

export const EmailButton = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <Button 
    href={href}
    className="bg-blue-600 rounded text-white text-[15px] font-semibold no-underline text-center px-6 py-3 inline-block"
  >
    {children}
  </Button>
);