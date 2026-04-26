import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { HeadphonesIcon, ListMusic, Music2, Zap } from "lucide-react";

export default function LoginPage() {
  const { login, isInitializing, isLoggingIn } = useInternetIdentity();

  const features = [
    {
      icon: HeadphonesIcon,
      title: "Stream Anywhere",
      desc: "High-quality audio on any device",
    },
    {
      icon: ListMusic,
      title: "Your Playlists",
      desc: "Curate and organize your music",
    },
    {
      icon: Zap,
      title: "Premium Access",
      desc: "Unlock lyrics and exclusive content",
    },
  ];

  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-brand glow-primary flex items-center justify-center mb-4 shadow-subtle">
            <Music2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground tracking-tight">
            Sound<span className="text-gradient">Wave</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-center text-sm">
            Your premium music streaming experience
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-card/50 border border-border/50"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-primary" size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground font-display">
                  {title}
                </p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Login button */}
        <button
          type="button"
          onClick={login}
          disabled={isInitializing || isLoggingIn}
          data-ocid="login.primary_button"
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-base hover:opacity-90 disabled:opacity-50 transition-smooth glow-primary shadow-subtle flex items-center justify-center gap-2"
        >
          {isInitializing ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Loading…
            </>
          ) : isLoggingIn ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Signing in…
            </>
          ) : (
            <>
              <Music2 size={18} />
              Sign in with Internet Identity
            </>
          )}
        </button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Secure, decentralized authentication powered by the Internet Computer.
        </p>
      </div>
    </div>
  );
}
