import {
  useCreatePlaylist,
  useGetUserTier,
  useListMyPlaylists,
  useListSongs,
} from "@/api";
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
import { useAuth } from "@/hooks/useAuth";
import { SubscriptionTier } from "@/types";
import { Crown, Lock, Music2, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PlaylistCard } from "../components/PlaylistCard";

const FREE_PLAYLIST_LIMIT = 3;

export default function PlaylistsPage() {
  const { isAuthenticated } = useAuth();
  const { data: playlists = [], isLoading } = useListMyPlaylists();
  const { data: allSongs = [] } = useListSongs();
  const { data: tier } = useGetUserTier();
  const createPlaylist = useCreatePlaylist();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const isPremium = tier === SubscriptionTier.premium;
  const playlistCount = playlists.length;
  const atLimit = !isPremium && playlistCount >= FREE_PLAYLIST_LIMIT;

  // Build cover art map from first song in each playlist
  const songMap = new Map(
    allSongs.map((s) => [s.id.toString(), s.coverArtUrl]),
  );
  const getCoverArt = (playlistId: bigint) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    if (!playlist || playlist.songIds.length === 0) return undefined;
    const url = songMap.get(playlist.songIds[0].toString());
    return url || undefined;
  };

  const handleCreate = () => {
    if (!name.trim()) return;
    if (atLimit) {
      toast.error("Upgrade to Premium for unlimited playlists");
      return;
    }
    createPlaylist.mutate(
      { name: name.trim(), description: desc.trim() },
      {
        onSuccess: () => {
          toast.success("Playlist created");
          setOpen(false);
          setName("");
          setDesc("");
        },
        onError: () => toast.error("Failed to create playlist"),
      },
    );
  };

  const openCreate = () => {
    if (atLimit) {
      toast.error(
        "You've reached the free plan limit of 3 playlists. Upgrade to Premium for unlimited playlists.",
        {
          action: {
            label: "Upgrade",
            onClick: () => window.location.assign("/account"),
          },
          duration: 6000,
        },
      );
      return;
    }
    setOpen(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Sign in to view your playlists.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8" data-ocid="playlists.page">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground tracking-tight">
            My Playlists
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Your personal music collections
          </p>
          {/* Limit badge for free users */}
          {!isPremium && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border/50 text-xs text-muted-foreground">
                <Music2 size={12} />
                <span>
                  <span
                    className={
                      atLimit
                        ? "text-destructive font-semibold"
                        : "text-foreground font-semibold"
                    }
                  >
                    {playlistCount}
                  </span>
                  <span> / {FREE_PLAYLIST_LIMIT} playlists</span>
                </span>
              </div>
              {atLimit && (
                <Badge
                  variant="secondary"
                  data-ocid="playlists.limit_badge"
                  className="gap-1 bg-accent/15 text-accent border border-accent/30 text-xs"
                >
                  <Crown size={10} />
                  Upgrade for unlimited
                </Badge>
              )}
            </div>
          )}
          {isPremium && (
            <div className="flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit text-xs text-primary">
              <Sparkles size={12} />
              <span className="font-medium">Premium · Unlimited playlists</span>
            </div>
          )}
        </div>
        <Button
          onClick={openCreate}
          data-ocid="playlists.create_button"
          disabled={atLimit}
          className={`gap-2 shrink-0 ${!atLimit ? "glow-primary" : ""}`}
        >
          {atLimit ? <Lock size={15} /> : <Plus size={15} />}
          {atLimit ? "Limit Reached" : "New Playlist"}
        </Button>
      </div>

      {/* Free limit upsell banner when at limit */}
      {atLimit && (
        <div
          data-ocid="playlists.upgrade_banner"
          className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/25 mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
              <Crown size={16} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                You've reached your free limit
              </p>
              <p className="text-xs text-muted-foreground">
                Upgrade to Premium for unlimited playlists and more
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            data-ocid="playlists.upgrade_button"
            className="shrink-0 border-accent/40 text-accent hover:bg-accent/10 gap-1.5"
            onClick={() => window.location.assign("/account")}
          >
            <Sparkles size={13} />
            Upgrade
          </Button>
        </div>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {["a", "b", "c", "d", "e", "f"].map((k) => (
            <div key={k} className="space-y-2">
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : playlists.length === 0 ? (
        <div
          data-ocid="playlists.empty_state"
          className="text-center py-20 animate-fade-in"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto mb-5">
            <Music2 className="w-10 h-10 text-primary/60" />
          </div>
          <h3 className="text-xl font-display font-semibold text-foreground">
            No playlists yet
          </h3>
          <p className="text-muted-foreground mt-2 text-sm max-w-sm mx-auto">
            Create a playlist to organize your favorite songs and build your
            personal library.
          </p>
          <Button
            onClick={openCreate}
            className="mt-5 gap-2 glow-primary"
            data-ocid="playlists.empty_create_button"
          >
            <Plus size={16} />
            Create your first playlist
          </Button>
        </div>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-fade-in"
          data-ocid="playlists.grid"
        >
          {playlists.map((pl, i) => (
            <PlaylistCard
              key={pl.id.toString()}
              playlist={pl}
              index={i}
              coverArtUrl={getCoverArt(pl.id)}
            />
          ))}
        </div>
      )}

      {/* Create dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="playlists.create_dialog">
          <DialogHeader>
            <DialogTitle className="font-display">New Playlist</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label
                htmlFor="pl-name"
                className="text-sm font-medium text-foreground"
              >
                Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="pl-name"
                placeholder="My Awesome Playlist"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreate();
                }}
                data-ocid="playlists.name_input"
                className="bg-muted border-border/50"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="pl-desc"
                className="text-sm font-medium text-foreground"
              >
                Description
              </label>
              <Textarea
                id="pl-desc"
                placeholder="What's this playlist about?"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                data-ocid="playlists.description_input"
                className="bg-muted border-border/50 resize-none"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              data-ocid="playlists.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!name.trim() || createPlaylist.isPending}
              data-ocid="playlists.submit_button"
              className="glow-primary"
            >
              {createPlaylist.isPending ? "Creating…" : "Create Playlist"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
