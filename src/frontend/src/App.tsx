import { Toaster } from "@/components/ui/sonner";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import { useAuth } from "./hooks/useAuth";

import { Skeleton } from "@/components/ui/skeleton";
// ─── Lazy pages ───────────────────────────────────────────────────────────────
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const BrowsePage = lazy(() => import("./pages/BrowsePage"));
const PlaylistsPage = lazy(() => import("./pages/PlaylistsPage"));
const PlaylistDetailPage = lazy(() => import("./pages/PlaylistDetailPage"));
const SongDetailPage = lazy(() => import("./pages/SongDetailPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

function PageLoader() {
  return (
    <div className="p-8 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="grid grid-cols-4 gap-4 mt-6">
        {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => (
          <Skeleton key={k} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// ─── Root route ───────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { isAuthenticated, isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="dark flex items-center justify-center h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">Loading Musiex…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<div className="dark h-screen bg-background" />}>
        <LoginPage />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Layout />
      <Toaster position="bottom-right" richColors />
    </Suspense>
  );
}

// ─── Routes ───────────────────────────────────────────────────────────────────
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/browse",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BrowsePage />
    </Suspense>
  ),
});

const playlistsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/playlists",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PlaylistsPage />
    </Suspense>
  ),
});

const playlistDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/playlists/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PlaylistDetailPage />
    </Suspense>
  ),
});

const songDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/songs/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SongDetailPage />
    </Suspense>
  ),
});

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AccountPage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminGuard,
});

function AdminGuard() {
  const { isAdmin, isAuthenticated } = useAuth();
  if (!isAuthenticated) return null;
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center gap-4 p-8">
        <div className="text-5xl">🔒</div>
        <h2 className="text-2xl font-display font-bold">Access Denied</h2>
        <p className="text-muted-foreground">This area is for admins only.</p>
      </div>
    );
  }
  return (
    <Suspense fallback={<PageLoader />}>
      <AdminPage />
    </Suspense>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  homeRoute,
  browseRoute,
  playlistsRoute,
  playlistDetailRoute,
  songDetailRoute,
  accountRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
