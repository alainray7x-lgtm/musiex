import {
  useAddSong,
  useDeleteSong,
  useEditSong,
  useIsStripeConfigured,
  useListSongs,
  useSetStripeConfiguration,
} from "@/api";
import type { SongPublic } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import type { SongInput } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { Edit2, Music2, Plus, Settings, Shield, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EMPTY_SONG: SongInput = {
  title: "",
  artist: "",
  album: "",
  duration: BigInt(0),
  coverArtUrl: "",
  audioUrl: "",
  lyrics: "",
};

// ─── Song Form ────────────────────────────────────────────────────────────────

function SongForm({
  initial,
  onSave,
  onCancel,
  isPending,
}: {
  initial: SongInput;
  onSave: (v: SongInput) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState(initial);
  const set = (k: keyof SongInput, v: string | bigint) =>
    setForm((f) => ({ ...f, [k]: v }));

  const valid = form.title && form.artist && form.audioUrl;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label
            htmlFor="sf-title"
            className="text-xs font-medium text-muted-foreground"
          >
            Title *
          </label>
          <Input
            id="sf-title"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Song title"
            className="bg-muted border-border/50"
            data-ocid="admin.song_form.title_input"
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="sf-artist"
            className="text-xs font-medium text-muted-foreground"
          >
            Artist *
          </label>
          <Input
            id="sf-artist"
            value={form.artist}
            onChange={(e) => set("artist", e.target.value)}
            placeholder="Artist name"
            className="bg-muted border-border/50"
            data-ocid="admin.song_form.artist_input"
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="sf-album"
            className="text-xs font-medium text-muted-foreground"
          >
            Album
          </label>
          <Input
            id="sf-album"
            value={form.album}
            onChange={(e) => set("album", e.target.value)}
            placeholder="Album name"
            className="bg-muted border-border/50"
            data-ocid="admin.song_form.album_input"
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="sf-duration"
            className="text-xs font-medium text-muted-foreground"
          >
            Duration (seconds)
          </label>
          <Input
            id="sf-duration"
            type="number"
            value={Number(form.duration)}
            onChange={(e) => set("duration", BigInt(e.target.value || "0"))}
            placeholder="240"
            className="bg-muted border-border/50"
            data-ocid="admin.song_form.duration_input"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="sf-audio"
          className="text-xs font-medium text-muted-foreground"
        >
          Audio URL *
        </label>
        <Input
          id="sf-audio"
          value={form.audioUrl}
          onChange={(e) => set("audioUrl", e.target.value)}
          placeholder="https://..."
          className="bg-muted border-border/50"
          data-ocid="admin.song_form.audio_url_input"
        />
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="sf-cover"
          className="text-xs font-medium text-muted-foreground"
        >
          Cover Art URL
        </label>
        <Input
          id="sf-cover"
          value={form.coverArtUrl}
          onChange={(e) => set("coverArtUrl", e.target.value)}
          placeholder="https://..."
          className="bg-muted border-border/50"
          data-ocid="admin.song_form.cover_url_input"
        />
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="sf-lyrics"
          className="text-xs font-medium text-muted-foreground"
        >
          Lyrics
        </label>
        <Textarea
          id="sf-lyrics"
          value={form.lyrics}
          onChange={(e) => set("lyrics", e.target.value)}
          placeholder="Paste song lyrics here…"
          className="bg-muted border-border/50 resize-none"
          rows={5}
          data-ocid="admin.song_form.lyrics_input"
        />
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <Button
          variant="ghost"
          onClick={onCancel}
          data-ocid="admin.song_form.cancel_button"
        >
          Cancel
        </Button>
        <Button
          onClick={() => onSave(form)}
          disabled={!valid || isPending}
          data-ocid="admin.song_form.save_button"
        >
          {isPending ? "Saving…" : "Save Song"}
        </Button>
      </div>
    </div>
  );
}

// ─── Delete Confirm Dialog ────────────────────────────────────────────────────

function DeleteConfirmDialog({
  song,
  onConfirm,
  onCancel,
  isPending,
}: {
  song: SongPublic | null;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  return (
    <Dialog open={!!song} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent
        className="dark sm:max-w-sm bg-card border-border"
        data-ocid="admin.delete_dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-destructive">
            Delete Song?
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            <span className="font-semibold text-foreground">{song?.title}</span>{" "}
            will be permanently removed. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={isPending}
            data-ocid="admin.delete_cancel_button"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
            data-ocid="admin.delete_confirm_button"
          >
            {isPending ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const navigate = useNavigate();
  const { isAdmin, isAuthenticated } = useAuth();
  const { data: songs = [], isLoading } = useListSongs();
  const addSong = useAddSong();
  const editSong = useEditSong();
  const deleteSong = useDeleteSong();
  const setStripe = useSetStripeConfiguration();
  const { data: stripeConfigured } = useIsStripeConfigured();

  const [addOpen, setAddOpen] = useState(false);
  const [editSongId, setEditSongId] = useState<bigint | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SongPublic | null>(null);
  const [stripeKey, setStripeKey] = useState("");
  const [editingStripe, setEditingStripe] = useState(false);

  // Redirect non-admins with toast
  useEffect(() => {
    if (!isAuthenticated) return;
    if (isAdmin === false) {
      toast.error("Access denied — admins only.");
      navigate({ to: "/" });
    }
  }, [isAdmin, isAuthenticated, navigate]);

  const editingSong = songs.find((s) => s.id === editSongId);

  const handleAdd = (input: SongInput) => {
    addSong.mutate(input, {
      onSuccess: () => {
        toast.success("Song added successfully.");
        setAddOpen(false);
      },
      onError: () => toast.error("Failed to add song."),
    });
  };

  const handleEdit = (input: SongInput) => {
    if (!editSongId) return;
    editSong.mutate(
      { id: editSongId, input },
      {
        onSuccess: () => {
          toast.success("Song updated successfully.");
          setEditSongId(null);
        },
        onError: () => toast.error("Failed to update song."),
      },
    );
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteSong.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success(`"${deleteTarget.title}" deleted.`);
        setDeleteTarget(null);
      },
      onError: () => {
        toast.error("Failed to delete song.");
        setDeleteTarget(null);
      },
    });
  };

  const handleStripe = () => {
    if (!stripeKey.trim()) return;
    setStripe.mutate(
      {
        secretKey: stripeKey.trim(),
        allowedCountries: ["US", "GB", "CA", "AU", "DE", "FR"],
      },
      {
        onSuccess: () => {
          toast.success("Stripe configured successfully.");
          setEditingStripe(false);
          setStripeKey("");
        },
        onError: () => toast.error("Failed to configure Stripe."),
      },
    );
  };

  // Don't render until admin confirmed
  if (!isAdmin) return null;

  return (
    <div className="px-6 py-8 max-w-4xl" data-ocid="admin.page">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
          <Shield className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground tracking-tight">
            Admin Panel
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage songs, settings, and subscriptions
          </p>
        </div>
      </div>

      {/* Stripe config */}
      <section
        className="bg-card rounded-2xl border border-border/50 p-5 mb-6"
        data-ocid="admin.stripe_section"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Settings size={16} className="text-muted-foreground" />
            <h2 className="font-display font-semibold text-foreground">
              Stripe Configuration
            </h2>
          </div>
          <Badge
            variant="outline"
            className={
              stripeConfigured
                ? "border-primary/40 text-primary bg-primary/10"
                : "border-border/50 text-muted-foreground"
            }
          >
            {stripeConfigured ? "Configured" : "Not configured"}
          </Badge>
        </div>
        {editingStripe ? (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label
                htmlFor="stripe-key"
                className="text-xs font-medium text-muted-foreground"
              >
                Stripe Secret Key
              </label>
              <Input
                id="stripe-key"
                type="password"
                value={stripeKey}
                onChange={(e) => setStripeKey(e.target.value)}
                placeholder="sk_live_..."
                className="bg-muted border-border/50 font-mono text-sm"
                data-ocid="admin.stripe_key_input"
              />
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleStripe}
                disabled={!stripeKey.trim() || setStripe.isPending}
                data-ocid="admin.stripe_save_button"
              >
                {setStripe.isPending ? "Saving…" : "Save"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setEditingStripe(false)}
                data-ocid="admin.stripe_cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setEditingStripe(true)}
            className="border-border/50"
            data-ocid="admin.stripe_edit_button"
          >
            <Edit2 size={13} className="mr-1.5" />
            {stripeConfigured ? "Update Key" : "Configure Stripe"}
          </Button>
        )}
      </section>

      {/* Songs management */}
      <section
        className="bg-card rounded-2xl border border-border/50 overflow-hidden"
        data-ocid="admin.songs_section"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Music2 size={16} className="text-primary" />
            <h2 className="font-display font-semibold text-foreground">
              Songs Library
            </h2>
            <Badge
              variant="outline"
              className="text-xs border-border/50 text-muted-foreground"
            >
              {songs.length} songs
            </Badge>
          </div>
          <Button
            size="sm"
            onClick={() => setAddOpen(true)}
            className="gap-1.5"
            data-ocid="admin.add_song_button"
          >
            <Plus size={14} />
            Add Song
          </Button>
        </div>

        {isLoading ? (
          <div className="p-5 space-y-3" data-ocid="admin.songs_loading_state">
            {["a", "b", "c"].map((k) => (
              <div key={k} className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : songs.length === 0 ? (
          <div
            data-ocid="admin.songs_empty_state"
            className="text-center py-16"
          >
            <Music2 className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">
              No songs yet. Add the first one!
            </p>
          </div>
        ) : (
          <div className="p-3">
            {songs.map((song, i) => (
              <div
                key={song.id.toString()}
                data-ocid={`admin.song.item.${i + 1}`}
                className="group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors duration-150"
              >
                <img
                  src={song.coverArtUrl || "/assets/images/placeholder.svg"}
                  alt={song.album}
                  className="w-10 h-10 rounded-lg object-cover shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/images/placeholder.svg";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {song.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {song.artist}
                    {song.album ? ` · ${song.album}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditSongId(song.id)}
                    aria-label={`Edit ${song.title}`}
                    data-ocid={`admin.edit_song_button.${i + 1}`}
                    className="h-7 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
                  >
                    <Edit2 size={13} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleteTarget(song)}
                    aria-label={`Delete ${song.title}`}
                    data-ocid={`admin.delete_song_button.${i + 1}`}
                    className="h-7 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 size={13} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add song dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent
          data-ocid="admin.add_song_dialog"
          className="dark max-w-xl bg-card border-border"
        >
          <DialogHeader>
            <DialogTitle className="font-display">Add New Song</DialogTitle>
          </DialogHeader>
          <SongForm
            initial={EMPTY_SONG}
            onSave={handleAdd}
            onCancel={() => setAddOpen(false)}
            isPending={addSong.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit song dialog */}
      <Dialog open={!!editSongId} onOpenChange={() => setEditSongId(null)}>
        <DialogContent
          data-ocid="admin.edit_song_dialog"
          className="dark max-w-xl bg-card border-border"
        >
          <DialogHeader>
            <DialogTitle className="font-display">Edit Song</DialogTitle>
          </DialogHeader>
          {editingSong && (
            <SongForm
              initial={{
                title: editingSong.title,
                artist: editingSong.artist,
                album: editingSong.album,
                duration: editingSong.duration,
                coverArtUrl: editingSong.coverArtUrl,
                audioUrl: editingSong.audioUrl,
                lyrics: editingSong.lyrics,
              }}
              onSave={handleEdit}
              onCancel={() => setEditSongId(null)}
              isPending={editSong.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirm dialog */}
      <DeleteConfirmDialog
        song={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        isPending={deleteSong.isPending}
      />
    </div>
  );
}
