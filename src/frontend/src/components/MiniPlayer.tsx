import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/hooks/usePlayer";
import { cn } from "@/lib/utils";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

function formatTime(secs: number): string {
  if (!secs || Number.isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MiniPlayer() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
  } = usePlayer();

  if (!currentSong) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    seek(pct * duration);
  };

  const handleProgressKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") seek(Math.min(duration, currentTime + 5));
    if (e.key === "ArrowLeft") seek(Math.max(0, currentTime - 5));
  };

  return (
    <div
      data-ocid="mini_player"
      className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 shadow-subtle animate-slide-up"
    >
      {/* Progress bar — full width, thin, clickable */}
      <div
        role="slider"
        aria-label="Song progress"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
        tabIndex={0}
        className="w-full h-1.5 bg-muted/50 cursor-pointer group/progress"
        onClick={handleProgressClick}
        onKeyDown={handleProgressKeyDown}
        data-ocid="mini_player.progress_bar"
      >
        <div
          className="h-full bg-primary transition-all duration-100 group-hover/progress:bg-primary/80 relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-subtle" />
        </div>
      </div>

      <div className="flex items-center h-[4.5rem] md:h-16 px-3 md:px-4 gap-2 md:gap-4">
        {/* Album art + info */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0 md:w-64 md:flex-none md:shrink-0">
          <div className="relative shrink-0">
            <img
              src={currentSong.coverArtUrl || "/assets/images/placeholder.svg"}
              alt={currentSong.album}
              className={cn(
                "w-11 h-11 rounded-lg object-cover shadow-subtle",
                isPlaying && "ring-1 ring-primary/50",
              )}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/images/placeholder.svg";
              }}
            />
            {isPlaying && (
              <div className="absolute inset-0 rounded-lg bg-primary/10 flex items-center justify-center">
                <div className="now-playing-bars flex gap-0.5">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold font-display text-foreground truncate leading-tight">
              {currentSong.title}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentSong.artist}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-1 md:gap-5 shrink-0">
          <button
            type="button"
            onClick={prev}
            data-ocid="mini_player.prev_button"
            aria-label="Previous"
            className="w-11 h-11 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-smooth hover:bg-muted active:scale-95"
          >
            <SkipBack size={20} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            data-ocid="mini_player.play_pause_button"
            aria-label={isPlaying ? "Pause" : "Play"}
            className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-smooth glow-primary hover:scale-105 active:scale-95 shadow-subtle"
          >
            {isPlaying ? (
              <Pause size={18} />
            ) : (
              <Play size={18} className="ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={next}
            data-ocid="mini_player.next_button"
            aria-label="Next"
            className="w-11 h-11 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-smooth hover:bg-muted active:scale-95"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Time + Volume — hidden on mobile */}
        <div className="hidden md:flex items-center gap-3 w-56 shrink-0 justify-end">
          <span className="text-xs text-muted-foreground tabular-nums">
            {formatTime(currentTime)}
            <span className="mx-1 opacity-40">/</span>
            {formatTime(duration)}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
              aria-label={volume > 0 ? "Mute" : "Unmute"}
              data-ocid="mini_player.volume_toggle"
              className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-smooth"
            >
              {volume > 0 ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <div className="w-20">
              <Slider
                value={[volume * 100]}
                min={0}
                max={100}
                step={1}
                onValueChange={([val]) => setVolume(val / 100)}
                className="cursor-pointer"
                aria-label="Volume"
              />
            </div>
          </div>
        </div>

        {/* Mobile: show time only */}
        <div className="flex md:hidden items-center shrink-0">
          <span className="text-xs text-muted-foreground tabular-nums">
            {formatTime(currentTime)}
          </span>
        </div>
      </div>
    </div>
  );
}
