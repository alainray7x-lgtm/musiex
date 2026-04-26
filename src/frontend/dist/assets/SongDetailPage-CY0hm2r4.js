import { c as createLucideIcon, y as useParams, E as useRouter, F as useGetSong, b as usePlayer, u as useAuth, r as reactExports, j as jsxRuntimeExports, S as Skeleton, M as Music2, L as Link, g as Badge, B as Button, f as Pause, P as Play, s as ue, t as useListMyPlaylists, A as useAddSongToPlaylist } from "./index-DQ_lvAJx.js";
import { d as Plus, e as Dialog, f as DialogContent, g as DialogHeader, h as DialogTitle } from "./dialog-D1dOOiQf.js";
import { A as ArrowLeft } from "./arrow-left-D5sLFNd7.js";
import { C as Clock } from "./clock-UvXKarKa.js";
import { S as Sparkles } from "./sparkles-CNRQKbLK.js";
import { C as CircleCheck } from "./circle-check-BHiDTcpn.js";
import "./index-BJzkeLY7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M6 12c0-1.7.7-3.2 1.8-4.2", key: "oqkarx" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M18 12c0 1.7-.7 3.2-1.8 4.2", key: "1eah9h" }]
];
const Disc3 = createLucideIcon("disc-3", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M11 12H3", key: "51ecnj" }],
  ["path", { d: "M16 6H3", key: "1wxfjs" }],
  ["path", { d: "M16 18H3", key: "12xzn7" }],
  ["path", { d: "M18 9v6", key: "1twb98" }],
  ["path", { d: "M21 12h-6", key: "bt1uis" }]
];
const ListPlus = createLucideIcon("list-plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",
      key: "80a601"
    }
  ],
  [
    "path",
    {
      d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",
      key: "j0ngtp"
    }
  ],
  ["circle", { cx: "16", cy: "7", r: "5", key: "d08jfb" }]
];
const MicVocal = createLucideIcon("mic-vocal", __iconNode);
function formatDuration(secs) {
  const s = Number(secs);
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
}
const LYRICS_TEASER_CHARS = 150;
function LyricsSection({
  lyrics,
  isPremium
}) {
  if (!lyrics) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm italic", children: "No lyrics available for this song." });
  }
  if (isPremium) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "whitespace-pre-wrap text-sm text-foreground/90 leading-relaxed font-body animate-fade-in", children: lyrics });
  }
  const teaser = lyrics.slice(0, LYRICS_TEASER_CHARS);
  const hasMore = lyrics.length > LYRICS_TEASER_CHARS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "song_detail.premium_gate", className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("pre", { className: "whitespace-pre-wrap text-sm text-foreground/80 leading-relaxed font-body", children: [
      teaser,
      hasMore ? "…" : ""
    ] }),
    hasMore && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-2 overflow-hidden rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "pre",
        {
          className: "whitespace-pre-wrap text-sm leading-relaxed font-body select-none pointer-events-none",
          style: { filter: "blur(6px)", opacity: 0.5 },
          "aria-hidden": "true",
          children: lyrics.slice(LYRICS_TEASER_CHARS, LYRICS_TEASER_CHARS + 300)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent to-card/95 rounded-lg" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-col items-center gap-3 rounded-xl border border-accent/25 bg-accent/5 p-5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 16, className: "text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent/20 text-accent border-accent/30 border text-xs", children: "Premium Feature" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Unlock Full Lyrics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "Upgrade to Premium to read full lyrics for every song in the catalogue." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account", "data-ocid": "song_detail.upgrade_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "glow-accent bg-accent text-accent-foreground hover:opacity-90 gap-1.5 mt-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 13 }),
            "Upgrade to Premium"
          ]
        }
      ) })
    ] })
  ] });
}
function AddToPlaylistDialog({
  open,
  onClose,
  songId
}) {
  const { data: playlists = [], isLoading } = useListMyPlaylists();
  const addMutation = useAddSongToPlaylist();
  const [addedIds, setAddedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const handleAdd = (playlist) => {
    const key = playlist.id.toString();
    if (addedIds.has(key)) return;
    addMutation.mutate(
      { playlistId: playlist.id, songId },
      {
        onSuccess: () => {
          setAddedIds((prev) => new Set(prev).add(key));
          ue.success(`Added to "${playlist.name}"`);
        },
        onError: () => {
          ue.error("Could not add to playlist. Try again.");
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      "data-ocid": "song_detail.add_to_playlist_dialog",
      className: "sm:max-w-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-display", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ListPlus, { size: 18, className: "text-primary" }),
          "Add to Playlist"
        ] }) }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 py-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, i)) }) : playlists.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "song_detail.playlists_empty_state",
            className: "py-8 flex flex-col items-center gap-3 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { size: 32, className: "text-muted-foreground/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "You have no playlists yet." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/playlists", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
                "Create a Playlist"
              ] }) })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ul",
          {
            "data-ocid": "song_detail.playlists_list",
            className: "space-y-1.5 max-h-72 overflow-y-auto pr-1",
            children: playlists.map((pl, idx) => {
              var _a;
              const key = pl.id.toString();
              const added = addedIds.has(key);
              const isPending = addMutation.isPending && ((_a = addMutation.variables) == null ? void 0 : _a.playlistId) === pl.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "li",
                {
                  "data-ocid": `song_detail.playlist_item.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleAdd(pl),
                      disabled: added || isPending,
                      className: "w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left\n                      hover:bg-muted/60 transition-smooth focus-visible:outline-none focus-visible:ring-2\n                      focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: pl.name }),
                          pl.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: pl.description })
                        ] }),
                        added ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleCheck,
                          {
                            size: 16,
                            className: "shrink-0 text-primary"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Plus,
                          {
                            size: 16,
                            className: "shrink-0 text-muted-foreground"
                          }
                        )
                      ]
                    }
                  )
                },
                key
              );
            })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: onClose,
            "data-ocid": "song_detail.close_button",
            children: "Done"
          }
        ) })
      ]
    }
  ) });
}
function SongDetailPage() {
  const { id } = useParams({ from: "/songs/$id" });
  const songId = BigInt(id);
  const router = useRouter();
  const { data: song, isLoading } = useGetSong(songId);
  const { playSong, currentSong, isPlaying, togglePlay, queue } = usePlayer();
  const { isPremium } = useAuth();
  const isCurrent = (currentSong == null ? void 0 : currentSong.id) === songId;
  const [playlistDialogOpen, setPlaylistDialogOpen] = reactExports.useState(false);
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
      ue.info("Song is already in the queue.");
      return;
    }
    usePlayer.setState((s) => ({
      queue: [...s.queue, song]
    }));
    ue.success("Added to queue");
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-8 max-w-3xl mx-auto space-y-6 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-6 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-52 h-52 rounded-2xl shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-3/4 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-28 rounded-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-28 rounded-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-28 rounded-lg" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-2xl mt-8" })
    ] });
  }
  if (!song) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-4 p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-14 h-14 text-muted-foreground/20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold", children: "Song not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This song may have been removed or the link is invalid." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", className: "text-primary hover:underline text-sm", children: "← Back to Browse" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "px-6 py-8 max-w-3xl mx-auto animate-slide-up",
      "data-ocid": "song_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleGoBack,
            "data-ocid": "song_detail.back_link",
            className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground\n          transition-smooth mb-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
              "Back"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start gap-7 mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: song.coverArtUrl || "/assets/images/placeholder.svg",
                alt: `${song.album} cover art`,
                className: "w-52 h-52 rounded-2xl object-cover shadow-subtle ring-1 ring-border/30",
                onError: (e) => {
                  e.target.src = "/assets/images/placeholder.svg";
                }
              }
            ),
            isCurrent && isPlaying && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "now-playing-bars flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs border-border/40 text-muted-foreground mb-2",
                children: "Song"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground tracking-tight leading-tight truncate", children: song.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MicVocal, { size: 13, className: "text-primary/70" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground/80", children: song.artist })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Disc3, { size: 13, className: "text-accent/70" }),
                song.album
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 13, className: "opacity-40" }),
                formatDuration(song.duration)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5 mt-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handlePlay,
                  "data-ocid": "song_detail.play_button",
                  className: "gap-2 glow-primary",
                  children: isCurrent && isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { size: 14 }),
                    "Pause"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 14, className: "ml-0.5" }),
                    "Play Now"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  onClick: handleAddToQueue,
                  "data-ocid": "song_detail.add_to_queue_button",
                  className: "gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ListPlus, { size: 14 }),
                    "Add to Queue"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "secondary",
                  onClick: () => setPlaylistDialogOpen(true),
                  "data-ocid": "song_detail.add_to_playlist_button",
                  className: "gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                    "Add to Playlist"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            "data-ocid": "song_detail.lyrics_section",
            className: "bg-card/40 rounded-2xl border border-border/40 p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-display font-semibold text-foreground mb-5 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { size: 18, className: "text-primary" }),
                "Lyrics",
                isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-1 bg-primary/15 text-primary border-primary/25 border text-xs", children: "Premium" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(LyricsSection, { lyrics: song.lyrics, isPremium })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AddToPlaylistDialog,
          {
            open: playlistDialogOpen,
            onClose: () => setPlaylistDialogOpen(false),
            songId
          }
        )
      ]
    }
  );
}
export {
  SongDetailPage as default
};
