import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, ListMusic, Music2, Shield, User, Zap } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/browse", label: "Browse", icon: Music2, exact: false },
  { to: "/playlists", label: "Playlists", icon: ListMusic, exact: false },
  { to: "/account", label: "Account", icon: User, exact: false },
];

interface SidebarProps {
  onNavigate: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const { isAdmin, isPremium, isAuthenticated } = useAuth();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const isActive = (to: string, exact: boolean) => {
    if (exact) return pathname === to;
    return pathname.startsWith(to);
  };

  return (
    <aside
      className="flex flex-col w-60 shrink-0 bg-[oklch(var(--sidebar))] border-r border-sidebar-border h-full"
      data-ocid="sidebar"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-brand glow-primary">
          <Music2 className="w-4 h-4 text-primary" />
        </div>
        <span className="font-display font-bold text-lg tracking-tight text-foreground">
          Musi<span className="text-gradient">ex</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Main navigation">
        {navItems.map(({ to, label, icon: Icon, exact }) => (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            data-ocid={`sidebar.${label.toLowerCase().replace(/\s+/g, "_")}.link`}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth group min-h-[44px]",
              isActive(to, exact)
                ? "bg-primary/15 text-primary glow-subtle"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon
              className={cn(
                "w-4.5 h-4.5 shrink-0 transition-smooth",
                isActive(to, exact)
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-sidebar-accent-foreground",
              )}
              size={18}
            />
            {label}
            {label === "Account" && isAuthenticated && isPremium && (
              <Badge
                variant="outline"
                className="ml-auto text-[10px] py-0 px-1.5 border-primary/40 text-primary bg-primary/10"
              >
                PRO
              </Badge>
            )}
          </Link>
        ))}

        {/* Admin link */}
        {isAdmin && (
          <Link
            to="/admin"
            onClick={onNavigate}
            data-ocid="sidebar.admin.link"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth group min-h-[44px]",
              isActive("/admin", false)
                ? "bg-accent/15 text-accent glow-accent"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <Shield size={18} className="shrink-0" />
            Admin
          </Link>
        )}
      </nav>

      {/* Upgrade CTA (free users) */}
      {isAuthenticated && !isPremium && (
        <div className="mx-3 mb-4 p-3.5 rounded-xl bg-gradient-brand border border-primary/20">
          <div className="flex items-center gap-2 mb-1.5">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold font-display text-foreground">
              Go Premium
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
            Unlock unlimited lyrics, high-quality audio, and more.
          </p>
          <Link
            to="/account"
            onClick={onNavigate}
            data-ocid="sidebar.upgrade_button"
            className="block text-center text-xs font-semibold py-1.5 px-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-smooth glow-primary min-h-[36px] flex items-center justify-center"
          >
            Upgrade Now
          </Link>
        </div>
      )}

      {/* Version */}
      <div className="px-5 py-3 border-t border-sidebar-border">
        <p className="text-[10px] text-muted-foreground/50">Musiex v1.0</p>
      </div>
    </aside>
  );
}
