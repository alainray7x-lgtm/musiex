import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, G as createSlot, H as shimExports, I as useLayoutEffect2, n as cn, J as useSearch, K as useNavigate, N as useGetStripeSessionStatus, X, u as useAuth, O as useSaveCallerUserProfile, S as Skeleton, g as Badge, B as Button, v as useGetUserTier, Q as useGetCallerUserProfile, R as useIsStripeConfigured, T as useCreateCheckoutSession, x as SubscriptionTier, s as ue, M as Music2, q as ListMusic, Z as Zap, U as Shield } from "./index-DQ_lvAJx.js";
import { u as useCallbackRef } from "./index-BJzkeLY7.js";
import { I as Input } from "./input-B7AhRLp5.js";
import { C as CircleCheck } from "./circle-check-BHiDTcpn.js";
import { C as Crown } from "./crown-CuwJ2NbK.js";
import { H as Headphones } from "./headphones-0Q1oCdif.js";
import { S as Sparkles } from "./sparkles-CNRQKbLK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$1);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
function useIsHydrated() {
  return shimExports.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
function subscribe() {
  return () => {
  };
}
var AVATAR_NAME = "Avatar";
var [createAvatarContext] = createContextScope(AVATAR_NAME);
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, ...avatarProps } = props;
    const [imageLoadingStatus, setImageLoadingStatus] = reactExports.useState("idle");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AvatarProvider,
      {
        scope: __scopeAvatar,
        imageLoadingStatus,
        onImageLoadingStatusChange: setImageLoadingStatus,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...avatarProps, ref: forwardedRef })
      }
    );
  }
);
Avatar$1.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, src, onLoadingStatusChange = () => {
    }, ...imageProps } = props;
    const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
    const imageLoadingStatus = useImageLoadingStatus(src, imageProps);
    const handleLoadingStatusChange = useCallbackRef((status) => {
      onLoadingStatusChange(status);
      context.onImageLoadingStatusChange(status);
    });
    useLayoutEffect2(() => {
      if (imageLoadingStatus !== "idle") {
        handleLoadingStatusChange(imageLoadingStatus);
      }
    }, [imageLoadingStatus, handleLoadingStatusChange]);
    return imageLoadingStatus === "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.img, { ...imageProps, ref: forwardedRef, src }) : null;
  }
);
AvatarImage.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, delayMs, ...fallbackProps } = props;
    const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
    const [canRender, setCanRender] = reactExports.useState(delayMs === void 0);
    reactExports.useEffect(() => {
      if (delayMs !== void 0) {
        const timerId = window.setTimeout(() => setCanRender(true), delayMs);
        return () => window.clearTimeout(timerId);
      }
    }, [delayMs]);
    return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...fallbackProps, ref: forwardedRef }) : null;
  }
);
AvatarFallback$1.displayName = FALLBACK_NAME;
function resolveLoadingStatus(image, src) {
  if (!image) {
    return "idle";
  }
  if (!src) {
    return "error";
  }
  if (image.src !== src) {
    image.src = src;
  }
  return image.complete && image.naturalWidth > 0 ? "loaded" : "loading";
}
function useImageLoadingStatus(src, { referrerPolicy, crossOrigin }) {
  const isHydrated = useIsHydrated();
  const imageRef = reactExports.useRef(null);
  const image = (() => {
    if (!isHydrated) return null;
    if (!imageRef.current) {
      imageRef.current = new window.Image();
    }
    return imageRef.current;
  })();
  const [loadingStatus, setLoadingStatus] = reactExports.useState(
    () => resolveLoadingStatus(image, src)
  );
  useLayoutEffect2(() => {
    setLoadingStatus(resolveLoadingStatus(image, src));
  }, [image, src]);
  useLayoutEffect2(() => {
    const updateStatus = (status) => () => {
      setLoadingStatus(status);
    };
    if (!image) return;
    const handleLoad = updateStatus("loaded");
    const handleError = updateStatus("error");
    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    if (typeof crossOrigin === "string") {
      image.crossOrigin = crossOrigin;
    }
    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    };
  }, [image, crossOrigin, referrerPolicy]);
  return loadingStatus;
}
var Root$2 = Avatar$1;
var Fallback = AvatarFallback$1;
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$2,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
var NAME$1 = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME$1;
var Root$1 = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$1,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const PREMIUM_PERKS = [
  { icon: Music2, label: "Full lyrics for every track" },
  { icon: Headphones, label: "High-quality audio streaming" },
  { icon: ListMusic, label: "Unlimited playlists" },
  { icon: Zap, label: "Ad-free listening experience" },
  { icon: Shield, label: "Exclusive early-access features" }
];
function StripeReturnBanner() {
  const search = useSearch({ strict: false });
  const navigate = useNavigate();
  const sessionId = search.session_id ?? null;
  const cancelled = search.cancelled === "true";
  const statusQuery = useGetStripeSessionStatus(sessionId);
  function dismiss() {
    navigate({ to: "/account", replace: true });
  }
  reactExports.useEffect(() => {
    if (!sessionId && !cancelled) return;
    const t = setTimeout(dismiss, 1e4);
    return () => clearTimeout(t);
  });
  if (!sessionId && !cancelled) return null;
  if (cancelled) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "account.cancel_state",
        className: "flex items-center justify-between gap-3 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: "Checkout was cancelled — no charges were made." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "account.close_button",
              onClick: dismiss,
              className: "text-destructive hover:text-destructive/70 transition-colors",
              "aria-label": "Dismiss",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ]
      }
    );
  }
  const statusData = statusQuery.data;
  const isSuccess = (statusData == null ? void 0 : statusData.status) === "complete" || (statusData == null ? void 0 : statusData.status) === "paid";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "account.success_state",
      className: "flex items-center justify-between gap-3 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          statusQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 shrink-0 border-2 border-primary/40 border-t-primary rounded-full animate-spin" }) : isSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 shrink-0 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 shrink-0 border-2 border-primary/40 border-t-primary rounded-full animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: statusQuery.isLoading ? "Confirming your upgrade…" : isSuccess ? "🎉 Welcome to Premium! Your account has been upgraded." : "Processing payment — this may take a moment." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "account.close_button",
            onClick: dismiss,
            className: "text-muted-foreground hover:text-foreground transition-colors",
            "aria-label": "Dismiss",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}
function ProfileSection() {
  const { profile, profileLoading, isPremium, principalText, logout } = useAuth();
  const saveProfile = useSaveCallerUserProfile();
  const [editName, setEditName] = reactExports.useState("");
  const [editing, setEditing] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (profile == null ? void 0 : profile.name) setEditName(profile.name);
  }, [profile == null ? void 0 : profile.name]);
  const displayName = (profile == null ? void 0 : profile.name) ?? "Listener";
  const initials = displayName.slice(0, 2).toUpperCase();
  async function handleSave() {
    if (!editName.trim()) return;
    try {
      await saveProfile.mutateAsync(editName.trim());
      setEditing(false);
      ue.success("Profile saved!");
    } catch {
      ue.error("Failed to save profile.");
    }
  }
  function startEdit() {
    setEditName((profile == null ? void 0 : profile.name) ?? "");
    setEditing(true);
  }
  function cancelEdit() {
    setEditName((profile == null ? void 0 : profile.name) ?? "");
    setEditing(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "account.profile_section", className: "bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg font-display", children: "Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your identity on SoundWave" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-14 w-14 ring-2 ring-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/20 text-primary font-display font-bold text-lg", children: profileLoading ? "…" : initials }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32 mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate", children: displayName }),
          isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              "data-ocid": "account.tier_badge",
              variant: "outline",
              className: "mt-1 bg-primary/15 text-primary border-primary/40 gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3 w-3" }),
                "Premium"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              "data-ocid": "account.tier_badge",
              variant: "secondary",
              className: "mt-1",
              children: "Free"
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "display-name",
            className: "text-xs text-muted-foreground uppercase tracking-wider",
            children: "Display Name"
          }
        ),
        editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "display-name",
              "data-ocid": "account.name_input",
              value: editName,
              onChange: (e) => setEditName(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") cancelEdit();
              },
              className: "bg-input border-border",
              maxLength: 64,
              autoFocus: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "account.save_button",
              size: "sm",
              onClick: handleSave,
              disabled: saveProfile.isPending || !editName.trim(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-1" }),
                saveProfile.isPending ? "Saving…" : "Save"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "account.cancel_button",
              size: "sm",
              variant: "ghost",
              onClick: cancelEdit,
              children: "Cancel"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28 inline-block" }) : (profile == null ? void 0 : profile.name) ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "Not set" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "account.edit_button",
              size: "sm",
              variant: "ghost",
              className: "h-7 px-2 text-xs text-muted-foreground hover:text-foreground",
              onClick: startEdit,
              children: "Edit"
            }
          )
        ] })
      ] }),
      principalText && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Internet Identity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground break-all leading-relaxed bg-muted/50 rounded-lg px-3 py-2", children: principalText })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "account.logout_button",
          variant: "ghost",
          className: "w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
          onClick: logout,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            "Sign Out"
          ]
        }
      )
    ] })
  ] });
}
function PremiumActivePanel() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "account.premium_panel",
      className: "rounded-xl border border-primary/30 bg-gradient-to-br from-primary/15 via-accent/8 to-transparent p-5 space-y-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-5 w-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: "Premium Active" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Full access to every SoundWave feature" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: PREMIUM_PERKS.map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: label })
        ] }, label)) })
      ]
    }
  );
}
function FreeUpgradePanel({
  onUpgrade,
  isLoading,
  stripeAvailable
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "account.upgrade_panel",
      className: "rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent p-5 space-y-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: "Go Premium" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Unlock the full SoundWave experience." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "border-accent/50 text-accent bg-accent/10 shrink-0",
              children: "$9.99 / mo"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: PREMIUM_PERKS.map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-accent/70 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label })
        ] }, label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/30" }),
        stripeAvailable ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "account.upgrade_button",
            className: "w-full gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-card font-semibold",
            onClick: onUpgrade,
            disabled: isLoading,
            children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 border-2 border-card/40 border-t-card rounded-full animate-spin" }),
              "Redirecting to Checkout…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4" }),
              "Upgrade to Premium"
            ] })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            "data-ocid": "account.stripe_unavailable",
            className: "text-center text-sm text-muted-foreground py-1",
            children: "Payment setup pending — check back soon."
          }
        )
      ]
    }
  );
}
function SubscriptionSection() {
  var _a;
  const tierQuery = useGetUserTier();
  const profileQuery = useGetCallerUserProfile();
  const stripeConfigured = useIsStripeConfigured();
  const createSession = useCreateCheckoutSession();
  const tierValue = tierQuery.data;
  const profileTier = (_a = profileQuery.data) == null ? void 0 : _a.tier;
  const isPremium = tierValue === SubscriptionTier.premium || tierValue === "premium" || profileTier === "premium";
  async function handleUpgrade() {
    const base = `${window.location.origin}/account`;
    try {
      const url = await createSession.mutateAsync({
        successUrl: `${base}?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${base}?cancelled=true`
      });
      if (url && typeof url === "string") {
        window.location.href = url;
      } else {
        ue.error("Could not start checkout. Please try again.");
      }
    } catch {
      ue.error("Checkout failed. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      "data-ocid": "account.subscription_section",
      className: "bg-card border-border",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg font-display flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-5 w-5 text-accent" }),
            "Subscription"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: tierQuery.isLoading ? "Loading subscription info…" : isPremium ? "You're enjoying all Premium benefits" : "Upgrade to unlock the full SoundWave experience" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: tierQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-xl" })
        ] }) : isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsx(PremiumActivePanel, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          FreeUpgradePanel,
          {
            onUpgrade: handleUpgrade,
            isLoading: createSession.isPending,
            stripeAvailable: stripeConfigured.data ?? false
          }
        ) })
      ]
    }
  );
}
function AccountPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "account.page",
      className: "min-h-full bg-background px-6 py-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground tracking-tight", children: "Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Manage your profile and subscription" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StripeReturnBanner, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSection, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionSection, {})
        ] })
      ]
    }
  );
}
export {
  AccountPage as default
};
