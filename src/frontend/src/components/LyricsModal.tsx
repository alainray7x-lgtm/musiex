import { useGetSong } from "@/api";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLyricsModal } from "@/hooks/useLyricsModal";
import { usePlayer } from "@/hooks/usePlayer";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Pause, Play, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect } from "react";

function LyricsContent({
  lyrics,
  isPremium,
}: { lyrics: string; isPremium: boolean }) {
  if (!lyrics) {
    return (
      <p className="text-muted-foreground text-sm italic text-center py-8">
        No lyrics available for this track.
      </p>
    );
  }

  if (!isPremium) {
    const lines = lyrics.split("\n").filter(Boolean);
    const preview = lines.slice(0, 4).join("\n");
    return (
      <div className="space-y-6">
        <div className="relative">
          <p className="whitespace-pre-line text-foreground/90 leading-relaxed text-base">
            {preview}
          </p>
          {/* Fade-out gradient over last lines */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        </div>
        {/* Upgrade CTA */}
        <div
          className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6 text-center space-y-3"
          data-ocid="lyrics_modal.upgrade_cta"
        >
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-foreground">
              Unlock Full Lyrics
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Upgrade to Musiex Premium to read full lyrics, skip unlimited songs,
            and more.
          </p>
          <Link to="/account" data-ocid="lyrics_modal.upgrade_button">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-subtle gap-2 min-h-[44px]">
              <Zap className="w-4 h-4" />
              Go Premium
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <p className="whitespace-pre-line text-foreground/90 leading-relaxed text-base tracking-wide">
      {lyrics}
    </p>
  );
}

export function LyricsModal() {
  const { song, open, close } = useLyricsModal();
  const { isPremium } = useAuth();
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();

  const songId = song ? song.id : null;
  const { data: fullSong, isLoading } = useGetSong(songId);
  const displaySong = fullSong ?? song;

  const isCurrentSong = currentSong?.id === song?.id;

  const handlePlay = useCallback(() => {
    if (!song) return;
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(song, [song]);
    }
  }, [song, isCurrentSong, togglePlay, playSong]);

  // Dismiss on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && song && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Modal sheet */}
          <motion.dialog
            key="modal"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            open
            aria-label={`Lyrics for ${song.title}`}
            data-ocid="lyrics_modal.dialog"
            className="fixed inset-x-0 bottom-0 z-[70] md:inset-x-auto md:right-4 md:bottom-4 md:left-auto md:w-[420px] md:top-4 m-0 p-0 flex flex-col rounded-t-3xl md:rounded-2xl bg-card border border-border shadow-2xl overflow-hidden max-h-[92vh] md:max-h-none"
            style={{ maxHeight: "calc(100dvh - 2rem)" }}
          >
            {/* Cover art header */}
            <div className="relative shrink-0">
              <div className="aspect-square w-full md:h-56 md:aspect-auto overflow-hidden">
                {displaySong?.coverArtUrl ? (
                  <img
                    src={displaySong.coverArtUrl}
                    alt={displaySong.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/assets/images/placeholder.svg";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                )}
              </div>

              {/* Dark gradient overlay on art */}
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />

              {/* Close button */}
              <button
                type="button"
                onClick={close}
                aria-label="Close lyrics"
                data-ocid="lyrics_modal.close_button"
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/80 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Play/Pause overlay on cover */}
              <button
                type="button"
                onClick={handlePlay}
                aria-label={isCurrentSong && isPlaying ? "Pause" : "Play"}
                data-ocid="lyrics_modal.play_pause_button"
                className={cn(
                  "absolute bottom-4 right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-smooth glow-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95",
                )}
              >
                {isCurrentSong && isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 translate-x-[2px]" />
                )}
              </button>

              {/* Song title + artist at bottom of art */}
              <div className="absolute bottom-4 left-4 pr-20">
                <p className="text-xs font-medium text-primary uppercase tracking-widest mb-0.5">
                  Lyrics
                </p>
                <h2 className="text-lg font-display font-bold text-foreground leading-tight truncate">
                  {displaySong?.title ?? song.title}
                </h2>
                <p className="text-sm text-muted-foreground truncate">
                  {displaySong?.artist ?? song.artist}
                  {displaySong?.album ? ` · ${displaySong.album}` : ""}
                </p>
              </div>
            </div>

            {/* Lyrics body — scrollable */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 space-y-4">
              {isLoading ? (
                <div
                  className="space-y-3 animate-pulse"
                  data-ocid="lyrics_modal.loading_state"
                >
                  {[80, 60, 90, 50, 70, 40, 85, 55].map((w) => (
                    <div
                      key={`skel-${w}`}
                      className="h-4 rounded bg-muted"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              ) : (
                <LyricsContent
                  lyrics={displaySong?.lyrics ?? ""}
                  isPremium={isPremium}
                />
              )}
            </div>
          </motion.dialog>
        </>
      )}
    </AnimatePresence>
  );
}
