import {
  useAddSongToPlaylist,
  useGetPlaylist,
  useListSongs,
  useRemoveSongFromPlaylist,
  useUpdatePlaylist,
} from "@/api";
import type { SongPublic } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { usePlayer } from "@/hooks/usePlayer";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clock,
  ListMusic,
  Pencil,
  Play,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatDuration(secs: bigint | number): string {
  const s = Number(secs);
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
}

function formatTotalDuration(songs: SongPublic[]): string {
  const total = songs.reduce((sum, s) => sum + Number(s.duration), 0);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export default function PlaylistDetailPage() {
  const { id } = useParams({ from: "/playlists/$id" });
  const playlistId = BigInt(id);

  const { data: playlist, isLoading } = useGetPlaylist(playlistId);
  const { data: allSongs = [] } = useListSongs();
  const addSong = useAddSongToPlaylist();
  const removeSong = useRemoveSongFromPlaylist();
  const updatePlaylist = useUpdatePlaylist();
  const { playQueue } = usePlayer();

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [addSearch, setAddSearch] = useState("");

  const openEdit = () => {
    if (!playlist) return;
    setEditName(playlist.name);
    setEditDesc(playlist.description ?? "");
    setEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editName.trim()) return;
    updatePlaylist.mutate(
      {
        id: playlistId,
        input: { name: editName.trim(), description: editDesc.trim() },
      },
      {
        onSuccess: () => {
          toast.success("Playlist updated");
          setEditOpen(false);
        },
        onError: () => toast.error("Failed to update playlist"),
      },
    );
  };

  if (isLoading) {
    return (
      <div className="px-6 py-8 space-y-6">
        <Skeleton className="h-5 w-32" />
        <div className="flex items-start gap-6 mt-4">
          <Skeleton className="w-36 h-36 rounded-2xl shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-9 w-24 rounded-lg" />
              <Skeleton className="h-9 w-28 rounded-lg" />
            </div>
          </div>
        </div>
        <div className="space-y-2 mt-8">
          {["a", "b", "c", "d"].map((k) => (
            <div key={k} className="flex items-center gap-4 p-3">
              <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-3 w-10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center">
          <ListMusic className="w-8 h-8 text-primary/60" />
        </div>
        <h2 className="text-xl font-display font-semibold">
          Playlist not found
        </h2>
        <Link to="/playlists" className="text-primary hover:underline text-sm">
          ← Back to playlists
        </Link>
      </div>
    );
  }

  const playlistSongs = playlist.songIds
    .map((sid) => allSongs.find((s) => s.id === sid))
    .filter((s): s is SongPublic => !!s);

  const coverArt =
    playlistSongs.length > 0 ? playlistSongs[0].coverArtUrl : null;

  const filteredAvailableToAdd = allSongs.filter(
    (s) =>
      !playlist.songIds.includes(s.id) &&
      (addSearch === "" ||
        s.title.toLowerCase().includes(addSearch.toLowerCase()) ||
        s.artist.toLowerCase().includes(addSearch.toLowerCase())),
  );

  const handleRemove = (songId: bigint) => {
    removeSong.mutate(
      { playlistId, songId },
      {
        onSuccess: () => toast.success("Song removed"),
        onError: () => toast.error("Failed to remove song"),
      },
    );
  };

  const handleAdd = (songId: bigint) => {
    addSong.mutate(
      { playlistId, songId },
      {
        onSuccess: () => toast.success("Song added to playlist"),
        onError: () => toast.error("Failed to add song"),
      },
    );
  };

  return (
    <div className="px-6 py-8" data-ocid="playlist_detail.page">
      {/* Back */}
      <Link
        to="/playlists"
        data-ocid="playlist_detail.back_link"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6"
      >
        <ArrowLeft size={15} />
        Back to Playlists
      </Link>

      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        {/* Cover art */}
        <div className="w-36 h-36 rounded-2xl shrink-0 overflow-hidden relative bg-gradient-to-br from-muted to-card">
          {coverArt ? (
            <img
              src={coverArt}
              alt={playlist.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-brand flex items-center justify-center">
              <ListMusic className="w-14 h-14 text-primary/60" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <Badge
            variant="secondary"
            className="mb-2 text-xs uppercase tracking-wider bg-muted text-muted-foreground"
          >
            Playlist
          </Badge>
          <div className="flex items-start gap-2">
            <h1 className="text-3xl font-display font-bold text-foreground truncate flex-1 min-w-0">
              {playlist.name}
            </h1>
            <button
              type="button"
              onClick={openEdit}
              data-ocid="playlist_detail.edit_button"
              aria-label="Edit playlist"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth shrink-0 mt-1"
            >
              <Pencil size={15} />
            </button>
          </div>
          {playlist.description && (
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              {playlist.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <span>
              {playlistSongs.length}{" "}
              {playlistSongs.length === 1 ? "song" : "songs"}
            </span>
            {playlistSongs.length > 0 && (
              <>
                <span className="text-border">·</span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {formatTotalDuration(playlistSongs)}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            {playlistSongs.length > 0 && (
              <Button
                onClick={() => playQueue(playlistSongs)}
                data-ocid="playlist_detail.play_button"
                className="gap-2 glow-primary"
              >
                <Play size={14} className="fill-current" />
                Play All
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => {
                setAddSearch("");
                setAddOpen(true);
              }}
              data-ocid="playlist_detail.add_song_button"
              className="gap-2 border-border/50 hover:border-primary/30"
            >
              <Plus size={14} />
              Add Songs
            </Button>
          </div>
        </div>
      </div>

      {/* Songs list */}
      {playlistSongs.length === 0 ? (
        <div
          data-ocid="playlist_detail.empty_state"
          className="text-center py-16 animate-fade-in"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto mb-4">
            <ListMusic className="w-8 h-8 text-primary/60" />
          </div>
          <h3 className="font-display font-semibold text-foreground text-lg">
            No songs yet
          </h3>
          <p className="text-muted-foreground text-sm mt-2 max-w-xs mx-auto">
            Add songs from the library to get your playlist started.
          </p>
          <Button
            className="mt-4 gap-2"
            variant="outline"
            data-ocid="playlist_detail.empty_add_button"
            onClick={() => {
              setAddSearch("");
              setAddOpen(true);
            }}
          >
            <Plus size={14} />
            Add Songs
          </Button>
        </div>
      ) : (
        <div
          className="bg-card/30 rounded-2xl border border-border/30 overflow-hidden animate-fade-in"
          data-ocid="playlist_detail.song_list"
        >
          {/* Table header */}
          <div className="flex items-center gap-4 px-4 py-2.5 border-b border-border/30 text-xs text-muted-foreground font-medium">
            <span className="w-6 text-center shrink-0">#</span>
            <span className="w-10 shrink-0" aria-hidden />
            <span className="flex-1">Title</span>
            <span className="hidden sm:block w-32 text-muted-foreground/60">
              Artist
            </span>
            <span className="w-14 text-right flex items-center justify-end gap-1 shrink-0">
              <Clock size={11} />
            </span>
            <span className="w-8 shrink-0" aria-hidden />
          </div>
          <div className="p-2">
            {playlistSongs.map((song, i) => (
              <PlaylistSongRow
                key={song.id.toString()}
                song={song}
                index={i}
                queue={playlistSongs}
                onRemove={() => handleRemove(song.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent data-ocid="playlist_detail.edit_dialog">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Playlist</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label
                htmlFor="edit-name"
                className="text-sm font-medium text-foreground"
              >
                Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit();
                }}
                data-ocid="playlist_detail.edit_name_input"
                className="bg-muted border-border/50"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="edit-desc"
                className="text-sm font-medium text-foreground"
              >
                Description
              </label>
              <Textarea
                id="edit-desc"
                placeholder="What's this playlist about?"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                data-ocid="playlist_detail.edit_description_input"
                className="bg-muted border-border/50 resize-none"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setEditOpen(false)}
              data-ocid="playlist_detail.edit_cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={!editName.trim() || updatePlaylist.isPending}
              data-ocid="playlist_detail.edit_save_button"
              className="glow-primary"
            >
              {updatePlaylist.isPending ? "Saving…" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add songs dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent
          data-ocid="playlist_detail.add_dialog"
          className="max-w-lg"
        >
          <DialogHeader>
            <DialogTitle className="font-display">Add Songs</DialogTitle>
          </DialogHeader>
          <div className="pt-1 pb-2">
            <Input
              placeholder="Search by title or artist…"
              value={addSearch}
              onChange={(e) => setAddSearch(e.target.value)}
              data-ocid="playlist_detail.add_search_input"
              className="bg-muted border-border/50"
            />
          </div>
          {filteredAvailableToAdd.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">
              {addSearch
                ? "No songs match your search."
                : "All songs are already in this playlist."}
            </p>
          ) : (
            <div className="space-y-0.5 max-h-80 overflow-y-auto">
              {filteredAvailableToAdd.map((song, i) => (
                <div
                  key={song.id.toString()}
                  data-ocid={`playlist_detail.add_song_item.${i + 1}`}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-smooth"
                >
                  <img
                    src={song.coverArtUrl || "/assets/images/placeholder.svg"}
                    alt={song.title}
                    className="w-9 h-9 rounded-lg object-cover shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/images/placeholder.svg";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {song.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {song.artist}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums shrink-0 mr-1">
                    {formatDuration(song.duration)}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAdd(song.id)}
                    data-ocid={`playlist_detail.add_song_confirm.${i + 1}`}
                    className="shrink-0 gap-1 border-border/50 h-7 text-xs hover:border-primary/40"
                  >
                    <Plus size={12} />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PlaylistSongRow({
  song,
  index,
  queue,
  onRemove,
}: {
  song: SongPublic;
  index: number;
  queue: SongPublic[];
  onRemove: () => void;
}) {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const isCurrent = currentSong?.id === song.id;

  return (
    <div
      data-ocid={`playlist_detail.song.${index + 1}`}
      className={`group flex items-center gap-4 px-2 py-2.5 rounded-xl transition-smooth cursor-default ${
        isCurrent ? "bg-primary/10" : "hover:bg-card/60"
      }`}
    >
      {/* Index / play toggle */}
      <button
        type="button"
        onClick={() => playSong(song, queue)}
        aria-label={`Play ${song.title}`}
        className="w-6 text-center shrink-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
      >
        {isCurrent && isPlaying ? (
          <div className="now-playing-bars flex gap-0.5 justify-center">
            <span />
            <span />
            <span />
          </div>
        ) : (
          <>
            <span className="text-sm text-muted-foreground group-hover:hidden tabular-nums select-none">
              {index + 1}
            </span>
            <Play
              size={14}
              className="text-primary hidden group-hover:block mx-auto fill-current"
            />
          </>
        )}
      </button>

      {/* Album art */}
      <img
        src={song.coverArtUrl || "/assets/images/placeholder.svg"}
        alt={song.album}
        className="w-10 h-10 rounded-lg object-cover shrink-0"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/assets/images/placeholder.svg";
        }}
      />

      {/* Title + album */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-semibold truncate ${isCurrent ? "text-primary" : "text-foreground"}`}
        >
          {song.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">{song.album}</p>
      </div>

      {/* Artist (hidden on small screens) */}
      <span className="hidden sm:block text-sm text-muted-foreground truncate w-32 min-w-0">
        {song.artist}
      </span>

      {/* Duration */}
      <span className="text-xs text-muted-foreground tabular-nums w-14 text-right shrink-0">
        {formatDuration(song.duration)}
      </span>

      {/* Remove */}
      <button
        type="button"
        data-ocid={`playlist_detail.remove_button.${index + 1}`}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        aria-label="Remove from playlist"
        className="opacity-0 group-hover:opacity-100 transition-smooth p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive w-8 shrink-0"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
