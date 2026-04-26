import { Badge } from "@/components/ui/badge";
import { useLyricsModal } from "@/hooks/useLyricsModal";
import { usePlayer } from "@/hooks/usePlayer";
import { Music, Pause, Play } from "lucide-react";
import { motion } from "motion/react";
import type { SongPublic } from "../backend.d";

interface SongCardProps {
  song: SongPublic;
  queue?: SongPublic[];
  index?: number;
  /** "grid" = album-art card; "row" = compact horizontal list item */
  variant?: "grid" | "row";
}

export function formatDuration(secs: bigint | number): string {
  const total = typeof secs === "bigint" ? Number(secs) : secs;
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function CoverArt({ src, alt }: { src: string; alt: string }) {
  if (!src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <Music className="w-8 h-8 text-muted-foreground" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src =
          "/assets/images/placeholder.svg";
      }}
    />
  );
}

export function SongCard({
  song,
  queue,
  index = 0,
  variant = "grid",
}: SongCardProps) {
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();
  const { openSong } = useLyricsModal();
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(song, queue ?? [song]);
    }
  };

  const handleOpenLyrics = () => {
    openSong(song);
  };

  // ── Row variant ────────────────────────────────────────────────────────────
  if (variant === "row") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.04, duration: 0.3 }}
        className="group"
        data-ocid={`song.item.${index + 1}`}
      >
        <button
          type="button"
          onClick={handleOpenLyrics}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-card transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer min-h-[56px] text-left"
        >
          {/* Track number / now-playing indicator */}
          <div className="w-6 text-center shrink-0">
            {isCurrentSong && isPlaying ? (
              <div className="now-playing-bars flex items-end justify-center gap-[2px] h-4">
                <span />
                <span />
                <span />
              </div>
            ) : (
              <span className="text-xs text-muted-foreground tabular-nums group-hover:hidden">
                {index + 1}
              </span>
            )}
          </div>

          {/* Album art */}
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
            <CoverArt src={song.coverArtUrl} alt={song.title} />
            {isCurrentSong && (
              <div className="absolute inset-0 bg-background/20" />
            )}
          </div>

          {/* Title + Artist */}
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-medium truncate ${isCurrentSong ? "text-primary" : "text-foreground"}`}
            >
              {song.title}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {song.artist}
            </p>
          </div>

          {/* Album (hidden on small screens) */}
          <p className="hidden md:block text-xs text-muted-foreground truncate max-w-[140px]">
            {song.album}
          </p>

          {/* Duration */}
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">
            {formatDuration(song.duration)}
          </span>

          {/* Play/Pause button */}
          <button
            type="button"
            onClick={handlePlay}
            aria-label={
              isCurrentSong && isPlaying
                ? `Pause ${song.title}`
                : `Play ${song.title}`
            }
            className={`ml-1 w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-smooth ${
              isCurrentSong
                ? "bg-primary text-primary-foreground opacity-100"
                : "bg-muted text-foreground opacity-0 group-hover:opacity-100"
            }`}
            data-ocid={`song.play_button.${index + 1}`}
          >
            {isCurrentSong && isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 translate-x-[1px]" />
            )}
          </button>
        </button>
      </motion.div>
    );
  }

  // ── Grid card (default) ────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="group relative"
      data-ocid={`song.item.${index + 1}`}
    >
      <button
        type="button"
        onClick={handleOpenLyrics}
        className="w-full rounded-2xl bg-card border border-border hover:border-primary/30 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring overflow-hidden cursor-pointer text-left"
      >
        {/* Album Art */}
        <div className="relative aspect-square overflow-hidden">
          <CoverArt src={song.coverArtUrl} alt={song.title} />

          {/* Hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />

          {/* Active ring */}
          {isCurrentSong && (
            <div className="absolute inset-0 ring-2 ring-inset ring-primary/60" />
          )}

          {/* Play/Pause overlay button */}
          <button
            type="button"
            onClick={handlePlay}
            aria-label={
              isCurrentSong && isPlaying
                ? `Pause ${song.title}`
                : `Play ${song.title}`
            }
            className={`absolute bottom-3 right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-smooth
              ${
                isCurrentSong
                  ? "bg-primary text-primary-foreground opacity-100 glow-primary scale-100"
                  : "bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
              }`}
            data-ocid={`song.play_button.${index + 1}`}
          >
            {isCurrentSong && isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 translate-x-[1px]" />
            )}
          </button>

          {/* Now playing badge */}
          {isCurrentSong && (
            <div className="absolute top-2 left-2">
              <Badge
                variant="default"
                className="bg-primary/90 text-primary-foreground text-[10px] px-1.5 py-0.5 flex items-center gap-1"
              >
                <div className="now-playing-bars flex items-end gap-[2px] h-2.5">
                  <span className="!h-2" />
                  <span className="!h-3" />
                  <span className="!h-1.5" />
                </div>
                Playing
              </Badge>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="p-3 space-y-0.5">
          <p
            className={`text-sm font-display font-semibold truncate leading-tight ${isCurrentSong ? "text-primary" : "text-foreground"}`}
          >
            {song.title}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {song.artist}
          </p>
          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-muted-foreground/70 truncate max-w-[70%]">
              {song.album}
            </p>
            <span className="text-xs text-muted-foreground tabular-nums">
              {formatDuration(song.duration)}
            </span>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
