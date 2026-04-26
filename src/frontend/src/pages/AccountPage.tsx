import {
  useCreateCheckoutSession,
  useGetCallerUserProfile,
  useGetStripeSessionStatus,
  useGetUserTier,
  useIsStripeConfigured,
  useSaveCallerUserProfile,
} from "@/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { SubscriptionTier } from "@/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  CheckCircle2,
  Crown,
  Headphones,
  ListMusic,
  LogOut,
  Music2,
  Save,
  Shield,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Premium perks ────────────────────────────────────────────────────────────
const PREMIUM_PERKS = [
  { icon: Music2, label: "Full lyrics for every track" },
  { icon: Headphones, label: "High-quality audio streaming" },
  { icon: ListMusic, label: "Unlimited playlists" },
  { icon: Zap, label: "Ad-free listening experience" },
  { icon: Shield, label: "Exclusive early-access features" },
];

// ─── Stripe Return Banner ─────────────────────────────────────────────────────
function StripeReturnBanner() {
  const search = useSearch({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();
  const sessionId = search.session_id ?? null;
  const cancelled = search.cancelled === "true";

  const statusQuery = useGetStripeSessionStatus(sessionId);

  function dismiss() {
    navigate({ to: "/account", replace: true } as Parameters<
      typeof navigate
    >[0]);
  }

  useEffect(() => {
    if (!sessionId && !cancelled) return;
    const t = setTimeout(dismiss, 10000);
    return () => clearTimeout(t);
  });

  if (!sessionId && !cancelled) return null;

  if (cancelled) {
    return (
      <div
        data-ocid="account.cancel_state"
        className="flex items-center justify-between gap-3 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3"
      >
        <p className="text-sm text-destructive">
          Checkout was cancelled — no charges were made.
        </p>
        <button
          type="button"
          data-ocid="account.close_button"
          onClick={dismiss}
          className="text-destructive hover:text-destructive/70 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const statusData = statusQuery.data as { status: string } | null | undefined;
  const isSuccess =
    statusData?.status === "complete" || statusData?.status === "paid";

  return (
    <div
      data-ocid="account.success_state"
      className="flex items-center justify-between gap-3 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3"
    >
      <div className="flex items-center gap-3">
        {statusQuery.isLoading ? (
          <div className="h-4 w-4 shrink-0 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
        ) : isSuccess ? (
          <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
        ) : (
          <div className="h-4 w-4 shrink-0 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
        )}
        <p className="text-sm text-foreground">
          {statusQuery.isLoading
            ? "Confirming your upgrade…"
            : isSuccess
              ? "🎉 Welcome to Premium! Your account has been upgraded."
              : "Processing payment — this may take a moment."}
        </p>
      </div>
      <button
        type="button"
        data-ocid="account.close_button"
        onClick={dismiss}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// ─── Profile Section ──────────────────────────────────────────────────────────
function ProfileSection() {
  const { profile, profileLoading, isPremium, principalText, logout } =
    useAuth();
  const saveProfile = useSaveCallerUserProfile();
  const [editName, setEditName] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (profile?.name) setEditName(profile.name);
  }, [profile?.name]);

  const displayName = profile?.name ?? "Listener";
  const initials = displayName.slice(0, 2).toUpperCase();

  async function handleSave() {
    if (!editName.trim()) return;
    try {
      await saveProfile.mutateAsync(editName.trim());
      setEditing(false);
      toast.success("Profile saved!");
    } catch {
      toast.error("Failed to save profile.");
    }
  }

  function startEdit() {
    setEditName(profile?.name ?? "");
    setEditing(true);
  }

  function cancelEdit() {
    setEditName(profile?.name ?? "");
    setEditing(false);
  }

  return (
    <Card data-ocid="account.profile_section" className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-display">Profile</CardTitle>
        <CardDescription>Your identity on SoundWave</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Avatar row */}
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 ring-2 ring-primary/30">
            <AvatarFallback className="bg-primary/20 text-primary font-display font-bold text-lg">
              {profileLoading ? "…" : initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            {profileLoading ? (
              <>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-20" />
              </>
            ) : (
              <>
                <p className="font-display font-semibold text-foreground truncate">
                  {displayName}
                </p>
                {isPremium ? (
                  <Badge
                    data-ocid="account.tier_badge"
                    variant="outline"
                    className="mt-1 bg-primary/15 text-primary border-primary/40 gap-1"
                  >
                    <Crown className="h-3 w-3" />
                    Premium
                  </Badge>
                ) : (
                  <Badge
                    data-ocid="account.tier_badge"
                    variant="secondary"
                    className="mt-1"
                  >
                    Free
                  </Badge>
                )}
              </>
            )}
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Display name field */}
        <div className="space-y-2">
          <Label
            htmlFor="display-name"
            className="text-xs text-muted-foreground uppercase tracking-wider"
          >
            Display Name
          </Label>
          {editing ? (
            <div className="flex gap-2">
              <Input
                id="display-name"
                data-ocid="account.name_input"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") cancelEdit();
                }}
                className="bg-input border-border"
                maxLength={64}
                autoFocus
              />
              <Button
                data-ocid="account.save_button"
                size="sm"
                onClick={handleSave}
                disabled={saveProfile.isPending || !editName.trim()}
              >
                <Save className="h-4 w-4 mr-1" />
                {saveProfile.isPending ? "Saving…" : "Save"}
              </Button>
              <Button
                data-ocid="account.cancel_button"
                size="sm"
                variant="ghost"
                onClick={cancelEdit}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-foreground">
                {profileLoading ? (
                  <Skeleton className="h-4 w-28 inline-block" />
                ) : (
                  (profile?.name ?? (
                    <span className="text-muted-foreground italic">
                      Not set
                    </span>
                  ))
                )}
              </span>
              <Button
                data-ocid="account.edit_button"
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                onClick={startEdit}
              >
                Edit
              </Button>
            </div>
          )}
        </div>

        {/* Principal */}
        {principalText && (
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
              Internet Identity
            </Label>
            <p className="text-xs font-mono text-muted-foreground break-all leading-relaxed bg-muted/50 rounded-lg px-3 py-2">
              {principalText}
            </p>
          </div>
        )}

        <Separator className="bg-border/50" />

        {/* Logout */}
        <Button
          data-ocid="account.logout_button"
          variant="ghost"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Premium Active ───────────────────────────────────────────────────────────
function PremiumActivePanel() {
  return (
    <div
      data-ocid="account.premium_panel"
      className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/15 via-accent/8 to-transparent p-5 space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <Crown className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-display font-bold text-foreground">
            Premium Active
          </p>
          <p className="text-xs text-muted-foreground">
            Full access to every SoundWave feature
          </p>
        </div>
      </div>

      <Separator className="bg-border/30" />

      <ul className="space-y-2.5">
        {PREMIUM_PERKS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 text-sm">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
            <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="text-foreground">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Free Upgrade Panel ───────────────────────────────────────────────────────
interface FreeUpgradePanelProps {
  onUpgrade: () => void;
  isLoading: boolean;
  stripeAvailable: boolean;
}

function FreeUpgradePanel({
  onUpgrade,
  isLoading,
  stripeAvailable,
}: FreeUpgradePanelProps) {
  return (
    <div
      data-ocid="account.upgrade_panel"
      className="rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent p-5 space-y-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <p className="font-display font-bold text-foreground">Go Premium</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Unlock the full SoundWave experience.
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-accent/50 text-accent bg-accent/10 shrink-0"
        >
          $9.99 / mo
        </Badge>
      </div>

      <ul className="space-y-2.5">
        {PREMIUM_PERKS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 text-sm">
            <CheckCircle2 className="h-4 w-4 text-accent/70 shrink-0" />
            <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">{label}</span>
          </li>
        ))}
      </ul>

      <Separator className="bg-border/30" />

      {stripeAvailable ? (
        <Button
          data-ocid="account.upgrade_button"
          className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-card font-semibold"
          onClick={onUpgrade}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-card/40 border-t-card rounded-full animate-spin" />
              Redirecting to Checkout…
            </>
          ) : (
            <>
              <Crown className="h-4 w-4" />
              Upgrade to Premium
            </>
          )}
        </Button>
      ) : (
        <p
          data-ocid="account.stripe_unavailable"
          className="text-center text-sm text-muted-foreground py-1"
        >
          Payment setup pending — check back soon.
        </p>
      )}
    </div>
  );
}

// ─── Subscription Section ─────────────────────────────────────────────────────
function SubscriptionSection() {
  const tierQuery = useGetUserTier();
  const profileQuery = useGetCallerUserProfile();
  const stripeConfigured = useIsStripeConfigured();
  const createSession = useCreateCheckoutSession();

  const tierValue = tierQuery.data as unknown as string | undefined;
  const profileTier = profileQuery.data?.tier as unknown as string | undefined;
  const isPremium =
    tierValue === SubscriptionTier.premium ||
    tierValue === "premium" ||
    profileTier === "premium";

  async function handleUpgrade() {
    const base = `${window.location.origin}/account`;
    try {
      const url = await createSession.mutateAsync({
        successUrl: `${base}?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${base}?cancelled=true`,
      });
      if (url && typeof url === "string") {
        window.location.href = url;
      } else {
        toast.error("Could not start checkout. Please try again.");
      }
    } catch {
      toast.error("Checkout failed. Please try again.");
    }
  }

  return (
    <Card
      data-ocid="account.subscription_section"
      className="bg-card border-border"
    >
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Crown className="h-5 w-5 text-accent" />
          Subscription
        </CardTitle>
        <CardDescription>
          {tierQuery.isLoading
            ? "Loading subscription info…"
            : isPremium
              ? "You're enjoying all Premium benefits"
              : "Upgrade to unlock the full SoundWave experience"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {tierQuery.isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        ) : isPremium ? (
          <PremiumActivePanel />
        ) : (
          <FreeUpgradePanel
            onUpgrade={handleUpgrade}
            isLoading={createSession.isPending}
            stripeAvailable={stripeConfigured.data ?? false}
          />
        )}
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AccountPage() {
  return (
    <div
      data-ocid="account.page"
      className="min-h-full bg-background px-6 py-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground tracking-tight">
          Account
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your profile and subscription
        </p>
      </div>

      <div className="max-w-2xl space-y-5">
        <StripeReturnBanner />
        <ProfileSection />
        <SubscriptionSection />
      </div>
    </div>
  );
}
