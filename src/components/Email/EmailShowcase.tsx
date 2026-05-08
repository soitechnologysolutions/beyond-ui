import React, { useState, useMemo } from 'react';
import { EmailPreviewer } from './components';
import * as AllTemplates from './templates';

// We map known template names to explicit categories.
// Any missed/new exports automatically fall into an "Uncategorized" section!
const CATEGORY_MAP: Record<string, string[]> = {
  "Marketing: Newsletters": ["WeeklyNewsletter", "MonthlyDigest", "CuratedIndustryNews"],
  "Marketing: Blog": ["NewBlogPost", "BlogSeries", "BestOfRoundup"],
  "Marketing: Lead Nurturing": ["LeadMagnetDelivery", "WebinarConfirmation", "WebinarReminder", "WebinarFollowup", "DripCampaignDay1", "DripCampaignComplete", "CaseStudyDelivery"],
  "Marketing: Promotional": ["AbandonedCart", "FlashSale", "BrowseAbandonment", "PriceDropAlert", "BackInStock", "SeasonalCampaign", "BirthdayOffer", "MilestoneDiscount"],
  "Marketing: Events": ["EventAnnouncement", "EarlyBirdReminder", "ScheduleReleased", "VIPInvite", "PostEventThankYou", "ConferenceSeries"],
  "Marketing: Re-engagement": ["WeMissYou30Day", "ComeBack60Day", "LastChance90Day", "ProductUpdateReengagement"],
  "Marketing: Social": ["SocialProof", "NewFollowerWelcome", "ShareYourStory", "UserSpotlight", "CommunityMilestone"],
  "Marketing: Surveys": ["NPSSurvey", "ExitSurvey", "CSATSurvey", "ProductFeedback", "BetaFeedback"],
  "Marketing: Affiliate": ["AffiliateInvite", "AffiliateWelcome", "AffiliatePayout", "AffiliateTopPerformer", "PartnerComarketing"],
  "Marketing: Content": ["NewGuideEbook", "ToolTemplateDelivery", "InfographicEmail", "PodcastEpisode", "YouTubeNotification"],
  "Sales": ["ColdOutreach", "FollowUpEmail", "ScheduleDemo", "SendProposal", "ProposalAccepted", "ProjectTermination", "ClientWinBack", "ClientReferenceRequest"],
  "Legal": ["PrivacyPolicyUpdate", "TermsOfServiceUpdate", "DPANotice", "DMCANotice", "GDPRCompliance"],
  "Internal: HR": ["NewHireAnnouncement", "BirthdayAnniversary", "EmployeeFarewell", "PolicyUpdate", "ExitInterviewRequest"],
  "Internal: IT": ["ITOutageReport", "PasswordRotationReminder", "AppAccessGranted"],
  "Internal: Comms": ["LeadershipUpdate", "MeetingRecap", "CompanyEventsCalendar"],
  "Billing": ["InvoiceEmail", "PaymentFailedEmail", "SubscriptionConfirmation", "SubscriptionCancelled", "TrialEndingEmail", "CreditCardExpiring", "PaymentReceipt", "OverduePaymentNotice"],
  "Authentication": ["WelcomeEmail", "ConfirmEmail", "MagicLinkEmail", "ResetPasswordEmail", "EmailChangeVerification", "TwoFactorCodeEmail"],
  "Support": ["TicketCreatedEmail", "TicketReplyEmail", "TicketResolvedEmail", "SupportFeedbackRequest"],
  "Engagement": ["WeeklyDigest", "FeatureAnnouncement", "MilestoneEmail", "InactivityWarning", "TipOfWeek", "ProductChangelog"],
  "Growth": ["ReferralInvite", "ReferralReward", "ReferralConverted", "WaitlistWelcome", "SocialSharePrompt"],
  "Security": ["NewLoginAlert", "PolicyUpdateEmail", "AccountDeletedConfirmation", "DataExportReady", "ApiKeyCreated"],
  "System": ["MaintenanceNotice", "IncidentReport", "StatusPageUpdate"]
};

export const EmailShowcase = () => {
  const { categories, flatTemplates, defaultTemplateId } = useMemo(() => {
    const parsedCategories: Record<string, Record<string, { name: string; component: React.ReactElement }>> = {};
    const flat: Record<string, React.ReactElement> = {};
    let firstId = '';

    // 1. Process known categories
    Object.entries(CATEGORY_MAP).forEach(([categoryName, componentNames]) => {
      componentNames.forEach(compName => {
        const Component = (AllTemplates as any)[compName];
        if (Component && typeof Component === 'function') {
          if (!parsedCategories[categoryName]) parsedCategories[categoryName] = {};
          
          // Automatically add spaces before Capital letters (e.g., WeeklyNewsletter -> Weekly Newsletter)
          const formattedName = compName.replace(/([A-Z])/g, ' $1').trim();
          const element = <Component />;
          
          parsedCategories[categoryName][compName] = { name: formattedName, component: element };
          flat[compName] = element;
          if (!firstId) firstId = compName;
        }
      });
    });

    // 2. Discover any newly added exports (Uncategorized Fallback)
    Object.entries(AllTemplates).forEach(([compName, Component]) => {
      if (
        compName === 'default' || 
        flat[compName] || 
        typeof Component !== 'function' ||
        /^[a-z]/.test(compName) // Ignore utility functions like renderEmailParams
      ) {
        return;
      }
      
      const categoryName = "Uncategorized";
      if (!parsedCategories[categoryName]) parsedCategories[categoryName] = {};
      
      const formattedName = compName.replace(/([A-Z])/g, ' $1').trim();
      const element = <Component />;
      
      parsedCategories[categoryName][compName] = { name: formattedName, component: element };
      flat[compName] = element;
      if (!firstId) firstId = compName;
    });

    return { categories: parsedCategories, flatTemplates: flat, defaultTemplateId: firstId };
  }, []);

  const [activeTemplate, setActiveTemplate] = useState(defaultTemplateId);

  // Keep state in sync if defaultTemplateId changes when component mounts
  React.useEffect(() => {
    if (!activeTemplate && defaultTemplateId) setActiveTemplate(defaultTemplateId);
  }, [defaultTemplateId, activeTemplate]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <label className="font-medium text-gray-700 dark:text-gray-300">Select Template:</label>
        <select 
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white min-w-[250px] focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={activeTemplate}
          onChange={(e) => setActiveTemplate(e.target.value)}
        >
          {Object.entries(categories).map(([categoryName, templates]) => (
            <optgroup key={categoryName} label={categoryName}>
              {Object.entries(templates).map(([id, data]) => (
                <option key={id} value={id}>{data.name}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        <EmailPreviewer component={flatTemplates[activeTemplate] || <div className="p-10 text-center text-gray-500">No template selected</div>} />
      </div>
    </div>
  );
};