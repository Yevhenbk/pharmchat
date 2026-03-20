import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GmailSignInButton } from "./gmail-sign-in-button";

const meta: Meta<typeof GmailSignInButton> = {
  title: "UI/GmailSignInButton",
  component: GmailSignInButton,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof GmailSignInButton>;

export const SignedOut: Story = {};

export const SignedIn: Story = {
  parameters: {
    nextauth: {
      session: {
        data: {
          user: { email: "pharmacist@example.com", name: "Jane Doe" },
          expires: "2099-01-01",
        },
        status: "authenticated",
      },
    },
  },
};
