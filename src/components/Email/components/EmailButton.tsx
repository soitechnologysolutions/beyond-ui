import React from 'react';
import { Button } from '@react-email/components';

export interface EmailButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'purple';
  className?: string;
}

export const EmailButton: React.FC<EmailButtonProps> = ({
  children,
  href,
  variant = 'primary',
  className = '',
}) => {
  let colorClasses = 'bg-blue-600 text-white';
  if (variant === 'purple') {
    colorClasses = 'bg-purple-600 text-white';
  } else if (variant === 'secondary') {
    colorClasses = 'bg-gray-100 text-gray-800 border border-gray-300';
  }

  return (
    <Button 
      href={href}
      className={`${colorClasses} rounded-md text-[15px] font-semibold no-underline text-center px-6 py-3 inline-block ${className}`}
    >
      {children}
    </Button>
  );
};

export default EmailButton;
