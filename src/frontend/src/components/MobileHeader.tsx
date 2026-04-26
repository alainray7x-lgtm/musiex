import { usePlayer } from "@/hooks/usePlayer";
import { Menu, Music2 } from "lucide-react";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const { currentSong } = usePlayer();

  return (
    <header
      className="md:hidden flex items-center justify-between px-4 h-14 shrink-0 bg-card border-b border-border z-30"
      data-ocid="mobile_header"
    >
      {/* Hamburger */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        data-ocid="mobile_header.menu_button"
        className="w-11 h-11 flex items-center justify-center rounded-xl text-foreground hover:bg-muted transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-brand glow-primary">
          <Music2 className="w-3.5 h-3.5 text-primary" />
        </div>
        <span className="font-display font-bold text-base tracking-tight text-foreground">
          Musi<span className="text-gradient">ex</span>
        </span>
      </div>

      {/* Now playing indicator (right side) */}
      <div className="w-11 h-11 flex items-center justify-center">
        {currentSong && (
          <div className="now-playing-bars flex items-end gap-[2px] h-4">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
    </header>
  );
}
