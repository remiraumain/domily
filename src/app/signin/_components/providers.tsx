import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

interface ProvidersProps {
  provider: "google" | "facebook" | "discord" | "all";
}

export const Providers = ({ provider }: ProvidersProps) => {
  switch (provider) {
    case "google":
      return (
        <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
          Sign in with Google
        </Button>
      );
    case "facebook":
      return (
        <Button onClick={() => signIn("facebook", { callbackUrl: "/" })}>
          Sign in with Facebook
        </Button>
      );
    case "discord":
      return (
        <Button onClick={() => signIn("discord", { callbackUrl: "/" })}>
          Sign in with Dirscord
        </Button>
      );
    default:
      return (
        <div>
          <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
            Sign in with Google
          </Button>
          <Button onClick={() => signIn("facebook", { callbackUrl: "/" })}>
            Sign in with Facebook
          </Button>
          <Button onClick={() => signIn("discord", { callbackUrl: "/" })}>
            Sign in with Dirscord
          </Button>
        </div>
      );
  }
};
