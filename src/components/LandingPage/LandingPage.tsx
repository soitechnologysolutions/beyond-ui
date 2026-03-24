import React from 'react';
import {
  ArrowRight,
  Zap,
  Palette,
  Code,
  Shield,
  Star,
  CheckCircle,
  Github,
  Twitter,
  Mail,
  Globe,
  Smartphone,
  Monitor,
  Users,
  TrendingUp,
  Heart,
  Linkedin,
  Package
} from 'lucide-react';
import {
  PageLayout,
  PageHeader,
  PageHero,
  PageContent,
  PageFooter,
  PageLayoutContent,
  PageLayoutShowcase
} from '../PageLayout';
import { Button } from '../Button';
import { Card, CardHeader, CardTitle, CardContent } from '../Card';
import { Badge } from '../Badge';
import { Avatar, AvatarImage, AvatarFallback } from '../Avatar';
import { StatsCard } from '../StatsCard';
import { Link } from 'react-router-dom';
import { AuthShowcase } from '../Auth/AuthShowcase';

/**
 * Professional Landing Page for Beyond UI Component Library
 * Demonstrates the library's capabilities while driving user engagement
 */
const ShowcaseNavButton: React.FC = () => {
  return (
    <Button
      variant="primary"
      size="xl"
      type="button"
      asChild
      className="flex items-center justify-center gap-2"
    >
      <Link to="/showcase">
        <Code aria-hidden="true" className="h-5 w-5" />
        <span>View Full Showcase</span>
        <ArrowRight aria-hidden="true" className="h-5 w-5" />
      </Link>
    </Button>
  );
};
export const LandingPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigationLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Templates', href: '#templates' }
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <PageLayout variant="landing" maxWidth="full">
      {/* Navigation Header */}
      <PageHeader sticky transparent>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <Globe aria-hidden="true" className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-2xl text-gray-900">Beyond UI</span>
                <div className="text-xs text-primary-600 font-medium">Component Library</div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  {label}
                </a>
              ))}
              <Button
                variant="primary"
                className="shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
                asChild
              >
                <a
                  href="https://www.npmjs.com/package/@beyondcorp/beyond-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Get Started</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
          {isMobileMenuOpen && (
            <div id="mobile-nav" className="md:hidden border-t border-gray-200 pt-4 pb-6 space-y-4">
              <div className="flex flex-col space-y-3">
                {navigationLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-700 font-medium transition-colors hover:text-primary-600"
                  >
                    {label}
                  </a>
                ))}
              </div>
              <Button
                variant="primary"
                className="w-full flex items-center justify-center gap-2"
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <a
                  href="https://www.npmjs.com/package/@beyondcorp/beyond-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Get Started</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </PageHeader>

      {/* Hero Section */}
      <PageHero fullHeight>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Hero Badge */}
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm border-primary-200">
              <Star aria-hidden="true" className="h-4 w-4 mr-2 text-primary-600" />
              Production Ready Components
            </Badge>

            {/* Hero Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Build Faster with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                Beyond UI
              </span>
            </h1>

            {/* Hero Description */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              A comprehensive React component library built with TypeScript, TailwindCSS, and modern design principles. 
              Create beautiful, accessible applications in minutes, not hours.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                variant="primary"
                size="xl"
                asChild
                className="px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3"
              >
                <Link to="/showcase">
                  <Code aria-hidden="true" className="h-6 w-6" />
                  <span>Explore Components</span>
                  <ArrowRight aria-hidden="true" className="h-6 w-6" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                asChild
                className="px-8 py-4 text-lg font-semibold bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 flex items-center gap-3"
              >
                <a href="https://github.com/MachineKe/beyond-ui" target="_blank" rel="noopener noreferrer">
                  <Github aria-hidden="true" className="h-6 w-6" />
                  <span>View on GitHub</span>
                </a>
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                <div className="text-gray-600">Components</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
                <div className="text-gray-600">TypeScript</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">A11Y</div>
                <div className="text-gray-600">Accessible</div>
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      {/* Features Section */}
      <PageLayoutContent layout="centered" spacing="xl">
        <section id="features" className="py-20">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1">
              <Zap aria-hidden="true" className="h-4 w-4 mr-2" />
              Why Choose Beyond UI
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Build
              <span className="text-primary-600"> Amazing UIs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From simple buttons to complex data tables, Beyond UI provides production-ready components 
              that help you ship faster without compromising on quality.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-primary-50 to-blue-50">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Code aria-hidden="true" className="h-8 w-8 text-white" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 mb-3">
                  Modern Components
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  50+ carefully crafted components built with the latest React patterns and best practices.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-success-50 to-green-50">
              <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap aria-hidden="true" className="h-8 w-8 text-white" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 mb-3">
                  Easy Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Drop-in components that work seamlessly with your existing React applications.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-purple-50 to-indigo-50">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Palette aria-hidden="true" className="h-8 w-8 text-white" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 mb-3">
                  Fully Customizable
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Theme system and CSS variables make it easy to match your brand and design requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-orange-50 to-red-50">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield aria-hidden="true" className="h-8 w-8 text-white" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 mb-3">
                  Production Ready
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Battle-tested components with comprehensive testing, accessibility, and performance optimization.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Built for Developer Experience
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle aria-hidden="true" className="h-6 w-6 text-success-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">TypeScript First</h4>
                    <p className="text-gray-600">Complete type safety with comprehensive interfaces and IntelliSense support.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle aria-hidden="true" className="h-6 w-6 text-success-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Accessibility Built-in</h4>
                    <p className="text-gray-600">WCAG compliant components with proper ARIA labels and keyboard navigation.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle aria-hidden="true" className="h-6 w-6 text-success-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Responsive by Default</h4>
                    <p className="text-gray-600">Mobile-first design with breakpoints that work across all devices.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle aria-hidden="true" className="h-6 w-6 text-success-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Tree Shakeable</h4>
                    <p className="text-gray-600">Import only what you need to keep your bundle size optimized.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <StatsCard
                variant="gradient"
                color="primary"
                title="Bundle Size"
                value="< 50KB"
                trend={{
                  direction: "down",
                  value: "Optimized",
                  label: "tree-shakeable"
                }}
                icon={<TrendingUp aria-hidden="true" className="h-6 w-6" />}
              />
              <StatsCard
                variant="gradient"
                color="success"
                title="Performance"
                value="A+ Grade"
                trend={{
                  direction: "up",
                  value: "Fast",
                  label: "loading"
                }}
                icon={<Zap aria-hidden="true" className="h-6 w-6" />}
              />
              <StatsCard
                variant="gradient"
                color="warning"
                title="Components"
                value="50+"
                trend={{
                  direction: "up",
                  value: "Growing",
                  label: "library"
                }}
                icon={<Code aria-hidden="true" className="h-6 w-6" />}
              />
              <StatsCard
                variant="gradient"
                color="danger"
                title="Accessibility"
                value="WCAG 2.1"
                trend={{
                  direction: "up",
                  value: "AA",
                  label: "compliant"
                }}
                icon={<Shield aria-hidden="true" className="h-6 w-6" />}
              />
            </div>
          </div>
        </section>
      </PageLayoutContent>

      {/* Component Showcase Section */}
      <section id="showcase" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1">
              <Monitor aria-hidden="true" className="h-4 w-4 mr-2" />
              Interactive Demo
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See Beyond UI in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore our comprehensive component library with live examples, 
              code snippets, and interactive documentation.
            </p>
            <ShowcaseNavButton />
          </div>

          {/* Embedded Component Showcase Preview */}
          <AuthShowcase/>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageLayoutShowcase/>  
        </div>
      </section>

      {/* Call to Action Section */}
      <PageLayoutContent layout="centered" spacing="xl">
        <section className="py-20">
          <Card className="text-center p-12 bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 border-0 shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <Heart aria-hidden="true" className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ready to Build Something
                <span className="text-primary-600"> Amazing?</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Join thousands of developers who are already building faster, 
                more accessible applications with Beyond UI.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  variant="primary" 
                  size="xl" 
                  className="px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Code aria-hidden="true" className="mr-3 h-6 w-6" />
                  <Link to="https://www.npmjs.com/package/@beyondcorp/beyond-ui" target="_blank">Start Building Now</Link>
                  <ArrowRight aria-hidden="true" className="ml-3 h-6 w-6" />
                </Button>
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="px-10 py-4 text-lg font-semibold bg-white hover:bg-gray-50 transition-all duration-300"
                >
                  <Github aria-hidden="true" className="mr-3 h-6 w-6" />
                  <Link to="https://github.com/MachineKe/beyond-ui" target="_blank">Star on GitHub</Link>
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Users aria-hidden="true" className="h-4 w-4" />
                  <span>10k+ developers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star aria-hidden="true" className="h-4 w-4" />
                  <span>MIT License</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield aria-hidden="true" className="h-4 w-4" />
                  <span>Production Ready</span>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </PageLayoutContent>

      {/* Footer */}
      <PageFooter variant="detailed">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="font-bold text-2xl text-white">Beyond UI</span>
                  <div className="text-sm text-gray-300">Component Library</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                A comprehensive React component library built with TypeScript, TailwindCSS, 
                and modern design principles. Build beautiful, accessible applications faster.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                  <Github className="h-5 w-5" />
                  <Link to="https://github.com/MachineKe/beyond-ui" target="_blank">Github</Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                  <Package className="h-5 w-5" />
                  <Link to="https://www.npmjs.com/package/@beyondcorp/beyond-ui" target="_blank">NPM</Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                  <Linkedin className="h-5 w-5" />
                  <Link to="https://www.linkedin.com/company/soi-technology-solutions" target="_blank">Linkedin</Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                  <Mail className="h-5 w-5" ></Mail>
                  <Link to="mailto:ui@beyondsoftwares.com" target="_blank">Email</Link>
                </Button>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/showcase" className="hover:text-white transition-colors">Components</Link></li>
                <li><a href="https://storybook.ui.beyondsoftwares.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#showcase" className="hover:text-white transition-colors">Examples</a></li>
                <li><a href="#templates" className="hover:text-white transition-colors">Templates</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><a href="https://www.linkedin.com/company/soi-technology-solutions" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="mailto:ui@beyondsoftwares.com" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 pt-8 pb-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-300 text-sm">
                &copy; 2025 Beyond UI. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Made with ❤️ by{' '}
            <a 
              href="https://samaritansystem.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Samaritan
            </a>
          </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  License
                </a>
              </div>
            </div>
          </div>
        </div>
      </PageFooter>
    </PageLayout>
  );
};