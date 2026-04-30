import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "../Input";
import { Button } from "../Button";
import { cn } from "../../utils/cn";
import { Spinner } from "../Spinner";

const schema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof schema>;

export interface ResetPasswordFormProps {
  onSubmit?: (password: string) => Promise<void> | void;
  className?: string;
  isLoading?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
  className,
  isLoading,
  successMessage,
  errorMessage
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordFormData>({ resolver: zodResolver(schema) });

  const handleFormSubmit = async (data: ResetPasswordFormData) => {
    setStatus("idle");
    try {
      await onSubmit?.(data.password);
      setStatus("success");
    } catch (e) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("text-success-700 bg-success-50 border border-success-200 p-6 text-sm rounded-lg text-center", className)}>
        {successMessage || "Your password has been successfully reset. You can now log in with your new password."}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={cn("space-y-6", className)}
      autoComplete="off"
      noValidate
    >
      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
          New Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            className={cn("pl-10 pr-10", errors.password && "border-danger-500 focus:ring-danger-500")}
            {...register("password")}
            disabled={isSubmitting || isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-danger-600">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            className={cn("pl-10 pr-10", errors.confirmPassword && "border-danger-500 focus:ring-danger-500")}
            {...register("confirmPassword")}
            disabled={isSubmitting || isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-danger-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting || isLoading}
      >
        {(isSubmitting || isLoading) ? (
          <>
            <Spinner size="sm" className="mr-2" />
            Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </Button>

      {status === "error" && (
        <div className="text-danger-700 bg-danger-50 border border-danger-200 p-2 text-sm rounded text-center">
          {errorMessage || "There was an error resetting your password. Please try again."}
        </div>
      )}
    </form>
  );
};