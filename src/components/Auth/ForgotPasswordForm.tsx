import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../Input";
import { Button } from "../Button";
import { cn } from "../../utils/cn";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email")
});

type ForgotPasswordFormData = z.infer<typeof schema>;

export interface ForgotPasswordFormProps {
  onReset?: (email: string) => Promise<void> | void;
  className?: string;
  isLoading?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onReset,
  className,
  isLoading,
  successMessage,
  errorMessage
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<ForgotPasswordFormData>({ resolver: zodResolver(schema) });

  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setStatus("idle");
    try {
      await onReset?.(data.email);
      setStatus("success");
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-6", className)}
      autoComplete="off"
      noValidate
    >
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="reset-email">
          Email Address
        </label>
        <Input
          id="reset-email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          {...register("email")}
          disabled={isSubmitting || isLoading}
          variant={errors.email ? "error" : "default"}
        />
        {errors.email && (
          <div className="text-danger mt-1 text-xs">{errors.email.message}</div>
        )}
      </div>
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting || isLoading}
        className="w-full"
      >
        Send Reset Link
      </Button>
      {status === "success" && (
        <div className="text-success-700 bg-success-50 border border-success-200 p-2 text-sm rounded text-center">
          {successMessage || "A reset link was sent if the address exists in our system."}
        </div>
      )}
      {status === "error" && (
        <div className="text-danger-700 bg-danger-50 border border-danger-200 p-2 text-sm rounded text-center">
          {errorMessage || "There was an error submitting. Please try again."}
        </div>
      )}
    </form>
  );
};