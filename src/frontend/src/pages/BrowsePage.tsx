import { useListSongs, useSearchSongs } from "@/api";
import { SongCard } from "@/components/SongCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { usePlayer } from "@/hooks/usePlayer";
import { Music2, Play, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-3">
      <Skeleton className="w-6 h-4 shrink-0" />
      <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
      <div className="flex-1 space-y-1.5 min-w-0">
        <Skeleton className="h-4 w-48 max-w-full" />
        <Skeleton className="h-3 w-32 max-w-full" />
      </div>
      <Skeleton className="hidden md:block h-3 w-24 shrink-0" />
      <Skeleton className="h-3 w-10 shrink-0" />
    </div>
  );
}

export default function BrowsePage() {
  const [query, setQuery] = useState("");
  const { data: allSongs = [], isLoading: loadingAll } = useListSongs();
  const { data: searchResults = [], isLoading: searching } =
    useSearchSongs(query);
  const { playQueue } = usePlayer();

  const isSearching = query.trim().length > 0;
  const songs = isSearching ? searchResults : allSongs;
  const isLoading = isSearching ? searching : loadingAll;

  const handlePlayAll = () => {
    if (songs.length) playQueue(songs, 0);
  };

  return (
    <div className="dark animate-fade-in" data-ocid="browse.page">
      {/* Page Header */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-border px-4 md:px-6 py-4">
        <div className="flex items-center justify-between gap-4 max-w-5xl">
          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-display font-bold text-foreground tracking-tight">
              Browse
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLoading
                ? "Loading…"
                : isSearching
                  ? `${songs.length} result${songs.length !== 1 ? "s" : ""} for "${query}"`
                  : `${allSongs.length} song${allSongs.length !== 1 ? "s" : ""} in the library`}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {songs.length > 0 && (
              <Button
                size="sm"
                className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 glow-subtle min-h-[44px]"
                onClick={handlePlayAll}
                data-ocid="browse.play_all_button"
              >
                <Play className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Play All</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 md:px-6 pt-5 pb-8 max-w-5xl">
        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
          <Input
            type="search"
            placeholder="Search songs, artists, albums…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            data-ocid="browse.search_input"
            className="pl-10 bg-card border-border h-11 rounded-xl focus-visible:ring-primary/50 text-sm"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth text-xs px-1 min-h-[44px] flex items-center"
              data-ocid="browse.clear_search_button"
            >
              ✕
            </button>
          )}
        </div>

        {/* Songs list */}
        {isLoading ? (
          <div className="bg-card/30 rounded-2xl border border-border/30 overflow-hidden">
            <div className="flex items-center gap-4 px-3 py-2 border-b border-border/30">
              <span className="w-6" />
              <span className="w-10 shrink-0" />
              <span className="flex-1 text-xs text-muted-foreground font-medium">
                Title
              </span>
              <span className="hidden md:block text-xs text-muted-foreground font-medium w-32">
                Album
              </span>
              <span className="text-xs text-muted-foreground font-medium w-10 text-right">
                Time
              </span>
              <span className="w-11" />
            </div>
            <div className="p-2 space-y-1">
              {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
                <RowSkeleton key={k} />
              ))}
            </div>
          </div>
        ) : songs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            data-ocid="browse.empty_state"
            className="flex flex-col items-center justify-center py-24 text-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Music2 className="w-7 h-7 text-muted-foreground/50" />
            </div>
            <div>
              <h3 className="text-xl font-display font-semibold text-foreground">
                {isSearching ? "No results found" : "No songs yet"}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {isSearching
                  ? `No matches for "${query}" — try a different search.`
                  : "Songs will appear here once added by an admin."}
              </p>
            </div>
            {isSearching && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-sm text-primary hover:text-primary/80 transition-smooth min-h-[44px] flex items-center"
                data-ocid="browse.clear_search_link"
              >
                Clear search
              </button>
            )}
          </motion.div>
        ) : (
          <div
            className="bg-card/30 rounded-2xl border border-border/30 overflow-hidden"
            data-ocid="browse.song_list"
          >
            {/* Table header */}
            <div className="flex items-center gap-3 px-3 py-2 border-b border-border/30 text-xs text-muted-foreground font-medium">
              <span className="w-6 text-center">#</span>
              <span className="w-10 shrink-0" />
              <span className="flex-1">Title</span>
              <span className="hidden md:block w-32 truncate">Album</span>
              <span className="w-10 text-right">Time</span>
              <span className="w-11" />
            </div>
            <div className="p-2">
              {songs.map((song, i) => (
                <SongCard
                  key={song.id.toString()}
                  song={song}
                  queue={songs}
                  index={i}
                  variant="row"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
