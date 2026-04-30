import * as React from "react";
import { PasswordResetForm } from "./ForgotPasswordForm";
import { Card, CardHeader, CardTitle, CardContent } from "../Card";
import { toast } from "react-hot-toast";

export const PasswordResetFormExample: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  // Simulate async reset logic
  const handleReset = async (email: string) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1300));
    setLoading(false);
    toast.success(`If an account exists for ${email}, a reset link was sent.`);
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Password Reset</CardTitle>
        </CardHeader>
        <CardContent>
          <PasswordResetForm
            onReset={handleReset}
            isLoading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
};