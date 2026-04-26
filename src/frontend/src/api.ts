import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "./backend";
import type { SongPublic, StripeSessionStatus, UserRole } from "./backend.d.ts";
import type {
  Playlist,
  PlaylistInput,
  Song,
  SongInput,
  SubscriptionTier,
  UserProfile,
} from "./types";

// ─── Songs ───────────────────────────────────────────────────────────────────

export function useListSongs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SongPublic[]>({
    queryKey: ["songs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSongs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchSongs(term: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SongPublic[]>({
    queryKey: ["songs", "search", term],
    queryFn: async () => {
      if (!actor || !term.trim()) return [];
      return actor.searchSongs(term);
    },
    enabled: !!actor && !isFetching && term.trim().length > 0,
  });
}

export function useGetSong(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SongPublic | null>({
    queryKey: ["song", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getSong(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useAddSong() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: SongInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addSong(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["songs"] });
    },
  });
}

export function useEditSong() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: bigint; input: SongInput }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.editSong(id, input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["songs"] });
    },
  });
}

export function useDeleteSong() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteSong(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["songs"] });
    },
  });
}

// ─── Playlists ────────────────────────────────────────────────────────────────

export function useListMyPlaylists() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Playlist[]>({
    queryKey: ["playlists", "mine"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyPlaylists() as Promise<Playlist[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPlaylist(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Playlist | null>({
    queryKey: ["playlist", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getPlaylist(id) as Promise<Playlist | null>;
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreatePlaylist() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: PlaylistInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createPlaylist(input) as Promise<Playlist>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["playlists"] });
    },
  });
}

export function useUpdatePlaylist() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: bigint; input: PlaylistInput }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePlaylist(id, input) as Promise<Playlist | null>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["playlists"] });
    },
  });
}

export function useDeletePlaylist() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deletePlaylist(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["playlists"] });
    },
  });
}

export function useAddSongToPlaylist() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      playlistId,
      songId,
    }: { playlistId: bigint; songId: bigint }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addSongToPlaylist(
        playlistId,
        songId,
      ) as Promise<Playlist | null>;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["playlist", vars.playlistId.toString()],
      });
    },
  });
}

export function useRemoveSongFromPlaylist() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      playlistId,
      songId,
    }: { playlistId: bigint; songId: bigint }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.removeSongFromPlaylist(
        playlistId,
        songId,
      ) as Promise<Playlist | null>;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["playlist", vars.playlistId.toString()],
      });
    },
  });
}

// ─── User / Auth ──────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile() as Promise<UserProfile | null>;
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(name) as Promise<UserProfile>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserRole>({
    queryKey: ["callerUserRole"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useGetUserTier() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SubscriptionTier>({
    queryKey: ["userTier"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      const tier = await actor.getUserTier();
      return tier as unknown as SubscriptionTier;
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Stripe / Premium ─────────────────────────────────────────────────────────

export function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: ({
      successUrl,
      cancelUrl,
    }: { successUrl: string; cancelUrl: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createCheckoutSession(successUrl, cancelUrl);
    },
  });
}

export function useConfirmPremiumUpgrade() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.confirmPremiumUpgrade(sessionId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userTier"] });
      qc.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useGetStripeSessionStatus(sessionId: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<StripeSessionStatus | null>({
    queryKey: ["stripeSession", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return null;
      return actor.getStripeSessionStatus(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
  });
}

export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["stripeConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export function useAssignCallerUserRole() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      user,
      role,
    }: {
      user: import("@icp-sdk/core/principal").Principal;
      role: UserRole;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.assignCallerUserRole(user, role);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["callerUserRole"] });
    },
  });
}

export function useSetStripeConfiguration() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (config: { secretKey: string; allowedCountries: string[] }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setStripeConfiguration(config);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["stripeConfigured"] });
    },
  });
}
