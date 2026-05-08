import React, { useState } from 'react';
import { EmailPreviewer } from './components';
import { 
  WeeklyNewsletter, 
  AbandonedCart, 
  NPSSurvey, 
  PaymentReceipt, 
  ITOutageReport 
} from './templates';

export const EmailShowcase = () => {
  const [activeTemplate, setActiveTemplate] = useState('newsletter');

  const templates: Record<string, React.ReactElement> = {
    newsletter: <WeeklyNewsletter />,
    abandoned_cart: <AbandonedCart />,
    nps_survey: <NPSSurvey />,
    receipt: <PaymentReceipt />,
    it_outage: <ITOutageReport />
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <label className="font-medium text-gray-700 dark:text-gray-300">Select Template:</label>
        <select 
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white min-w-[200px] focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={activeTemplate}
          onChange={(e) => setActiveTemplate(e.target.value)}
        >
          <option value="newsletter">Weekly Newsletter</option>
          <option value="abandoned_cart">Abandoned Cart (Marketing)</option>
          <option value="nps_survey">NPS Survey (Feedback)</option>
          <option value="receipt">Payment Receipt (Billing)</option>
          <option value="it_outage">IT Outage Report (Internal)</option>
        </select>
      </div>

      <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        <EmailPreviewer component={templates[activeTemplate] || <WeeklyNewsletter />} />
      </div>
    </div>
  );
};