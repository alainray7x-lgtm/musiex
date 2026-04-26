import { c as createLucideIcon, y as useParams, z as useGetPlaylist, a as useListSongs, A as useAddSongToPlaylist, C as useRemoveSongFromPlaylist, D as useUpdatePlaylist, b as usePlayer, r as reactExports, j as jsxRuntimeExports, S as Skeleton, q as ListMusic, L as Link, g as Badge, B as Button, P as Play, s as ue } from "./index-DQ_lvAJx.js";
import { d as Plus, e as Dialog, f as DialogContent, g as DialogHeader, h as DialogTitle, i as DialogFooter } from "./dialog-D1dOOiQf.js";
import { I as Input } from "./input-B7AhRLp5.js";
import { a as Textarea, T as Trash2 } from "./textarea-eFsRg4Pf.js";
import { A as ArrowLeft } from "./arrow-left-D5sLFNd7.js";
import { C as Clock } from "./clock-UvXKarKa.js";
import "./index-BJzkeLY7.js";
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
function formatDuration(secs) {
  const s = Number(secs);
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
}
function formatTotalDuration(songs) {
  const total = songs.reduce((sum, s2) => sum + Number(s2.duration), 0);
  const h = Math.floor(total / 3600);
  const m = Math.floor(total % 3600 / 60);
  const s = total % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}
function PlaylistDetailPage() {
  const { id } = useParams({ from: "/playlists/$id" });
  const playlistId = BigInt(id);
  const { data: playlist, isLoading } = useGetPlaylist(playlistId);
  const { data: allSongs = [] } = useListSongs();
  const addSong = useAddSongToPlaylist();
  const removeSong = useRemoveSongFromPlaylist();
  const updatePlaylist = useUpdatePlaylist();
  const { playQueue } = usePlayer();
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [editName, setEditName] = reactExports.useState("");
  const [editDesc, setEditDesc] = reactExports.useState("");
  const [addSearch, setAddSearch] = reactExports.useState("");
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
        input: { name: editName.trim(), description: editDesc.trim() }
      },
      {
        onSuccess: () => {
          ue.success("Playlist updated");
          setEditOpen(false);
        },
        onError: () => ue.error("Failed to update playlist")
      }
    );
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-6 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-36 h-36 rounded-2xl shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-56" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-24 rounded-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-28 rounded-lg" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mt-8", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-lg shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-10" })
      ] }, k)) })
    ] });
  }
  if (!playlist) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListMusic, { className: "w-8 h-8 text-primary/60" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold", children: "Playlist not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/playlists", className: "text-primary hover:underline text-sm", children: "← Back to playlists" })
    ] });
  }
  const playlistSongs = playlist.songIds.map((sid) => allSongs.find((s) => s.id === sid)).filter((s) => !!s);
  const coverArt = playlistSongs.length > 0 ? playlistSongs[0].coverArtUrl : null;
  const filteredAvailableToAdd = allSongs.filter(
    (s) => !playlist.songIds.includes(s.id) && (addSearch === "" || s.title.toLowerCase().includes(addSearch.toLowerCase()) || s.artist.toLowerCase().includes(addSearch.toLowerCase()))
  );
  const handleRemove = (songId) => {
    removeSong.mutate(
      { playlistId, songId },
      {
        onSuccess: () => ue.success("Song removed"),
        onError: () => ue.error("Failed to remove song")
      }
    );
  };
  const handleAdd = (songId) => {
    addSong.mutate(
      { playlistId, songId },
      {
        onSuccess: () => ue.success("Song added to playlist"),
        onError: () => ue.error("Failed to add song")
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-8", "data-ocid": "playlist_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/playlists",
        "data-ocid": "playlist_detail.back_link",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
          "Back to Playlists"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-6 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-36 h-36 rounded-2xl shrink-0 overflow-hidden relative bg-gradient-to-br from-muted to-card", children: coverArt ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: coverArt,
          alt: playlist.name,
          className: "w-full h-full object-cover",
          onError: (e) => {
            e.target.style.display = "none";
          }
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-brand flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListMusic, { className: "w-14 h-14 text-primary/60" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "secondary",
            className: "mb-2 text-xs uppercase tracking-wider bg-muted text-muted-foreground",
            children: "Playlist"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground truncate flex-1 min-w-0", children: playlist.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: openEdit,
              "data-ocid": "playlist_detail.edit_button",
              "aria-label": "Edit playlist",
              className: "p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth shrink-0 mt-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 15 })
            }
          )
        ] }),
        playlist.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm leading-relaxed", children: playlist.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            playlistSongs.length,
            " ",
            playlistSongs.length === 1 ? "song" : "songs"
          ] }),
          playlistSongs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
              formatTotalDuration(playlistSongs)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-4 flex-wrap", children: [
          playlistSongs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => playQueue(playlistSongs),
              "data-ocid": "playlist_detail.play_button",
              className: "gap-2 glow-primary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 14, className: "fill-current" }),
                "Play All"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => {
                setAddSearch("");
                setAddOpen(true);
              },
              "data-ocid": "playlist_detail.add_song_button",
              className: "gap-2 border-border/50 hover:border-primary/30",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                "Add Songs"
              ]
            }
          )
        ] })
      ] })
    ] }),
    playlistSongs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "playlist_detail.empty_state",
        className: "text-center py-16 animate-fade-in",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListMusic, { className: "w-8 h-8 text-primary/60" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg", children: "No songs yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2 max-w-xs mx-auto", children: "Add songs from the library to get your playlist started." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "mt-4 gap-2",
              variant: "outline",
              "data-ocid": "playlist_detail.empty_add_button",
              onClick: () => {
                setAddSearch("");
                setAddOpen(true);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                "Add Songs"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card/30 rounded-2xl border border-border/30 overflow-hidden animate-fade-in",
        "data-ocid": "playlist_detail.song_list",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-4 py-2.5 border-b border-border/30 text-xs text-muted-foreground font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center shrink-0", children: "#" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 shrink-0", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block w-32 text-muted-foreground/60", children: "Artist" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-14 text-right flex items-center justify-end gap-1 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 shrink-0", "aria-hidden": true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: playlistSongs.map((song, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            PlaylistSongRow,
            {
              song,
              index: i,
              queue: playlistSongs,
              onRemove: () => handleRemove(song.id)
            },
            song.id.toString()
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: editOpen, onOpenChange: setEditOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "playlist_detail.edit_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Edit Playlist" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "edit-name",
              className: "text-sm font-medium text-foreground",
              children: [
                "Name ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "edit-name",
              value: editName,
              onChange: (e) => setEditName(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") handleSaveEdit();
              },
              "data-ocid": "playlist_detail.edit_name_input",
              className: "bg-muted border-border/50",
              autoFocus: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "edit-desc",
              className: "text-sm font-medium text-foreground",
              children: "Description"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "edit-desc",
              placeholder: "What's this playlist about?",
              value: editDesc,
              onChange: (e) => setEditDesc(e.target.value),
              "data-ocid": "playlist_detail.edit_description_input",
              className: "bg-muted border-border/50 resize-none",
              rows: 3
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            onClick: () => setEditOpen(false),
            "data-ocid": "playlist_detail.edit_cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSaveEdit,
            disabled: !editName.trim() || updatePlaylist.isPending,
            "data-ocid": "playlist_detail.edit_save_button",
            className: "glow-primary",
            children: updatePlaylist.isPending ? "Saving…" : "Save Changes"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: addOpen, onOpenChange: setAddOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        "data-ocid": "playlist_detail.add_dialog",
        className: "max-w-lg",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Add Songs" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search by title or artist…",
              value: addSearch,
              onChange: (e) => setAddSearch(e.target.value),
              "data-ocid": "playlist_detail.add_search_input",
              className: "bg-muted border-border/50"
            }
          ) }),
          filteredAvailableToAdd.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm py-4 text-center", children: addSearch ? "No songs match your search." : "All songs are already in this playlist." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5 max-h-80 overflow-y-auto", children: filteredAvailableToAdd.map((song, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `playlist_detail.add_song_item.${i + 1}`,
              className: "flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: song.coverArtUrl || "/assets/images/placeholder.svg",
                    alt: song.title,
                    className: "w-9 h-9 rounded-lg object-cover shrink-0",
                    onError: (e) => {
                      e.target.src = "/assets/images/placeholder.svg";
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: song.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: song.artist })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground tabular-nums shrink-0 mr-1", children: formatDuration(song.duration) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => handleAdd(song.id),
                    "data-ocid": `playlist_detail.add_song_confirm.${i + 1}`,
                    className: "shrink-0 gap-1 border-border/50 h-7 text-xs hover:border-primary/40",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }),
                      "Add"
                    ]
                  }
                )
              ]
            },
            song.id.toString()
          )) })
        ]
      }
    ) })
  ] });
}
function PlaylistSongRow({
  song,
  index,
  queue,
  onRemove
}) {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const isCurrent = (currentSong == null ? void 0 : currentSong.id) === song.id;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `playlist_detail.song.${index + 1}`,
      className: `group flex items-center gap-4 px-2 py-2.5 rounded-xl transition-smooth cursor-default ${isCurrent ? "bg-primary/10" : "hover:bg-card/60"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => playSong(song, queue),
            "aria-label": `Play ${song.title}`,
            className: "w-6 text-center shrink-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded",
            children: isCurrent && isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "now-playing-bars flex gap-0.5 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground group-hover:hidden tabular-nums select-none", children: index + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Play,
                {
                  size: 14,
                  className: "text-primary hidden group-hover:block mx-auto fill-current"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: song.coverArtUrl || "/assets/images/placeholder.svg",
            alt: song.album,
            className: "w-10 h-10 rounded-lg object-cover shrink-0",
            onError: (e) => {
              e.target.src = "/assets/images/placeholder.svg";
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-sm font-semibold truncate ${isCurrent ? "text-primary" : "text-foreground"}`,
              children: song.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: song.album })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block text-sm text-muted-foreground truncate w-32 min-w-0", children: song.artist }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground tabular-nums w-14 text-right shrink-0", children: formatDuration(song.duration) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `playlist_detail.remove_button.${index + 1}`,
            onClick: (e) => {
              e.stopPropagation();
              onRemove();
            },
            "aria-label": "Remove from playlist",
            className: "opacity-0 group-hover:opacity-100 transition-smooth p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive w-8 shrink-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
          }
        )
      ]
    }
  );
}
export {
  PlaylistDetailPage as default
};
