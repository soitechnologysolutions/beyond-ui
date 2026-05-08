import React, { useState, useMemo } from 'react';
import { EmailPreviewer } from './components';
import { 
  // Marketing: Newsletters
  WeeklyNewsletter, MonthlyDigest, CuratedIndustryNews,
  // Marketing: Blog
  NewBlogPost, BlogSeries, BestOfRoundup,
  // Marketing: Lead Nurturing
  LeadMagnetDelivery, WebinarConfirmation, WebinarReminder, WebinarFollowup, DripCampaignDay1, DripCampaignComplete, CaseStudyDelivery,
  // Marketing: Promotional
  AbandonedCart, FlashSale, BrowseAbandonment, PriceDropAlert, BackInStock, SeasonalCampaign, BirthdayOffer, MilestoneDiscount,
  // Marketing: Events
  EventAnnouncement, EarlyBirdReminder, ScheduleReleased, VIPInvite, PostEventThankYou, ConferenceSeries,
  // Marketing: Re-engagement
  WeMissYou30Day, ComeBack60Day, LastChance90Day, ProductUpdateReengagement,
  // Marketing: Social
  SocialProof, NewFollowerWelcome, ShareYourStory, UserSpotlight, CommunityMilestone,
  // Marketing: Surveys
  NPSSurvey, ExitSurvey, CSATSurvey, ProductFeedback, BetaFeedback,
  // Marketing: Affiliate
  AffiliateInvite, AffiliateWelcome, AffiliatePayout, AffiliateTopPerformer, PartnerComarketing,
  // Marketing: Content
  NewGuideEbook, ToolTemplateDelivery, InfographicEmail, PodcastEpisode, YouTubeNotification,
  // Sales
  FollowUpEmail, ScheduleDemo, SendProposal, ProposalAccepted, ProjectTermination, ClientWinBack, ClientReferenceRequest,
  // Legal
  PrivacyPolicyUpdate, TermsOfServiceUpdate, DMCANotice, GDPRCompliance,
  // Internal
  BirthdayAnniversary, EmployeeFarewell, PolicyUpdate, ExitInterviewRequest,
  ITOutageReport, PasswordRotationReminder, AppAccessGranted,
  // Billing
  PaymentReceipt
} from './templates';

const TEMPLATE_CATEGORIES: Record<string, Record<string, { name: string; component: React.ReactElement }>> = {
  "Marketing: Newsletters": {
    "weekly_newsletter": { name: "Weekly Newsletter", component: <WeeklyNewsletter /> },
    "monthly_digest": { name: "Monthly Digest", component: <MonthlyDigest /> },
    "curated_industry_news": { name: "Curated Industry News", component: <CuratedIndustryNews /> }
  },
  "Marketing: Blog": {
    "new_blog_post": { name: "New Blog Post", component: <NewBlogPost /> },
    "blog_series": { name: "Blog Series", component: <BlogSeries /> },
    "best_of_roundup": { name: "Best of Roundup", component: <BestOfRoundup /> }
  },
  "Marketing: Lead Nurturing": {
    "lead_magnet": { name: "Lead Magnet Delivery", component: <LeadMagnetDelivery /> },
    "webinar_confirmation": { name: "Webinar Confirmation", component: <WebinarConfirmation /> },
    "webinar_reminder": { name: "Webinar Reminder", component: <WebinarReminder /> },
    "webinar_followup": { name: "Webinar Followup", component: <WebinarFollowup /> },
    "drip_day_1": { name: "Drip Campaign Day 1", component: <DripCampaignDay1 /> },
    "drip_complete": { name: "Drip Campaign Complete", component: <DripCampaignComplete /> },
    "case_study": { name: "Case Study Delivery", component: <CaseStudyDelivery /> }
  },
  "Marketing: Promotional": {
    "abandoned_cart": { name: "Abandoned Cart", component: <AbandonedCart /> },
    "flash_sale": { name: "Flash Sale", component: <FlashSale /> },
    "browse_abandonment": { name: "Browse Abandonment", component: <BrowseAbandonment /> },
    "price_drop": { name: "Price Drop Alert", component: <PriceDropAlert /> },
    "back_in_stock": { name: "Back in Stock", component: <BackInStock /> },
    "seasonal_campaign": { name: "Seasonal Campaign", component: <SeasonalCampaign /> },
    "birthday_offer": { name: "Birthday Offer", component: <BirthdayOffer /> },
    "milestone_discount": { name: "Milestone Discount", component: <MilestoneDiscount /> }
  },
  "Marketing: Events": {
    "event_announcement": { name: "Event Announcement", component: <EventAnnouncement /> },
    "early_bird": { name: "Early Bird Reminder", component: <EarlyBirdReminder /> },
    "schedule_released": { name: "Schedule Released", component: <ScheduleReleased /> },
    "vip_invite": { name: "VIP Invite", component: <VIPInvite /> },
    "post_event": { name: "Post Event Thank You", component: <PostEventThankYou /> },
    "conference_series": { name: "Conference Series", component: <ConferenceSeries /> }
  },
  "Marketing: Re-engagement": {
    "we_miss_you": { name: "We Miss You (30 Day)", component: <WeMissYou30Day /> },
    "come_back": { name: "Come Back (60 Day)", component: <ComeBack60Day /> },
    "last_chance": { name: "Last Chance (90 Day)", component: <LastChance90Day /> },
    "product_update_reengagement": { name: "Product Update Re-engagement", component: <ProductUpdateReengagement /> }
  },
  "Marketing: Social": {
    "social_proof": { name: "Social Proof", component: <SocialProof /> },
    "new_follower": { name: "New Follower Welcome", component: <NewFollowerWelcome /> },
    "share_your_story": { name: "Share Your Story", component: <ShareYourStory /> },
    "user_spotlight": { name: "User Spotlight", component: <UserSpotlight /> },
    "community_milestone": { name: "Community Milestone", component: <CommunityMilestone /> }
  },
  "Marketing: Surveys": {
    "nps_survey": { name: "NPS Survey", component: <NPSSurvey /> },
    "exit_survey": { name: "Exit Survey", component: <ExitSurvey /> },
    "csat_survey": { name: "CSAT Survey", component: <CSATSurvey /> },
    "product_feedback": { name: "Product Feedback", component: <ProductFeedback /> },
    "beta_feedback": { name: "Beta Feedback", component: <BetaFeedback /> }
  },
  "Marketing: Affiliate": {
    "affiliate_invite": { name: "Affiliate Invite", component: <AffiliateInvite /> },
    "affiliate_welcome": { name: "Affiliate Welcome", component: <AffiliateWelcome /> },
    "affiliate_payout": { name: "Affiliate Payout", component: <AffiliatePayout /> },
    "affiliate_top_performer": { name: "Affiliate Top Performer", component: <AffiliateTopPerformer /> },
    "partner_comarketing": { name: "Partner Co-marketing", component: <PartnerComarketing /> }
  },
  "Marketing: Content": {
    "new_guide": { name: "New Guide/Ebook", component: <NewGuideEbook /> },
    "tool_template": { name: "Tool/Template Delivery", component: <ToolTemplateDelivery /> },
    "infographic": { name: "Infographic", component: <InfographicEmail /> },
    "podcast_episode": { name: "Podcast Episode", component: <PodcastEpisode /> },
    "youtube_notification": { name: "YouTube Notification", component: <YouTubeNotification /> }
  },
  "Sales": {
    "follow_up": { name: "Follow Up Email", component: <FollowUpEmail /> },
    "schedule_demo": { name: "Schedule Demo", component: <ScheduleDemo /> },
    "send_proposal": { name: "Send Proposal", component: <SendProposal /> },
    "proposal_accepted": { name: "Proposal Accepted", component: <ProposalAccepted /> },
    "project_termination": { name: "Project Termination", component: <ProjectTermination /> },
    "client_winback": { name: "Client Win-Back", component: <ClientWinBack /> },
    "client_reference": { name: "Client Reference Request", component: <ClientReferenceRequest /> }
  },
  "Legal": {
    "privacy_policy": { name: "Privacy Policy Update", component: <PrivacyPolicyUpdate /> },
    "terms_of_service": { name: "Terms of Service Update", component: <TermsOfServiceUpdate /> },
    "dmca_notice": { name: "DMCA Notice", component: <DMCANotice /> },
    "gdpr_compliance": { name: "GDPR Compliance", component: <GDPRCompliance /> }
  },
  "Internal Operations": {
    "birthday_anniversary": { name: "Birthday/Anniversary", component: <BirthdayAnniversary /> },
    "employee_farewell": { name: "Employee Farewell", component: <EmployeeFarewell /> },
    "policy_update": { name: "Policy Update", component: <PolicyUpdate /> },
    "exit_interview": { name: "Exit Interview Request", component: <ExitInterviewRequest /> },
    "it_outage": { name: "IT Outage Report", component: <ITOutageReport /> },
    "password_rotation": { name: "Password Rotation", component: <PasswordRotationReminder /> },
    "app_access": { name: "App Access Granted", component: <AppAccessGranted /> }
  },
  "Billing": {
    "receipt": { name: "Payment Receipt", component: <PaymentReceipt /> }
  }
};

export const EmailShowcase = () => {
  const [activeTemplate, setActiveTemplate] = useState('weekly_newsletter');

  const allTemplates = useMemo(() => {
    const flat: Record<string, React.ReactElement> = {};
    Object.values(TEMPLATE_CATEGORIES).forEach(category => {
      Object.entries(category).forEach(([id, data]) => {
        flat[id] = data.component;
      });
    });
    return flat;
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <label className="font-medium text-gray-700 dark:text-gray-300">Select Template:</label>
        <select 
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white min-w-[250px] focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={activeTemplate}
          onChange={(e) => setActiveTemplate(e.target.value)}
        >
          {Object.entries(TEMPLATE_CATEGORIES).map(([categoryName, templates]) => (
            <optgroup key={categoryName} label={categoryName}>
              {Object.entries(templates).map(([id, data]) => (
                <option key={id} value={id}>{data.name}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        <EmailPreviewer component={allTemplates[activeTemplate] || <WeeklyNewsletter />} />
      </div>
    </div>
  );
};