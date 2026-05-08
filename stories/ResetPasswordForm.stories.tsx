import type { Meta, StoryObj } from "@storybook/react";
import { ResetPasswordForm } from "../src/components/Auth/ResetPasswordForm";

const meta: Meta<typeof ResetPasswordForm> = {
  title: "Auth/ResetPasswordForm",
  component: ResetPasswordForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
};

export default meta;

type Story = StoryObj<typeof ResetPasswordForm>;

export const Default: Story = {
  args: {
    onSubmit: async (password: string) => {
      await new Promise((res) => setTimeout(res, 800));
      alert(`Password successfully reset! (Mock password: ${password})`);
    }
  }
};