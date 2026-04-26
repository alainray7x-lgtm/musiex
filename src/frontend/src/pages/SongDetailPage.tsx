import { useAddSongToPlaylist, useGetSong, useListMyPlaylists } from "@/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { usePlayer } from "@/hooks/usePlayer";
import { Link, useParams, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Disc3,
  ListPlus,
  Mic2,
  Music2,
  Pause,
  Play,
  Plus,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Playlist } from "../types";

function formatDuration(secs: bigint | number): string {
  const s = Number(secs);
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
}

const LYRICS_TEASER_CHARS = 150;

// ─── Lyrics Section ──────────────────────────────────────────────────────────
function LyricsSection({
  lyrics,
  isPremium,
}: { lyrics: string; isPremium: boolean }) {
  if (!lyrics) {
    return (
      <p className="text-muted-foreground text-sm italic">
        No lyrics available for this song.
      </p>
    );
  }

  if (isPremium) {
    return (
      <pre className="whitespace-pre-wrap text-sm text-foreground/90 leading-relaxed font-body animate-fade-in">
        {lyrics}
      </pre>
    );
  }

  const teaser = lyrics.slice(0, LYRICS_TEASER_CHARS);
  const hasMore = lyrics.length > LYRICS_TEASER_CHARS;

  return (
    <div data-ocid="song_detail.premium_gate" className="relative">
      {/* Teaser text */}
      <pre className="whitespace-pre-wrap text-sm text-foreground/80 leading-relaxed font-body">
        {teaser}
        {hasMore ? "…" : ""}
      </pre>

      {/* Blurred remainder hint */}
      {hasMore && (
        <div className="relative mt-2 overflow-hidden rounded-lg">
          <pre
            className="whitespace-pre-wrap text-sm leading-relaxed font-body select-none pointer-events-none"
            style={{ filter: "blur(6px)", opacity: 0.5 }}
            aria-hidden="true"
          >
            {lyrics.slice(LYRICS_TEASER_CHARS, LYRICS_TEASER_CHARS + 300)}
          </pre>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/95 rounded-lg" />
        </div>
      )}

      {/* Upgrade CTA */}
      <div className="mt-5 flex flex-col items-center gap-3 rounded-xl border border-accent/25 bg-accent/5 p-5 text-center">
        <div className="flex items-center gap-1.5">
          <Sparkles size={16} className="text-accent" />
          <Badge className="bg-accent/20 text-accent border-accent/30 border text-xs">
            Premium Feature
          </Badge>
        </div>
        <h3 className="font-display font-semibold text-foreground">
          Unlock Full Lyrics
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Upgrade to Premium to read full lyrics for every song in the
          catalogue.
        </p>
        <Link to="/account" data-ocid="song_detail.upgrade_link">
          <Button
            size="sm"
            className="glow-accent bg-accent text-accent-foreground hover:opacity-90 gap-1.5 mt-1"
          >
            <Sparkles size={13} />
            Upgrade to Premium
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ─── Add to Playlist Dialog ───────────────────────────────────────────────────
function AddToPlaylistDialog({
  open,
  onClose,
  songId,
}: {
  open: boolean;
  onClose: () => void;
  songId: bigint;
}) {
  const { data: playlists = [], isLoading } = useListMyPlaylists();
  const addMutation = useAddSongToPlaylist();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const handleAdd = (playlist: Playlist) => {
    const key = playlist.id.toString();
    if (addedIds.has(key)) return;
    addMutation.mutate(
      { playlistId: playlist.id, songId },
      {
        onSuccess: () => {
          setAddedIds((prev) => new Set(prev).add(key));
          toast.success(`Added to "${playlist.name}"`);
        },
        onError: () => {
          toast.error("Could not add to playlist. Try again.");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="song_detail.add_to_playlist_dialog"
        className="sm:max-w-sm"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <ListPlus size={18} className="text-primary" />
            Add to Playlist
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-2 py-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : playlists.length === 0 ? (
          <div
            data-ocid="song_detail.playlists_empty_state"
            className="py-8 flex flex-col items-center gap-3 text-center"
          >
            <Music2 size={32} className="text-muted-foreground/30" />
            <p className="text-muted-foreground text-sm">
              You have no playlists yet.
            </p>
            <Link to="/playlists" onClick={onClose}>
              <Button size="sm" variant="outline" className="gap-1.5">
                <Plus size={13} />
                Create a Playlist
              </Button>
            </Link>
          </div>
        ) : (
          <ul
            data-ocid="song_detail.playlists_list"
            className="space-y-1.5 max-h-72 overflow-y-auto pr-1"
          >
            {playlists.map((pl, idx) => {
              const key = pl.id.toString();
              const added = addedIds.has(key);
              const isPending =
                addMutation.isPending &&
                addMutation.variables?.playlistId === pl.id;
              return (
                <li
                  key={key}
                  data-ocid={`song_detail.playlist_item.${idx + 1}`}
                >
                  <button
                    type="button"
                    onClick={() => handleAdd(pl)}
                    disabled={added || isPending}
                    className="w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left
                      hover:bg-muted/60 transition-smooth focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {pl.name}
                      </p>
                      {pl.description && (
                        <p className="text-xs text-muted-foreground truncate">
                          {pl.description}
                        </p>
                      )}
                    </div>
                    {added ? (
                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-primary"
                      />
                    ) : (
                      <Plus
                        size={16}
                        className="shrink-0 text-muted-foreground"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex justify-end pt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            data-ocid="song_detail.close_button"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SongDetailPage() {
  const { id } = useParams({ from: "/songs/$id" });
  const songId = BigInt(id);
  const router = useRouter();

  const { data: song, isLoading } = useGetSong(songId);
  const { playSong, currentSong, isPlaying, togglePlay, queue } = usePlayer();
  const { isPremium } = useAuth();

  const isCurrent = currentSong?.id === songId;
  const [playlistDialogOpen, setPlaylistDialogOpen] = useState(false);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.history.back();
    } else {
      router.navigate({ to: "/browse" });
    }
  };

  const handlePlay = () => {
    if (isCurrent) {
      togglePlay();
    } else if (song) {
      playSong(song);
    }
  };

  const handleAddToQueue = () => {
    if (!song) return;
    const alreadyInQueue = queue.some((s) => s.id === songId);
    if (alreadyInQueue) {
      toast.info("Song is already in the queue.");
      return;
    }
    // Add to end of current queue via Zustand store
    usePlayer.setState((s) => ({
      queue: [...s.queue, song],
    }));
    toast.success("Added to queue");
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="px-6 py-8 max-w-3xl mx-auto space-y-6 animate-fade-in">
        <Skeleton className="h-6 w-24" />
        <div className="flex flex-col sm:flex-row gap-6 mt-2">
          <Skeleton className="w-52 h-52 rounded-2xl shrink-0" />
          <div className="flex-1 space-y-3 pt-2">
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-9 w-3/4 rounded" />
            <Skeleton className="h-4 w-48 rounded" />
            <Skeleton className="h-4 w-32 rounded" />
            <div className="flex gap-3 pt-2">
              <Skeleton className="h-9 w-28 rounded-lg" />
              <Skeleton className="h-9 w-28 rounded-lg" />
              <Skeleton className="h-9 w-28 rounded-lg" />
            </div>
          </div>
        </div>
        <Skeleton className="h-64 w-full rounded-2xl mt-8" />
      </div>
    );
  }

  // ── Not found ─────────────────────────────────────────────────────────────
  if (!song) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
        <Music2 className="w-14 h-14 text-muted-foreground/20" />
        <h2 className="text-xl font-display font-semibold">Song not found</h2>
        <p className="text-muted-foreground text-sm">
          This song may have been removed or the link is invalid.
        </p>
        <Link to="/browse" className="text-primary hover:underline text-sm">
          ← Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <div
      className="px-6 py-8 max-w-3xl mx-auto animate-slide-up"
      data-ocid="song_detail.page"
    >
      {/* ── Back navigation ─────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={handleGoBack}
        data-ocid="song_detail.back_link"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground
          transition-smooth mb-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      {/* ── Song hero ───────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start gap-7 mb-10">
        {/* Album art */}
        <div className="relative shrink-0 group">
          <img
            src={song.coverArtUrl || "/assets/images/placeholder.svg"}
            alt={`${song.album} cover art`}
            className="w-52 h-52 rounded-2xl object-cover shadow-subtle ring-1 ring-border/30"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          {/* Now playing overlay */}
          {isCurrent && isPlaying && (
            <div className="absolute inset-0 rounded-2xl bg-primary/10 flex items-center justify-center">
              <div className="now-playing-bars flex gap-1">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="flex-1 min-w-0 pt-1">
          <Badge
            variant="outline"
            className="text-xs border-border/40 text-muted-foreground mb-2"
          >
            Song
          </Badge>

          <h1 className="text-3xl font-display font-bold text-foreground tracking-tight leading-tight truncate">
            {song.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Mic2 size={13} className="text-primary/70" />
              <span className="font-medium text-foreground/80">
                {song.artist}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Disc3 size={13} className="text-accent/70" />
              {song.album}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="opacity-40" />
              {formatDuration(song.duration)}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2.5 mt-5">
            {/* Play / Pause */}
            <Button
              onClick={handlePlay}
              data-ocid="song_detail.play_button"
              className="gap-2 glow-primary"
            >
              {isCurrent && isPlaying ? (
                <>
                  <Pause size={14} />
                  Pause
                </>
              ) : (
                <>
                  <Play size={14} className="ml-0.5" />
                  Play Now
                </>
              )}
            </Button>

            {/* Add to Queue */}
            <Button
              variant="outline"
              onClick={handleAddToQueue}
              data-ocid="song_detail.add_to_queue_button"
              className="gap-2"
            >
              <ListPlus size={14} />
              Add to Queue
            </Button>

            {/* Add to Playlist */}
            <Button
              variant="secondary"
              onClick={() => setPlaylistDialogOpen(true)}
              data-ocid="song_detail.add_to_playlist_button"
              className="gap-2"
            >
              <Plus size={14} />
              Add to Playlist
            </Button>
          </div>
        </div>
      </div>

      {/* ── Lyrics section ──────────────────────────────────────────────── */}
      <section
        data-ocid="song_detail.lyrics_section"
        className="bg-card/40 rounded-2xl border border-border/40 p-6"
      >
        <h2 className="text-lg font-display font-semibold text-foreground mb-5 flex items-center gap-2">
          <Music2 size={18} className="text-primary" />
          Lyrics
          {isPremium && (
            <Badge className="ml-1 bg-primary/15 text-primary border-primary/25 border text-xs">
              Premium
            </Badge>
          )}
        </h2>

        <LyricsSection lyrics={song.lyrics} isPremium={isPremium} />
      </section>

      {/* ── Add to Playlist Dialog ──────────────────────────────────────── */}
      <AddToPlaylistDialog
        open={playlistDialogOpen}
        onClose={() => setPlaylistDialogOpen(false)}
        songId={songId}
      />
    </div>
  );
}
