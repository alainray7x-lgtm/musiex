import type { Principal } from "@icp-sdk/core/principal";

export type SongId = bigint;
export type PlaylistId = bigint;
export type UserId = Principal;
export type Timestamp = bigint;

export enum SubscriptionTier {
  premium = "premium",
  free = "free",
}

export enum UserRole {
  admin = "admin",
  user = "user",
  guest = "guest",
}

export interface Song {
  id: SongId;
  title: string;
  artist: string;
  album: string;
  duration: bigint;
  coverArtUrl: string;
  audioUrl: string;
  lyrics: string;
  createdAt: Timestamp;
}

export interface SongInput {
  title: string;
  artist: string;
  album: string;
  duration: bigint;
  coverArtUrl: string;
  audioUrl: string;
  lyrics: string;
}

export interface Playlist {
  id: PlaylistId;
  owner: UserId;
  name: string;
  description: string;
  songIds: SongId[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface PlaylistInput {
  name: string;
  description: string;
}

export interface UserProfile {
  id: UserId;
  name: string;
  tier: SubscriptionTier;
  createdAt: Timestamp;
}
