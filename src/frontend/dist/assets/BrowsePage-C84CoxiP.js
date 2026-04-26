import { c as createLucideIcon, r as reactExports, a as useListSongs, d as useSearchSongs, b as usePlayer, j as jsxRuntimeExports, B as Button, P as Play, m as motion, M as Music2, S as Skeleton } from "./index-DQ_lvAJx.js";
import { S as SongCard } from "./SongCard-uHlty_PI.js";
import { I as Input } from "./input-B7AhRLp5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function RowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-6 h-4 shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-lg shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 max-w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32 max-w-full" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "hidden md:block h-3 w-24 shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-10 shrink-0" })
  ] });
}
function BrowsePage() {
  const [query, setQuery] = reactExports.useState("");
  const { data: allSongs = [], isLoading: loadingAll } = useListSongs();
  const { data: searchResults = [], isLoading: searching } = useSearchSongs(query);
  const { playQueue } = usePlayer();
  const isSearching = query.trim().length > 0;
  const songs = isSearching ? searchResults : allSongs;
  const isLoading = isSearching ? searching : loadingAll;
  const handlePlayAll = () => {
    if (songs.length) playQueue(songs, 0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dark animate-fade-in", "data-ocid": "browse.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-border px-4 md:px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl md:text-2xl font-display font-bold text-foreground tracking-tight", children: "Browse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: isLoading ? "Loading…" : isSearching ? `${songs.length} result${songs.length !== 1 ? "s" : ""} for "${query}"` : `${allSongs.length} song${allSongs.length !== 1 ? "s" : ""} in the library` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 shrink-0", children: songs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 glow-subtle min-h-[44px]",
          onClick: handlePlayAll,
          "data-ocid": "browse.play_all_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Play All" })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-6 pt-5 pb-8 max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "search",
            placeholder: "Search songs, artists, albums…",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            "data-ocid": "browse.search_input",
            className: "pl-10 bg-card border-border h-11 rounded-xl focus-visible:ring-primary/50 text-sm"
          }
        ),
        query && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Clear search",
            onClick: () => setQuery(""),
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth text-xs px-1 min-h-[44px] flex items-center",
            "data-ocid": "browse.clear_search_button",
            children: "✕"
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/30 rounded-2xl border border-border/30 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-3 py-2 border-b border-border/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-xs text-muted-foreground font-medium", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:block text-xs text-muted-foreground font-medium w-32", children: "Album" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium w-10 text-right", children: "Time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-11" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 space-y-1", children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(RowSkeleton, {}, k)) })
      ] }) : songs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          "data-ocid": "browse.empty_state",
          className: "flex flex-col items-center justify-center py-24 text-center gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-7 h-7 text-muted-foreground/50" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-semibold text-foreground", children: isSearching ? "No results found" : "No songs yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: isSearching ? `No matches for "${query}" — try a different search.` : "Songs will appear here once added by an admin." })
            ] }),
            isSearching && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setQuery(""),
                className: "text-sm text-primary hover:text-primary/80 transition-smooth min-h-[44px] flex items-center",
                "data-ocid": "browse.clear_search_link",
                children: "Clear search"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card/30 rounded-2xl border border-border/30 overflow-hidden",
          "data-ocid": "browse.song_list",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-3 py-2 border-b border-border/30 text-xs text-muted-foreground font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center", children: "#" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: "Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:block w-32 truncate", children: "Album" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-right", children: "Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-11" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: songs.map((song, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              SongCard,
              {
                song,
                queue: songs,
                index: i,
                variant: "row"
              },
              song.id.toString()
            )) })
          ]
        }
      )
    ] })
  ] });
}
export {
  BrowsePage as default
};
