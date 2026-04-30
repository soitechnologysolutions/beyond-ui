import React, { useState } from 'react';
import { Shield, Lock, UserPlus, Eye, Code, Settings } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../Tabs';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { showToast } from '../Toast';

/**
 * Component to display current authentication state
 */
const AuthStatus: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Not Authenticated
          </h3>
          <p className="text-gray-600">
            Please log in to see your authentication status
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 text-success-600 mr-2" />
          Authentication Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Status:</span>
          <Badge variant="success">Authenticated</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">User:</span>
          <span className="text-sm text-gray-900">{user.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Email:</span>
          <span className="text-sm text-gray-900">{user.email}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Role:</span>
          <Badge variant="outline">{user.role}</Badge>
        </div>
        <div className="pt-4 border-t">
          <Button
            variant="outline"
            onClick={logout}
            className="w-full"
          >
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Code examples for the authentication components
 */
const codeExamples = {
  login: `import { LoginForm } from '@/components/Auth';

function LoginPage() {
  return (
    <LoginForm
      onSubmit={async (data) => {
        console.log('Login successful!', data);
        // Redirect to dashboard
      }}
      onForgotPassword={() => {
        // Handle forgot password
      }}
    />
  );
}`,
  signup: `import { SignupForm } from '@/components/Auth';

function SignupPage() {
  return (
    <SignupForm
      onSubmit={async (data) => {
        console.log('Signup successful!', data);
        // Redirect to dashboard
      }}
    />
  );
}`,
  provider: `import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}`,
  protected: `import { ProtectedRoute } from '@/components/Auth';

function AdminPanel() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div>Admin-only content</div>
    </ProtectedRoute>
  );
}`,
};

/**
 * AuthShowcase component demonstrating all authentication features
 */
export const AuthShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('demo');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      showToast.success('Code copied to clipboard!');
    } catch (err) {
      showToast.error('Failed to copy code');
    }
  };

  return (
    <AuthProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Authentication Components</h1>
            <p className="text-gray-600 mt-1">
              Comprehensive authentication system with forms, validation, and protection
            </p>
          </div>
          <Badge variant="outline" className="flex items-center">
            <Shield className="h-4 w-4 mr-1" />
            Secure
          </Badge>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="demo">
              <Eye className="h-4 w-4 mr-2" />
              Demo
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="h-4 w-4 mr-2" />
              Code Examples
            </TabsTrigger>
            <TabsTrigger value="features">
              <Settings className="h-4 w-4 mr-2" />
              Features
            </TabsTrigger>
          </TabsList>

          <TabsContent value="demo" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Authentication Forms */}
              <div>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Authentication Forms</CardTitle>
                      <div className="flex bg-gray-100 rounded-lg p-1">
                        <Button
                          variant={authMode === 'login' ? 'primary' : 'ghost'}
                          size="sm"
                          onClick={() => setAuthMode('login')}
                        >
                          <Lock className="h-4 w-4 mr-1" />
                          Login
                        </Button>
                        <Button
                          variant={authMode === 'signup' ? 'primary' : 'ghost'}
                          size="sm"
                          onClick={() => setAuthMode('signup')}
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          Signup
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {authMode === 'login' ? (
                      <LoginForm
                        onSubmit={async () => { showToast.success('Login successful!'); }}
                        onForgotPassword={() => showToast.info('Forgot password clicked')}
                        onSignupClick={() => setAuthMode('signup')}
                      />
                    ) : (
                      <SignupForm
                        onSubmit={async () => { showToast.success('Signup successful!'); }}
                        onLoginClick={() => setAuthMode('login')}
                      />
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Authentication Status */}
              <div>
                <AuthStatus />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="mt-6">
            <div className="space-y-6">
              {Object.entries(codeExamples).map(([key, code]) => (
                <Card key={key}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="capitalize">{key} Example</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(code)}
                    >
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

          <TabsContent value="features" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>LoginForm Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Email/password validation with Zod schema</li>
                    <li>• Password visibility toggle</li>
                    <li>• "Remember me" functionality</li>
                    <li>• Loading states and error handling</li>
                    <li>• ARIA labels for accessibility</li>
                    <li>• Keyboard navigation support</li>
                    <li>• Demo credentials provided</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SignupForm Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Real-time form validation</li>
                    <li>• Password strength indicator</li>
                    <li>• Password confirmation matching</li>
                    <li>• Terms of service acceptance</li>
                    <li>• Email uniqueness validation</li>
                    <li>• Responsive design</li>
                    <li>• Error boundary protection</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AuthProvider Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Context-based state management</li>
                    <li>• Token persistence with cookies</li>
                    <li>• Automatic token refresh</li>
                    <li>• Session management</li>
                    <li>• Error handling and recovery</li>
                    <li>• TypeScript support</li>
                    <li>• Secure cookie configuration</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ProtectedRoute Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Authentication checking</li>
                    <li>• Role-based access control</li>
                    <li>• Automatic redirects</li>
                    <li>• Loading states</li>
                    <li>• Custom fallback components</li>
                    <li>• Location state preservation</li>
                    <li>• HOC pattern support</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AuthProvider>
  );
};