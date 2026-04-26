import { useDeletePlaylist } from "@/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Playlist } from "@/types";
import { Link } from "@tanstack/react-router";
import { ListMusic, Music2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface PlaylistCardProps {
  playlist: Playlist;
  index: number;
  coverArtUrl?: string;
}

export function PlaylistCard({
  playlist,
  index,
  coverArtUrl,
}: PlaylistCardProps) {
  const deletePlaylist = useDeletePlaylist();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleConfirmDelete = () => {
    deletePlaylist.mutate(playlist.id, {
      onSuccess: () => toast.success("Playlist deleted"),
      onError: () => toast.error("Failed to delete playlist"),
    });
  };

  const songCount = playlist.songIds.length;

  return (
    <div className="group relative" data-ocid={`playlists.card.${index + 1}`}>
      <Link
        to="/playlists/$id"
        params={{ id: playlist.id.toString() }}
        className="block bg-card border border-border/40 rounded-xl overflow-hidden transition-smooth hover:border-primary/30 hover:shadow-subtle hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/* Cover art */}
        <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-muted to-card">
          {coverArtUrl ? (
            <img
              src={coverArtUrl}
              alt={playlist.name}
              className="w-full h-full object-cover transition-smooth group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : null}
          {/* Gradient overlay with icon when no art */}
          {!coverArtUrl && (
            <div className="absolute inset-0 bg-gradient-brand flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-150" />
                <ListMusic className="w-10 h-10 text-primary/70 relative" />
              </div>
            </div>
          )}
          {/* Hover play overlay */}
          <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg glow-primary">
              <Music2 className="w-5 h-5 text-primary-foreground ml-0.5" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="font-semibold font-display text-foreground truncate text-sm leading-tight">
            {playlist.name}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {songCount} {songCount === 1 ? "song" : "songs"}
          </p>
          {playlist.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
              {playlist.description}
            </p>
          )}
        </div>
      </Link>

      {/* Delete button — floats above card, shown on hover */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            type="button"
            data-ocid={`playlists.delete_button.${index + 1}`}
            onClick={handleDelete}
            aria-label="Delete playlist"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-smooth z-10 p-1.5 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-destructive hover:border-destructive/40 hover:bg-destructive/10"
          >
            <Trash2 size={13} />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent data-ocid={`playlists.delete_dialog.${index + 1}`}>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Delete Playlist?
            </AlertDialogTitle>
            <AlertDialogDescription>
              "{playlist.name}" will be permanently deleted. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid={`playlists.delete_cancel.${index + 1}`}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              data-ocid={`playlists.delete_confirm.${index + 1}`}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
