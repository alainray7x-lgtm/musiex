import { c as createLucideIcon, K as useNavigate, u as useAuth, a as useListSongs, V as useAddSong, W as useEditSong, Y as useDeleteSong, _ as useSetStripeConfiguration, R as useIsStripeConfigured, r as reactExports, s as ue, j as jsxRuntimeExports, U as Shield, g as Badge, B as Button, M as Music2, S as Skeleton } from "./index-DQ_lvAJx.js";
import { d as Plus, e as Dialog, f as DialogContent, g as DialogHeader, h as DialogTitle, j as DialogDescription, i as DialogFooter } from "./dialog-D1dOOiQf.js";
import { I as Input } from "./input-B7AhRLp5.js";
import { T as Trash2, a as Textarea } from "./textarea-eFsRg4Pf.js";
import "./index-BJzkeLY7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$1);
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
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode);
const EMPTY_SONG = {
  title: "",
  artist: "",
  album: "",
  duration: BigInt(0),
  coverArtUrl: "",
  audioUrl: "",
  lyrics: ""
};
function SongForm({
  initial,
  onSave,
  onCancel,
  isPending
}) {
  const [form, setForm] = reactExports.useState(initial);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.title && form.artist && form.audioUrl;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "sf-title",
            className: "text-xs font-medium text-muted-foreground",
            children: "Title *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "sf-title",
            value: form.title,
            onChange: (e) => set("title", e.target.value),
            placeholder: "Song title",
            className: "bg-muted border-border/50",
            "data-ocid": "admin.song_form.title_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "sf-artist",
            className: "text-xs font-medium text-muted-foreground",
            children: "Artist *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "sf-artist",
            value: form.artist,
            onChange: (e) => set("artist", e.target.value),
            placeholder: "Artist name",
            className: "bg-muted border-border/50",
            "data-ocid": "admin.song_form.artist_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "sf-album",
            className: "text-xs font-medium text-muted-foreground",
            children: "Album"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "sf-album",
            value: form.album,
            onChange: (e) => set("album", e.target.value),
            placeholder: "Album name",
            className: "bg-muted border-border/50",
            "data-ocid": "admin.song_form.album_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "sf-duration",
            className: "text-xs font-medium text-muted-foreground",
            children: "Duration (seconds)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "sf-duration",
            type: "number",
            value: Number(form.duration),
            onChange: (e) => set("duration", BigInt(e.target.value || "0")),
            placeholder: "240",
            className: "bg-muted border-border/50",
            "data-ocid": "admin.song_form.duration_input"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "sf-audio",
          className: "text-xs font-medium text-muted-foreground",
          children: "Audio URL *"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "sf-audio",
          value: form.audioUrl,
          onChange: (e) => set("audioUrl", e.target.value),
          placeholder: "https://...",
          className: "bg-muted border-border/50",
          "data-ocid": "admin.song_form.audio_url_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "sf-cover",
          className: "text-xs font-medium text-muted-foreground",
          children: "Cover Art URL"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "sf-cover",
          value: form.coverArtUrl,
          onChange: (e) => set("coverArtUrl", e.target.value),
          placeholder: "https://...",
          className: "bg-muted border-border/50",
          "data-ocid": "admin.song_form.cover_url_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "sf-lyrics",
          className: "text-xs font-medium text-muted-foreground",
          children: "Lyrics"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "sf-lyrics",
          value: form.lyrics,
          onChange: (e) => set("lyrics", e.target.value),
          placeholder: "Paste song lyrics here…",
          className: "bg-muted border-border/50 resize-none",
          rows: 5,
          "data-ocid": "admin.song_form.lyrics_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          onClick: onCancel,
          "data-ocid": "admin.song_form.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => onSave(form),
          disabled: !valid || isPending,
          "data-ocid": "admin.song_form.save_button",
          children: isPending ? "Saving…" : "Save Song"
        }
      )
    ] })
  ] });
}
function DeleteConfirmDialog({
  song,
  onConfirm,
  onCancel,
  isPending
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!song, onOpenChange: (v) => !v && onCancel(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "dark sm:max-w-sm bg-card border-border",
      "data-ocid": "admin.delete_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-destructive", children: "Delete Song?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: song == null ? void 0 : song.title }),
            " ",
            "will be permanently removed. This cannot be undone."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              onClick: onCancel,
              disabled: isPending,
              "data-ocid": "admin.delete_cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "destructive",
              onClick: onConfirm,
              disabled: isPending,
              "data-ocid": "admin.delete_confirm_button",
              children: isPending ? "Deleting…" : "Delete"
            }
          )
        ] })
      ]
    }
  ) });
}
function AdminPage() {
  const navigate = useNavigate();
  const { isAdmin, isAuthenticated } = useAuth();
  const { data: songs = [], isLoading } = useListSongs();
  const addSong = useAddSong();
  const editSong = useEditSong();
  const deleteSong = useDeleteSong();
  const setStripe = useSetStripeConfiguration();
  const { data: stripeConfigured } = useIsStripeConfigured();
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [editSongId, setEditSongId] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [stripeKey, setStripeKey] = reactExports.useState("");
  const [editingStripe, setEditingStripe] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isAuthenticated) return;
    if (isAdmin === false) {
      ue.error("Access denied — admins only.");
      navigate({ to: "/" });
    }
  }, [isAdmin, isAuthenticated, navigate]);
  const editingSong = songs.find((s) => s.id === editSongId);
  const handleAdd = (input) => {
    addSong.mutate(input, {
      onSuccess: () => {
        ue.success("Song added successfully.");
        setAddOpen(false);
      },
      onError: () => ue.error("Failed to add song.")
    });
  };
  const handleEdit = (input) => {
    if (!editSongId) return;
    editSong.mutate(
      { id: editSongId, input },
      {
        onSuccess: () => {
          ue.success("Song updated successfully.");
          setEditSongId(null);
        },
        onError: () => ue.error("Failed to update song.")
      }
    );
  };
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteSong.mutate(deleteTarget.id, {
      onSuccess: () => {
        ue.success(`"${deleteTarget.title}" deleted.`);
        setDeleteTarget(null);
      },
      onError: () => {
        ue.error("Failed to delete song.");
        setDeleteTarget(null);
      }
    });
  };
  const handleStripe = () => {
    if (!stripeKey.trim()) return;
    setStripe.mutate(
      {
        secretKey: stripeKey.trim(),
        allowedCountries: ["US", "GB", "CA", "AU", "DE", "FR"]
      },
      {
        onSuccess: () => {
          ue.success("Stripe configured successfully.");
          setEditingStripe(false);
          setStripeKey("");
        },
        onError: () => ue.error("Failed to configure Stripe.")
      }
    );
  };
  if (!isAdmin) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-8 max-w-4xl", "data-ocid": "admin.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-accent" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground tracking-tight", children: "Admin Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Manage songs, settings, and subscriptions" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "bg-card rounded-2xl border border-border/50 p-5 mb-6",
        "data-ocid": "admin.stripe_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 16, className: "text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Stripe Configuration" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: stripeConfigured ? "border-primary/40 text-primary bg-primary/10" : "border-border/50 text-muted-foreground",
                children: stripeConfigured ? "Configured" : "Not configured"
              }
            )
          ] }),
          editingStripe ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "stripe-key",
                  className: "text-xs font-medium text-muted-foreground",
                  children: "Stripe Secret Key"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "stripe-key",
                  type: "password",
                  value: stripeKey,
                  onChange: (e) => setStripeKey(e.target.value),
                  placeholder: "sk_live_...",
                  className: "bg-muted border-border/50 font-mono text-sm",
                  "data-ocid": "admin.stripe_key_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  onClick: handleStripe,
                  disabled: !stripeKey.trim() || setStripe.isPending,
                  "data-ocid": "admin.stripe_save_button",
                  children: setStripe.isPending ? "Saving…" : "Save"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: () => setEditingStripe(false),
                  "data-ocid": "admin.stripe_cancel_button",
                  children: "Cancel"
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => setEditingStripe(true),
              className: "border-border/50",
              "data-ocid": "admin.stripe_edit_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 13, className: "mr-1.5" }),
                stripeConfigured ? "Update Key" : "Configure Stripe"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "bg-card rounded-2xl border border-border/50 overflow-hidden",
        "data-ocid": "admin.songs_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { size: 16, className: "text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Songs Library" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs border-border/50 text-muted-foreground",
                  children: [
                    songs.length,
                    " songs"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: () => setAddOpen(true),
                className: "gap-1.5",
                "data-ocid": "admin.add_song_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                  "Add Song"
                ]
              }
            )
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", "data-ocid": "admin.songs_loading_state", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" })
            ] })
          ] }, k)) }) : songs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "admin.songs_empty_state",
              className: "text-center py-16",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No songs yet. Add the first one!" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3", children: songs.map((song, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `admin.song.item.${i + 1}`,
              className: "group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors duration-150",
              children: [
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: song.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                    song.artist,
                    song.album ? ` · ${song.album}` : ""
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      onClick: () => setEditSongId(song.id),
                      "aria-label": `Edit ${song.title}`,
                      "data-ocid": `admin.edit_song_button.${i + 1}`,
                      className: "h-7 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 13 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      onClick: () => setDeleteTarget(song),
                      "aria-label": `Delete ${song.title}`,
                      "data-ocid": `admin.delete_song_button.${i + 1}`,
                      className: "h-7 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                    }
                  )
                ] })
              ]
            },
            song.id.toString()
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: addOpen, onOpenChange: setAddOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        "data-ocid": "admin.add_song_dialog",
        className: "dark max-w-xl bg-card border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Add New Song" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SongForm,
            {
              initial: EMPTY_SONG,
              onSave: handleAdd,
              onCancel: () => setAddOpen(false),
              isPending: addSong.isPending
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editSongId, onOpenChange: () => setEditSongId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        "data-ocid": "admin.edit_song_dialog",
        className: "dark max-w-xl bg-card border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Edit Song" }) }),
          editingSong && /* @__PURE__ */ jsxRuntimeExports.jsx(
            SongForm,
            {
              initial: {
                title: editingSong.title,
                artist: editingSong.artist,
                album: editingSong.album,
                duration: editingSong.duration,
                coverArtUrl: editingSong.coverArtUrl,
                audioUrl: editingSong.audioUrl,
                lyrics: editingSong.lyrics
              },
              onSave: handleEdit,
              onCancel: () => setEditSongId(null),
              isPending: editSong.isPending
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirmDialog,
      {
        song: deleteTarget,
        onConfirm: handleDeleteConfirm,
        onCancel: () => setDeleteTarget(null),
        isPending: deleteSong.isPending
      }
    )
  ] });
}
export {
  AdminPage as default
};
