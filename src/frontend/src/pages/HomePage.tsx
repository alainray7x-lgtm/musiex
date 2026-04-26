import { useListSongs } from "@/api";
import { SongCard } from "@/components/SongCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { usePlayer } from "@/hooks/usePlayer";
import { Link } from "@tanstack/react-router";
import { Clock, Play, Shuffle, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import type { SongPublic } from "../backend.d";

function SongCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-card border border-border">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

function FeaturedHero({ songs }: { songs: SongPublic[] }) {
  const { playQueue } = usePlayer();
  const featured = songs[0] ?? null;

  const handlePlayAll = () => {
    if (songs.length) playQueue(songs, 0);
  };
  const handleShuffle = () => {
    const shuffled = [...songs].sort(() => Math.random() - 0.5);
    if (shuffled.length) playQueue(shuffled, 0);
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-card via-background to-background border-b border-border"
      data-ocid="home.hero.section"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-primary/5 blur-2xl" />
      </div>

      <div className="relative z-10 px-4 md:px-6 py-8 md:py-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-widest">
              Welcome back
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-gradient mb-3 leading-tight">
            Your Music,
            <br />
            Your World
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mb-6">
            Stream thousands of tracks, build playlists, and discover your next
            favourite artist.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-subtle transition-smooth min-h-[44px]"
              onClick={handlePlayAll}
              disabled={songs.length === 0}
              data-ocid="home.play_all_button"
            >
              <Play className="w-4 h-4" />
              Play All
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-border hover:border-primary/40 transition-smooth min-h-[44px]"
              onClick={handleShuffle}
              disabled={songs.length === 0}
              data-ocid="home.shuffle_button"
            >
              <Shuffle className="w-4 h-4" />
              Shuffle
            </Button>
            <Link
              to="/browse"
              className="text-sm text-muted-foreground hover:text-primary transition-smooth px-3 py-2 min-h-[44px] flex items-center"
              data-ocid="home.browse_link"
            >
              Browse Library →
            </Link>
          </div>
        </motion.div>

        {/* Featured song highlight */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="mt-8 flex items-center gap-4 p-4 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-sm max-w-md"
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-subtle">
              {featured.coverArtUrl ? (
                <img
                  src={featured.coverArtUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/assets/images/placeholder.svg";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground mb-0.5">
                🔥 Trending Now
              </p>
              <p className="text-sm font-display font-semibold truncate">
                {featured.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {featured.artist}
              </p>
            </div>
            <button
              type="button"
              aria-label={`Play ${featured.title}`}
              onClick={handlePlayAll}
              className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:bg-primary/90 transition-smooth glow-subtle"
              data-ocid="home.featured_play_button"
            >
              <Play className="w-3.5 h-3.5 translate-x-[1px]" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  action,
  actionTo,
  actionOcid,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  action?: string;
  actionTo?: "/browse" | "/playlists";
  actionOcid?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Icon className="w-4 h-4 text-primary" />
          <h2 className="text-xl font-display font-bold text-foreground">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action && actionTo && (
        <Link
          to={actionTo}
          className="text-sm text-primary hover:text-primary/80 transition-smooth min-h-[44px] flex items-center"
          data-ocid={actionOcid}
        >
          {action}
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const { profile } = useAuth();
  const { data: songs = [], isLoading } = useListSongs();

  const featured = songs.slice(0, 6);
  const recent = songs.slice(0, 4);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="dark animate-fade-in" data-ocid="home.page">
      {/* Hero */}
      <FeaturedHero songs={songs} />

      {/* Greeting strip */}
      <div className="px-4 md:px-6 pt-8 pb-2 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            {greeting()}
            {profile?.name ? `, ${profile.name}` : ""}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Tap a song to see its lyrics
          </p>
        </div>
      </div>

      {/* Featured Songs */}
      <section
        className="px-4 md:px-6 py-6 bg-background"
        data-ocid="home.featured.section"
      >
        <SectionHeader
          icon={TrendingUp}
          title="Trending Now"
          subtitle="Hand-picked tracks you'll love"
          action="See all →"
          actionTo="/browse"
          actionOcid="home.featured.see_all_link"
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {["a", "b", "c", "d", "e", "f"].map((k) => (
              <SongCardSkeleton key={k} />
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center gap-3 rounded-2xl border border-dashed border-border"
            data-ocid="home.featured.empty_state"
          >
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              No songs yet. Check back soon!
            </p>
            <p className="text-xs text-muted-foreground/60">
              Ask an admin to add songs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {featured.map((song, i) => (
              <SongCard
                key={song.id.toString()}
                song={song}
                queue={featured}
                index={i}
                variant="grid"
              />
            ))}
          </div>
        )}
      </section>

      {/* Recently Added */}
      {(isLoading || recent.length > 0) && (
        <section
          className="px-4 md:px-6 py-8 bg-muted/20 border-t border-border"
          data-ocid="home.recent.section"
        >
          <SectionHeader
            icon={Clock}
            title="Recently Added"
            subtitle="Fresh tracks just landed"
            action="Browse all →"
            actionTo="/browse"
            actionOcid="home.recent.browse_link"
          />

          {isLoading ? (
            <div className="space-y-1">
              {["a", "b", "c", "d"].map((k) => (
                <Skeleton key={k} className="h-16 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-1" data-ocid="home.recent.list">
              {recent.map((song, i) => (
                <SongCard
                  key={song.id.toString()}
                  song={song}
                  queue={recent}
                  index={i}
                  variant="row"
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
