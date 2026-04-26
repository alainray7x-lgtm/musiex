import { c as createLucideIcon, u as useAuth, a as useListSongs, j as jsxRuntimeExports, S as Skeleton, b as usePlayer, m as motion, B as Button, P as Play, L as Link } from "./index-DQ_lvAJx.js";
import { S as SongCard } from "./SongCard-uHlty_PI.js";
import { C as Clock } from "./clock-UvXKarKa.js";
import { S as Sparkles } from "./sparkles-CNRQKbLK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m18 14 4 4-4 4", key: "10pe0f" }],
  ["path", { d: "m18 2 4 4-4 4", key: "pucp1d" }],
  ["path", { d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22", key: "1ailkh" }],
  ["path", { d: "M2 6h1.972a4 4 0 0 1 3.6 2.2", key: "km57vx" }],
  ["path", { d: "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45", key: "os18l9" }]
];
const Shuffle = createLucideIcon("shuffle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function SongCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl overflow-hidden bg-card border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
    ] })
  ] });
}
function FeaturedHero({ songs }) {
  const { playQueue } = usePlayer();
  const featured = songs[0] ?? null;
  const handlePlayAll = () => {
    if (songs.length) playQueue(songs, 0);
  };
  const handleShuffle = () => {
    const shuffled = [...songs].sort(() => Math.random() - 0.5);
    if (shuffled.length) playQueue(shuffled, 0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative overflow-hidden bg-gradient-to-br from-card via-background to-background border-b border-border",
      "data-ocid": "home.hero.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/10 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-primary/5 blur-2xl" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 px-4 md:px-6 py-8 md:py-10 max-w-5xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-primary uppercase tracking-widest", children: "Welcome back" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-5xl font-display font-bold text-gradient mb-3 leading-tight", children: [
                  "Your Music,",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  "Your World"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm md:text-base max-w-md mb-6", children: "Stream thousands of tracks, build playlists, and discover your next favourite artist." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-subtle transition-smooth min-h-[44px]",
                      onClick: handlePlayAll,
                      disabled: songs.length === 0,
                      "data-ocid": "home.play_all_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4" }),
                        "Play All"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      variant: "outline",
                      className: "gap-2 border-border hover:border-primary/40 transition-smooth min-h-[44px]",
                      onClick: handleShuffle,
                      disabled: songs.length === 0,
                      "data-ocid": "home.shuffle_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Shuffle, { className: "w-4 h-4" }),
                        "Shuffle"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/browse",
                      className: "text-sm text-muted-foreground hover:text-primary transition-smooth px-3 py-2 min-h-[44px] flex items-center",
                      "data-ocid": "home.browse_link",
                      children: "Browse Library →"
                    }
                  )
                ] })
              ]
            }
          ),
          featured && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 0.25, duration: 0.4 },
              className: "mt-8 flex items-center gap-4 p-4 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-sm max-w-md",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-subtle", children: featured.coverArtUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: featured.coverArtUrl,
                    alt: featured.title,
                    className: "w-full h-full object-cover",
                    onError: (e) => {
                      e.currentTarget.src = "/assets/images/placeholder.svg";
                    }
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-6 h-6 text-muted-foreground" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "🔥 Trending Now" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-semibold truncate", children: featured.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: featured.artist })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Play ${featured.title}`,
                    onClick: handlePlayAll,
                    className: "w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:bg-primary/90 transition-smooth glow-subtle",
                    "data-ocid": "home.featured_play_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5 translate-x-[1px]" })
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  action,
  actionTo,
  actionOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: title })
      ] }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: subtitle })
    ] }),
    action && actionTo && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: actionTo,
        className: "text-sm text-primary hover:text-primary/80 transition-smooth min-h-[44px] flex items-center",
        "data-ocid": actionOcid,
        children: action
      }
    )
  ] });
}
function HomePage() {
  const { profile } = useAuth();
  const { data: songs = [], isLoading } = useListSongs();
  const featured = songs.slice(0, 6);
  const recent = songs.slice(0, 4);
  const greeting = () => {
    const h = (/* @__PURE__ */ new Date()).getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dark animate-fade-in", "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedHero, { songs }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 md:px-6 pt-8 pb-2 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-display font-bold text-foreground", children: [
        greeting(),
        (profile == null ? void 0 : profile.name) ? `, ${profile.name}` : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Tap a song to see its lyrics" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "px-4 md:px-6 py-6 bg-background",
        "data-ocid": "home.featured.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: TrendingUp,
              title: "Trending Now",
              subtitle: "Hand-picked tracks you'll love",
              action: "See all →",
              actionTo: "/browse",
              actionOcid: "home.featured.see_all_link"
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4", children: ["a", "b", "c", "d", "e", "f"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SongCardSkeleton, {}, k)) }) : featured.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-16 text-center gap-3 rounded-2xl border border-dashed border-border",
              "data-ocid": "home.featured.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No songs yet. Check back soon!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: "Ask an admin to add songs." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4", children: featured.map((song, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SongCard,
            {
              song,
              queue: featured,
              index: i,
              variant: "grid"
            },
            song.id.toString()
          )) })
        ]
      }
    ),
    (isLoading || recent.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "px-4 md:px-6 py-8 bg-muted/20 border-t border-border",
        "data-ocid": "home.recent.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: Clock,
              title: "Recently Added",
              subtitle: "Fresh tracks just landed",
              action: "Browse all →",
              actionTo: "/browse",
              actionOcid: "home.recent.browse_link"
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", "data-ocid": "home.recent.list", children: recent.map((song, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SongCard,
            {
              song,
              queue: recent,
              index: i,
              variant: "row"
            },
            song.id.toString()
          )) })
        ]
      }
    )
  ] });
}
export {
  HomePage as default
};
