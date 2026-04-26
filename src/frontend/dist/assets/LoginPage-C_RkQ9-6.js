import { a6 as useInternetIdentity, j as jsxRuntimeExports, M as Music2, q as ListMusic, Z as Zap } from "./index-DQ_lvAJx.js";
import { H as Headphones } from "./headphones-0Q1oCdif.js";
function LoginPage() {
  const { login, isInitializing, isLoggingIn } = useInternetIdentity();
  const features = [
    {
      icon: Headphones,
      title: "Stream Anywhere",
      desc: "High-quality audio on any device"
    },
    {
      icon: ListMusic,
      title: "Your Playlists",
      desc: "Curate and organize your music"
    },
    {
      icon: Zap,
      title: "Premium Access",
      desc: "Unlock lyrics and exclusive content"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dark min-h-screen bg-background flex items-center justify-center p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md animate-slide-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-brand glow-primary flex items-center justify-center mb-4 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-8 h-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl font-display font-bold text-foreground tracking-tight", children: [
          "Sound",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Wave" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-center text-sm", children: "Your premium music streaming experience" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-8", children: features.map(({ icon: Icon, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 p-3.5 rounded-xl bg-card/50 border border-border/50",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4.5 h-4.5 text-primary", size: 18 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-display", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
            ] })
          ]
        },
        title
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: login,
          disabled: isInitializing || isLoggingIn,
          "data-ocid": "login.primary_button",
          className: "w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-base hover:opacity-90 disabled:opacity-50 transition-smooth glow-primary shadow-subtle flex items-center justify-center gap-2",
          children: isInitializing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }),
            "Loading…"
          ] }) : isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }),
            "Signing in…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { size: 18 }),
            "Sign in with Internet Identity"
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-4", children: "Secure, decentralized authentication powered by the Internet Computer." })
    ] })
  ] });
}
export {
  LoginPage as default
};
