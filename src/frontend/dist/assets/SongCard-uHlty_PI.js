import { c as createLucideIcon, b as usePlayer, e as useLyricsModal, j as jsxRuntimeExports, m as motion, f as Pause, P as Play, g as Badge } from "./index-DQ_lvAJx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
];
const Music = createLucideIcon("music", __iconNode);
function formatDuration(secs) {
  const total = typeof secs === "bigint" ? Number(secs) : secs;
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
function CoverArt({ src, alt }) {
  if (!src) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-8 h-8 text-muted-foreground" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src,
      alt,
      className: "w-full h-full object-cover",
      onError: (e) => {
        e.currentTarget.src = "/assets/images/placeholder.svg";
      }
    }
  );
}
function SongCard({
  song,
  queue,
  index = 0,
  variant = "grid"
}) {
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();
  const { openSong } = useLyricsModal();
  const isCurrentSong = (currentSong == null ? void 0 : currentSong.id) === song.id;
  const handlePlay = (e) => {
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
  if (variant === "row") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: -8 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: index * 0.04, duration: 0.3 },
        className: "group",
        "data-ocid": `song.item.${index + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleOpenLyrics,
            className: "w-full flex items-center gap-3 p-3 rounded-xl hover:bg-card transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer min-h-[56px] text-left",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 text-center shrink-0", children: isCurrentSong && isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "now-playing-bars flex items-end justify-center gap-[2px] h-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground tabular-nums group-hover:hidden", children: index + 1 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-10 h-10 rounded-lg overflow-hidden shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CoverArt, { src: song.coverArtUrl, alt: song.title }),
                isCurrentSong && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/20" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-sm font-medium truncate ${isCurrentSong ? "text-primary" : "text-foreground"}`,
                    children: song.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: song.artist })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hidden md:block text-xs text-muted-foreground truncate max-w-[140px]", children: song.album }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground tabular-nums shrink-0", children: formatDuration(song.duration) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handlePlay,
                  "aria-label": isCurrentSong && isPlaying ? `Pause ${song.title}` : `Play ${song.title}`,
                  className: `ml-1 w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-smooth ${isCurrentSong ? "bg-primary text-primary-foreground opacity-100" : "bg-muted text-foreground opacity-0 group-hover:opacity-100"}`,
                  "data-ocid": `song.play_button.${index + 1}`,
                  children: isCurrentSong && isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5 translate-x-[1px]" })
                }
              )
            ]
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.06, duration: 0.35 },
      className: "group relative",
      "data-ocid": `song.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleOpenLyrics,
          className: "w-full rounded-2xl bg-card border border-border hover:border-primary/30 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring overflow-hidden cursor-pointer text-left",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CoverArt, { src: song.coverArtUrl, alt: song.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" }),
              isCurrentSong && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 ring-2 ring-inset ring-primary/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handlePlay,
                  "aria-label": isCurrentSong && isPlaying ? `Pause ${song.title}` : `Play ${song.title}`,
                  className: `absolute bottom-3 right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-smooth
              ${isCurrentSong ? "bg-primary text-primary-foreground opacity-100 glow-primary scale-100" : "bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"}`,
                  "data-ocid": `song.play_button.${index + 1}`,
                  children: isCurrentSong && isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 translate-x-[1px]" })
                }
              ),
              isCurrentSong && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "default",
                  className: "bg-primary/90 text-primary-foreground text-[10px] px-1.5 py-0.5 flex items-center gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "now-playing-bars flex items-end gap-[2px] h-2.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "!h-2" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "!h-3" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "!h-1.5" })
                    ] }),
                    "Playing"
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-sm font-display font-semibold truncate leading-tight ${isCurrentSong ? "text-primary" : "text-foreground"}`,
                  children: song.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: song.artist }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 truncate max-w-[70%]", children: song.album }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground tabular-nums", children: formatDuration(song.duration) })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
export {
  SongCard as S
};
