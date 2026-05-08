import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export interface Testimonial {
  quote: string;
  authorName: string;
  company: string;
}

export interface SocialProofProps {
  userName?: string;
  testimonials?: Testimonial[];
  ctaLink?: string;
}

export const SocialProof: React.FC<SocialProofProps> = ({
  userName = 'Alex',
  testimonials = [
    { quote: "This platform completely changed how our team ships code. We've reduced our time-to-market by 40%.", authorName: "Jane Doe", company: "TechFlow" },
    { quote: "The best investment we've made this year. The ROI was apparent within the first two weeks of use.", authorName: "John Smith", company: "Acme Corp" }
  ],
  ctaLink = 'https://example.com/signup'
}) => {
  return (
    <EmailLayout previewText="See what others are saying about us" title="Customer Success Stories">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Don't just take our word for it.</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Hi {userName}, we could talk all day about how much value our platform can bring to your team, but we'd rather let our customers do the talking.
      </Text>
      {testimonials.map((testimonial, index) => (
        <Section key={index} className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg mb-6 border-l-4 border-blue-500 dark:border-blue-400">
          <Text className="text-blue-900 dark:text-blue-100 italic text-base m-0 mb-4">"{testimonial.quote}"</Text>
          <Text className="text-blue-800 dark:text-blue-200 font-semibold text-sm m-0">— {testimonial.authorName}, {testimonial.company}</Text>
        </Section>
      ))}
      <Section className="text-center mb-6"><EmailButton href={ctaLink}>Start Your Free Trial</EmailButton></Section>
    </EmailLayout>
  );
};

export default SocialProof;
