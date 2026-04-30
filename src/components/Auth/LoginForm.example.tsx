import * as React from "react";
import { LoginForm } from "./LoginForm";
import { Card, CardHeader, CardTitle, CardContent } from "../Card";
import { AuthProvider } from "../../contexts/AuthContext";

export const LoginFormExample: React.FC = () => (
  <AuthProvider>
    <div className="flex items-center justify-center min-h-[400px] bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
        <LoginForm onSubmit={async (data) => console.log('Login submitted:', data)} />
        </CardContent>
      </Card>
    </div>
  </AuthProvider>
);