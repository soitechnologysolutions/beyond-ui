import React from 'react';
import { Text, Section, Link, Heading } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export interface Article {
  title: string;
  excerpt: string;
  readTime: number;
  link: string;
}

export interface WeeklyNewsletterProps {
  username?: string;
  weekNumber?: number;
  featuredArticles?: Article[];
  topPickTitle?: string;
  communityHighlight?: string;
}

export const WeeklyNewsletter: React.FC<WeeklyNewsletterProps> = ({
  username = 'Reader',
  weekNumber = 42,
  featuredArticles = [
    {
      title: '10 Tips for Better React Components',
      excerpt: 'Learn how to write more maintainable and scalable React components with these simple tips.',
      readTime: 5,
      link: 'https://example.com/blog/react-tips'
    },
    {
      title: 'Understanding Server Actions in Next.js',
      excerpt: 'A deep dive into how Server Actions work and when to use them in your Next.js applications.',
      readTime: 8,
      link: 'https://example.com/blog/server-actions'
    }
  ],
  topPickTitle = 'The Future of Web Development',
  communityHighlight = 'This week, we want to shout out @johndoe for their amazing contribution to our open-source repository!',
}) => {
  const previewText = `Your weekly roundup: ${topPickTitle} and more →`;

  return (
    <EmailLayout previewText={previewText} title={`Week ${weekNumber} Newsletter`}>
      <Section className="bg-blue-50 dark:bg-blue-900 rounded-lg p-8 mb-6 text-center border-b-4 border-blue-500">
        <Heading className="text-3xl font-bold text-gray-900 dark:text-white m-0">
          Beyond<span className="text-blue-600 dark:text-blue-400">Weekly</span>
        </Heading>
        <Text className="text-gray-600 dark:text-gray-300 mt-2 m-0">Week {weekNumber}</Text>
      </Section>

      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hey {username} 👋</Text>
      <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
        Here's what you missed this week. We've curated the best content to help you stay ahead.
      </Text>

      <Section className="mb-6">
        <Heading className="text-xl font-semibold text-gray-900 dark:text-white border-b-2 border-gray-100 dark:border-gray-700 pb-2 mb-4">
          Top Reads This Week
        </Heading>
        
        {featuredArticles.map((article, index) => (
          <Section key={index} className="mb-6">
            <Link href={article.link} className="text-blue-600 dark:text-blue-400 font-semibold text-lg hover:underline">
              {article.title}
            </Link>
            <Text className="text-gray-700 dark:text-gray-300 text-base mt-1 mb-2">
              {article.excerpt}
            </Text>
            <Text className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider m-0">
              {article.readTime} min read
            </Text>
          </Section>
        ))}
      </Section>

      <Section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
        <Text className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider m-0 mb-2">
          ⭐ Editor's Top Pick
        </Text>
        <Heading className="text-xl font-bold text-gray-900 dark:text-white m-0 mb-4">
          {topPickTitle}
        </Heading>
        <EmailButton href="#">Read Now →</EmailButton>
      </Section>

      <Section className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg mb-6 border border-blue-100 dark:border-blue-800">
        <Heading className="text-lg font-semibold text-blue-900 dark:text-blue-100 m-0 mb-2">
          🌟 Community Corner
        </Heading>
        <Text className="text-blue-800 dark:text-blue-200 italic m-0 mb-4">
          "{communityHighlight}"
        </Text>
        <Link href="#" className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline">
          Share your story →
        </Link>
      </Section>
    </EmailLayout>
  );
};

export default WeeklyNewsletter;
