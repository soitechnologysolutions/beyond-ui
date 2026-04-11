import React, { useState } from 'react';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Code, 
  Eye, 
  Copy, 
  Check,
  Layout,
  Globe,
  ShoppingCart,
  User
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../Tabs';
import { showToast } from '../Toast';
import { LandingPageExample, ProductPageExample, BlogPostExample } from './PageLayoutExamples';

const codeExamples = {
  basic: `import { PageLayout, PageHeader, PageContent, PageFooter } from '@/components/PageLayout';

function BasicPage() {
  return (
    <PageLayout variant="default" maxWidth="xl">
      <PageHeader>
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="font-bold text-xl">My App</div>
            <div className="space-x-4">
              <a href="#" className="text-gray-700 hover:text-primary-600">Home</a>
              <a href="#" className="text-gray-700 hover:text-primary-600">About</a>
            </div>
          </div>
        </nav>
      </PageHeader>

      <PageContent maxWidth="lg" className="py-12">
        <h1 className="text-3xl font-bold mb-6">Welcome to My App</h1>
        <p className="text-gray-600">Your content goes here...</p>
      </PageContent>

      <PageFooter variant="simple">
        <div className="text-center py-8">
          <p>&copy; 2024 My App. All rights reserved.</p>
        </div>
      </PageFooter>
    </PageLayout>
  );
}`,

  landing: `import { 
  PageLayout, 
  PageHeader, 
  PageHero, 
  PageLayoutContent 
} from '@/components/PageLayout';

function LandingPage() {
  return (
    <PageLayout variant="landing" maxWidth="full">
      <PageHeader sticky transparent>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="font-bold text-xl">Brand</div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <Button variant="primary">Get Started</Button>
            </nav>
          </div>
        </div>
      </PageHeader>

      <PageHero fullHeight>
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-6">
            Build Amazing Products
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create stunning experiences with our tools
          </p>
          <Button variant="primary" size="lg">
            Start Building
          </Button>
        </div>
      </PageHero>

      <PageLayoutContent layout="centered" spacing="xl">
        {/* Your sections here */}
      </PageLayoutContent>
    </PageLayout>
  );
}`,

  sidebar: `import { 
  PageLayout, 
  PageHeader, 
  PageContent, 
  PageSidebar,
  PageLayoutContent 
} from '@/components/PageLayout';

function BlogPost() {
  return (
    <PageLayout variant="blog" maxWidth="xl">
      <PageHeader>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="font-bold text-xl">Blog</div>
            <nav className="flex space-x-6">
              <a href="#">Home</a>
              <a href="#">Categories</a>
            </nav>
          </div>
        </div>
      </PageHeader>

      <PageLayoutContent layout="sidebar" spacing="lg">
        <PageContent maxWidth="full">
          <article className="prose prose-lg">
            <h1>Article Title</h1>
            <p>Article content goes here...</p>
          </article>
        </PageContent>

        <PageSidebar position="right" width="md">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Sidebar content */}
              </CardContent>
            </Card>
          </div>
        </PageSidebar>
      </PageLayoutContent>
    </PageLayout>
  );
}`
};

export const PageLayoutShowcase: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<'landing' | 'product' | 'blog'>('landing');
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      showToast.success('Code copied to clipboard!');
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      showToast.error('Failed to copy code');
    }
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case 'tablet': return 'max-w-2xl';
      case 'mobile': return 'max-w-sm';
      default: return 'w-full';
    }
  };

  const renderExample = () => {
    switch (selectedExample) {
      case 'landing': return <LandingPageExample />;
      case 'product': return <ProductPageExample />;
      case 'blog': return <BlogPostExample />;
      default: return <LandingPageExample />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Page Layout System</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Flexible, responsive layout components for building various page types
          </p>
        </div>
        <Badge variant="outline" className="flex items-center">
          <Layout className="h-4 w-4 mr-1" />
          Layout System
        </Badge>
      </div>

      {/* Example Selection */}
      <div className="flex items-center justify-between">
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <Button
            variant={selectedExample === 'landing' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedExample('landing')}
          >
            <Globe className="h-4 w-4 mr-2" />
            Landing Page
          </Button>
          <Button
            variant={selectedExample === 'product' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedExample('product')}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Product Page
          </Button>
          <Button
            variant={selectedExample === 'blog' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedExample('blog')}
          >
            <User className="h-4 w-4 mr-2" />
            Blog Post
          </Button>
        </div>

        {/* Viewport Controls */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <Button
            variant={viewMode === 'desktop' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('desktop')}
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'tablet' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('tablet')}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'mobile' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('mobile')}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value="preview" onValueChange={() => {}}>
        <TabsList>
          <TabsTrigger value="preview">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code">
            <Code className="h-4 w-4 mr-2" />
            Code Examples
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className={`mx-auto transition-all duration-300 ${getViewportClass()}`}>
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
                  <div className="transform scale-75 origin-top-left w-[133.33%] h-[133.33%]">
                    {renderExample()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="mt-6">
          <div className="space-y-6">
            {Object.entries(codeExamples).map(([key, code]) => (
              <Card key={key}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="capitalize">{key} Layout Example</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(code)}
                  >
                    {copiedCode === code ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    Copy Code
                  </Button>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Documentation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Layout Components</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><strong>PageLayout:</strong> Main container with variant support</li>
              <li><strong>PageHeader:</strong> Sticky/transparent header with navigation</li>
              <li><strong>PageHero:</strong> Full-height hero sections with backgrounds</li>
              <li><strong>PageContent:</strong> Main content area with max-width control</li>
              <li><strong>PageSidebar:</strong> Flexible sidebar with positioning</li>
              <li><strong>PageFooter:</strong> Footer with multiple style variants</li>
              <li><strong>PageLayoutContent:</strong> Content wrapper with layout options</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Responsive design with mobile-first approach</li>
              <li>• Flexible layout variants (default, centered, sidebar)</li>
              <li>• Semantic HTML with proper ARIA landmarks</li>
              <li>• TypeScript support with comprehensive interfaces</li>
              <li>• CSS Grid and Flexbox for modern layouts</li>
              <li>• Customizable spacing and max-width controls</li>
              <li>• Production-ready with performance optimizations</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};