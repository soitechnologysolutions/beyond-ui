import React from 'react';
import { 
  PageLayout, 
  PageHeader, 
  PageHero, 
  PageContent, 
  PageSidebar, 
  PageFooter,
  PageLayoutContent
} from './PageLayout';
import { Button } from '../Button';
import { Card, CardHeader, CardTitle, CardContent } from '../Card';
import { Badge } from '../Badge';
import { Input } from '../Input';
import { Avatar, AvatarImage, AvatarFallback } from '../Avatar';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Calendar,
  User,
  Tag,
  ArrowRight,
  CheckCircle,
  Globe,
  Mail,
  Phone
} from 'lucide-react';

/**
 * Landing Page Example
 * Features: Hero section, feature highlights, CTA sections
 */
export const LandingPageExample: React.FC = () => (
  <PageLayout variant="landing" maxWidth="full">
    {/* Header */}
    <PageHeader sticky transparent>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">Beyond</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Features</a>
            <a href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Pricing</a>
            <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">About</a>
            <Button variant="primary">Get Started</Button>
          </nav>
        </div>
      </div>
    </PageHeader>

    {/* Hero Section */}
    <PageHero fullHeight>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Build Amazing
            <span className="text-primary-600 dark:text-primary-400"> Web Experiences</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Create stunning, responsive websites with our comprehensive UI component library. 
            Built for developers, designed for users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" className="px-8">
              Start Building
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              View Components
            </Button>
          </div>
        </div>
      </div>
    </PageHero>

    {/* Features Section */}
    <PageLayoutContent layout="centered" spacing="xl">
      <section id="features" className="py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive components, responsive design, and developer-friendly APIs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <CheckCircle className="h-8 w-8 text-primary-600" />,
              title: "Production Ready",
              description: "Battle-tested components used by thousands of developers"
            },
            {
              icon: <Globe className="h-8 w-8 text-primary-600" />,
              title: "Responsive Design",
              description: "Mobile-first approach with perfect scaling across all devices"
            },
            {
              icon: <Star className="h-8 w-8 text-primary-600" />,
              title: "Premium Quality",
              description: "Carefully crafted with attention to detail and user experience"
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center p-8">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </PageLayoutContent>

    {/* Footer */}
    <PageFooter variant="detailed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-6 w-6 text-white" />
              <span className="font-bold text-xl text-white">Beyond</span>
            </div>
            <p className="text-gray-300">
              Building the future of web development, one component at a time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Components</a></li>
              <li><a href="#" className="hover:text-white">Templates</a></li>
              <li><a href="#" className="hover:text-white">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@beyond.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Beyond. All rights reserved.</p>
        </div>
      </div>
    </PageFooter>
  </PageLayout>
);

/**
 * Product Page Example
 * Features: Product showcase, specifications, reviews
 */
export const ProductPageExample: React.FC = () => (
  <PageLayout variant="product" maxWidth="xl">
    {/* Header */}
    <PageHeader>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6 text-primary-600" />
            <span className="font-bold text-xl dark:text-white">Store</span>
          </div>
          <div className="flex items-center space-x-4">
            <Input placeholder="Search products..." className="w-64" />
            <Button variant="outline">Cart (2)</Button>
          </div>
        </div>
      </div>
    </PageHeader>

    {/* Product Content */}
    <PageLayoutContent layout="centered" spacing="lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <ShoppingCart className="h-16 w-16 mx-auto mb-2" />
              <p>Product Image</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 dark:bg-gray-800 rounded border-2 border-transparent hover:border-primary-500 cursor-pointer" />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="success">In Stock</Badge>
            <Badge variant="outline">Free Shipping</Badge>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Premium Wireless Headphones
          </h1>
          
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-400">(128 reviews)</span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">$299.99</span>
            <span className="text-lg text-gray-500 dark:text-gray-400 line-through ml-2">$399.99</span>
            <Badge variant="danger" className="ml-2">25% OFF</Badge>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Experience premium sound quality with our latest wireless headphones. 
            Featuring active noise cancellation, 30-hour battery life, and premium materials.
          </p>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</label>
              <div className="flex space-x-2">
                {['Black', 'White', 'Blue'].map((color) => (
                  <button
                    key={color}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 dark:text-gray-200 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 focus:border-primary-500"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <Button variant="primary" size="lg" className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="border-t dark:border-gray-800 pt-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Active Noise Cancellation
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                30-Hour Battery Life
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Premium Build Quality
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayoutContent>

    {/* Footer */}
    <PageFooter variant="simple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">&copy; 2024 Store. All rights reserved.</p>
      </div>
    </PageFooter>
  </PageLayout>
);

/**
 * Blog Post Example
 * Features: Article content with sidebar, author info, related posts
 */
export const BlogPostExample: React.FC = () => (
  <PageLayout variant="blog" maxWidth="xl">
    {/* Header */}
    <PageHeader>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl dark:text-white">Blog</span>
          </div>
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Home</a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Categories</a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">About</a>
          </nav>
        </div>
      </div>
    </PageHeader>

    {/* Blog Content with Sidebar */}
    <PageLayoutContent layout="sidebar" spacing="lg">
      {/* Main Content */}
      <PageContent maxWidth="full" className="lg:flex-1">
        <article className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <header className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="default">Technology</Badge>
              <Badge variant="outline">React</Badge>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Building Modern Web Applications with React and TypeScript
            </h1>
            
            <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center space-x-2">
                <Avatar size="sm">
                  <AvatarImage src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span>John Doe</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>March 15, 2024</span>
              </div>
              <span>8 min read</span>
            </div>
          </header>

          <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-8 flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <Globe className="h-16 w-16 mx-auto mb-2" />
              <p>Featured Image</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Modern web development has evolved significantly over the past few years. 
              With the introduction of React and TypeScript, developers now have powerful 
              tools to build scalable, maintainable applications.
            </p>
            
            <p>
              In this comprehensive guide, we'll explore the best practices for building 
              modern web applications using React and TypeScript. We'll cover everything 
              from project setup to deployment strategies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Getting Started
            </h2>
            
            <p>
              The first step in building any React application is setting up your 
              development environment. We recommend using Create React App with 
              TypeScript template for beginners.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border-l-4 border-primary-500 dark:border-primary-400">
              <p className="font-medium text-gray-900 dark:text-white mb-2">Pro Tip:</p>
              <p className="text-gray-700 dark:text-gray-300">
                Always start with a solid project structure. This will save you 
                countless hours as your application grows.
              </p>
            </div>
          </div>
        </article>

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-start space-x-4">
            <Avatar size="lg">
              <AvatarImage src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">John Doe</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Senior Frontend Developer with 8+ years of experience building 
                scalable web applications. Passionate about React, TypeScript, 
                and modern web technologies.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">Follow</Button>
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageContent>

      {/* Sidebar */}
      <PageSidebar position="right" width="md">
        <div className="space-y-6">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle>Search</CardTitle>
            </CardHeader>
            <CardContent>
              <Input placeholder="Search articles..." />
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: 'Technology', count: 24 },
                  { name: 'React', count: 18 },
                  { name: 'TypeScript', count: 12 },
                  { name: 'Web Design', count: 8 },
                ].map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                  <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                      {category.name}
                    </a>
                    <Badge variant="outline">{category.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  'Getting Started with Next.js',
                  'CSS Grid vs Flexbox: When to Use Each',
                  'Building Accessible Web Components',
                ].map((title, index) => (
                  <div key={index}>
                  <a href="#" className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 font-medium block mb-1">
                      {title}
                    </a>
                  <p className="text-sm text-gray-500 dark:text-gray-400">March {10 + index}, 2024</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'GraphQL'].map((tag) => (
                <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/30">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </PageSidebar>
    </PageLayoutContent>

    {/* Footer */}
    <PageFooter variant="minimal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">&copy; 2024 Blog. All rights reserved.</p>
      </div>
    </PageFooter>
  </PageLayout>
);