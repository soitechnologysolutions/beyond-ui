import React, { useEffect, useState } from 'react';
import { render } from '@react-email/render';

export interface EmailPreviewerProps {
  component: React.ReactElement;
}

export const EmailPreviewer: React.FC<EmailPreviewerProps> = ({ component }) => {
  const [html, setHtml] = useState<string>('');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    const generateHtml = async () => {
      try {
        const result = await render(component);
        setHtml(result);
      } catch (error) {
        console.error('Error rendering email:', error);
        setHtml('<div style="color:red; padding: 20px;">Error rendering email template.</div>');
      }
    };
    
    generateHtml();
  }, [component]);

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden flex flex-col bg-gray-50 dark:bg-gray-900 w-full">
      {/* Toolbar */}
      <div className="border-b border-gray-200 dark:border-gray-800 p-3 flex justify-center gap-4 bg-white dark:bg-gray-950">
        <button 
          onClick={() => setViewMode('desktop')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'desktop' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}
        >
          Desktop
        </button>
        <button 
          onClick={() => setViewMode('mobile')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'mobile' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}
        >
          Mobile
        </button>
      </div>
      {/* Canvas */}
      <div className={`mx-auto transition-all duration-300 ease-in-out w-full ${viewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-full'}`}>
        <iframe
          srcDoc={html}
          className="w-full h-[600px] bg-white border-x border-gray-200 dark:border-gray-800 shadow-sm"
          title="Email Preview"
        />
      </div>
    </div>
  );
};