import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports, h as useComposedRefs, i as composeEventHandlers, k as createSlottable, l as createContextScope, n as cn, o as buttonVariants, p as useDeletePlaylist, L as Link, q as ListMusic, M as Music2, s as ue, u as useAuth, t as useListMyPlaylists, a as useListSongs, v as useGetUserTier, w as useCreatePlaylist, x as SubscriptionTier, g as Badge, B as Button, S as Skeleton } from "./index-DQ_lvAJx.js";
import { R as Root, T as Trigger, W as WarningProvider, C as Content, a as Title, D as Description, b as Close, c as createDialogScope, P as Portal, O as Overlay, d as Plus, e as Dialog, f as DialogContent, g as DialogHeader, h as DialogTitle, i as DialogFooter } from "./dialog-D1dOOiQf.js";
import { I as Input } from "./input-B7AhRLp5.js";
import { T as Trash2, a as Textarea } from "./textarea-eFsRg4Pf.js";
import { C as Crown } from "./crown-CuwJ2NbK.js";
import { S as Sparkles } from "./sparkles-CNRQKbLK.js";
import "./index-BJzkeLY7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Trigger2 = AlertDialogTrigger$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger2, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
function PlaylistCard({
  playlist,
  index,
  coverArtUrl
}) {
  const deletePlaylist = useDeletePlaylist();
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleConfirmDelete = () => {
    deletePlaylist.mutate(playlist.id, {
      onSuccess: () => ue.success("Playlist deleted"),
      onError: () => ue.error("Failed to delete playlist")
    });
  };
  const songCount = playlist.songIds.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative", "data-ocid": `playlists.card.${index + 1}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/playlists/$id",
        params: { id: playlist.id.toString() },
        className: "block bg-card border border-border/40 rounded-xl overflow-hidden transition-smooth hover:border-primary/30 hover:shadow-subtle hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square relative overflow-hidden bg-gradient-to-br from-muted to-card", children: [
            coverArtUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: coverArtUrl,
                alt: playlist.name,
                className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
                onError: (e) => {
                  e.target.style.display = "none";
                }
              }
            ) : null,
            !coverArtUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-brand flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-primary/20 blur-xl scale-150" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ListMusic, { className: "w-10 h-10 text-primary/70 relative" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg glow-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-5 h-5 text-primary-foreground ml-0.5" }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold font-display text-foreground truncate text-sm leading-tight", children: playlist.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              songCount,
              " ",
              songCount === 1 ? "song" : "songs"
            ] }),
            playlist.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed", children: playlist.description })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `playlists.delete_button.${index + 1}`,
          onClick: handleDelete,
          "aria-label": "Delete playlist",
          className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-smooth z-10 p-1.5 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-destructive hover:border-destructive/40 hover:bg-destructive/10",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": `playlists.delete_dialog.${index + 1}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display", children: "Delete Playlist?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
            '"',
            playlist.name,
            '" will be permanently deleted. This action cannot be undone.'
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDialogCancel,
            {
              "data-ocid": `playlists.delete_cancel.${index + 1}`,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDialogAction,
            {
              onClick: handleConfirmDelete,
              "data-ocid": `playlists.delete_confirm.${index + 1}`,
              className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              children: "Delete"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const FREE_PLAYLIST_LIMIT = 3;
function PlaylistsPage() {
  const { isAuthenticated } = useAuth();
  const { data: playlists = [], isLoading } = useListMyPlaylists();
  const { data: allSongs = [] } = useListSongs();
  const { data: tier } = useGetUserTier();
  const createPlaylist = useCreatePlaylist();
  const [open, setOpen] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [desc, setDesc] = reactExports.useState("");
  const isPremium = tier === SubscriptionTier.premium;
  const playlistCount = playlists.length;
  const atLimit = !isPremium && playlistCount >= FREE_PLAYLIST_LIMIT;
  const songMap = new Map(
    allSongs.map((s) => [s.id.toString(), s.coverArtUrl])
  );
  const getCoverArt = (playlistId) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    if (!playlist || playlist.songIds.length === 0) return void 0;
    const url = songMap.get(playlist.songIds[0].toString());
    return url || void 0;
  };
  const handleCreate = () => {
    if (!name.trim()) return;
    if (atLimit) {
      ue.error("Upgrade to Premium for unlimited playlists");
      return;
    }
    createPlaylist.mutate(
      { name: name.trim(), description: desc.trim() },
      {
        onSuccess: () => {
          ue.success("Playlist created");
          setOpen(false);
          setName("");
          setDesc("");
        },
        onError: () => ue.error("Failed to create playlist")
      }
    );
  };
  const openCreate = () => {
    if (atLimit) {
      ue.error(
        "You've reached the free plan limit of 3 playlists. Upgrade to Premium for unlimited playlists.",
        {
          action: {
            label: "Upgrade",
            onClick: () => window.location.assign("/account")
          },
          duration: 6e3
        }
      );
      return;
    }
    setOpen(true);
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Sign in to view your playlists." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-8", "data-ocid": "playlists.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-8 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground tracking-tight", children: "My Playlists" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Your personal music collections" }),
        !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border/50 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { size: 12 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: atLimit ? "text-destructive font-semibold" : "text-foreground font-semibold",
                  children: playlistCount
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                " / ",
                FREE_PLAYLIST_LIMIT,
                " playlists"
              ] })
            ] })
          ] }),
          atLimit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "secondary",
              "data-ocid": "playlists.limit_badge",
              className: "gap-1 bg-accent/15 text-accent border border-accent/30 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 10 }),
                "Upgrade for unlimited"
              ]
            }
          )
        ] }),
        isPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit text-xs text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Premium · Unlimited playlists" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: openCreate,
          "data-ocid": "playlists.create_button",
          disabled: atLimit,
          className: `gap-2 shrink-0 ${!atLimit ? "glow-primary" : ""}`,
          children: [
            atLimit ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
            atLimit ? "Limit Reached" : "New Playlist"
          ]
        }
      )
    ] }),
    atLimit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "playlists.upgrade_banner",
        className: "flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/25 mb-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 16, className: "text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "You've reached your free limit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Upgrade to Premium for unlimited playlists and more" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              "data-ocid": "playlists.upgrade_button",
              className: "shrink-0 border-accent/40 text-accent hover:bg-accent/10 gap-1.5",
              onClick: () => window.location.assign("/account"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 13 }),
                "Upgrade"
              ]
            }
          )
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4", children: ["a", "b", "c", "d", "e", "f"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
    ] }, k)) }) : playlists.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "playlists.empty_state",
        className: "text-center py-20 animate-fade-in",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-10 h-10 text-primary/60" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-semibold text-foreground", children: "No playlists yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm max-w-sm mx-auto", children: "Create a playlist to organize your favorite songs and build your personal library." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: openCreate,
              className: "mt-5 gap-2 glow-primary",
              "data-ocid": "playlists.empty_create_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
                "Create your first playlist"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-fade-in",
        "data-ocid": "playlists.grid",
        children: playlists.map((pl, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlaylistCard,
          {
            playlist: pl,
            index: i,
            coverArtUrl: getCoverArt(pl.id)
          },
          pl.id.toString()
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "playlists.create_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "New Playlist" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "pl-name",
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
              id: "pl-name",
              placeholder: "My Awesome Playlist",
              value: name,
              onChange: (e) => setName(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") handleCreate();
              },
              "data-ocid": "playlists.name_input",
              className: "bg-muted border-border/50",
              autoFocus: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "pl-desc",
              className: "text-sm font-medium text-foreground",
              children: "Description"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "pl-desc",
              placeholder: "What's this playlist about?",
              value: desc,
              onChange: (e) => setDesc(e.target.value),
              "data-ocid": "playlists.description_input",
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
            onClick: () => setOpen(false),
            "data-ocid": "playlists.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleCreate,
            disabled: !name.trim() || createPlaylist.isPending,
            "data-ocid": "playlists.submit_button",
            className: "glow-primary",
            children: createPlaylist.isPending ? "Creating…" : "Create Playlist"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  PlaylistsPage as default
};
