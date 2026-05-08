import React from 'react';
import { Text, Section } from '@react-email/components';
import { EmailLayout, EmailButton } from '../../../components';

export const NewBlogPost: React.FC<{ title?: string; author?: string; link?: string }> = ({ 
  title = '10 Tips for React Developers', 
  author = 'Jane Doe', 
  link = '#' 
}) => (
  <EmailLayout previewText={`New post: ${title}`} title="New Blog Post">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">New on the blog!</Text>
    <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">We just published a new article by {author}: <strong>{title}</strong>. Check it out now to learn more.</Text>
    <Section className="text-center mb-6">
      <EmailButton href={link}>Read Article</EmailButton>
    </Section>
  </EmailLayout>
);
export default NewBlogPost;