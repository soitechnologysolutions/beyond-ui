import type { Meta, StoryObj } from "@storybook/react";
import { ForgotPasswordForm } from "../src/components/Auth/ForgotPasswordForm";

const meta: Meta<typeof ForgotPasswordForm> = {
  title: "Auth/ForgotPasswordForm",
  component: ForgotPasswordForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
};

export default meta;

type Story = StoryObj<typeof ForgotPasswordForm>;

export const Default: Story = {
  args: {
    onReset: async (email: string) => {
      await new Promise((res) => setTimeout(res, 800));
      alert(`Requested reset for: ${email}`);
    }
  }
};