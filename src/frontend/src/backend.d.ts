import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PlaylistInput {
    name: string;
    description: string;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type SongId = bigint;
export interface Playlist {
    id: PlaylistId;
    owner: UserId;
    name: string;
    createdAt: Timestamp;
    description: string;
    updatedAt: Timestamp;
    songIds: Array<SongId>;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface SongPublic {
    id: SongId;
    title: string;
    duration: bigint;
    album: string;
    lyrics: string;
    createdAt: Timestamp;
    audioUrl: string;
    coverArtUrl: string;
    artist: string;
}
export type UserId = Principal;
export interface http_header {
    value: string;
    name: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Song {
    id: SongId;
    title: string;
    duration: bigint;
    album: string;
    lyrics: string;
    createdAt: Timestamp;
    audioUrl: string;
    coverArtUrl: string;
    artist: string;
}
export type PlaylistId = bigint;
export interface SongInput {
    title: string;
    duration: bigint;
    album: string;
    lyrics: string;
    audioUrl: string;
    coverArtUrl: string;
    artist: string;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface UserProfile {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    tier: SubscriptionTier;
}
export enum SubscriptionTier {
    premium = "premium",
    free = "free"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addSong(input: SongInput): Promise<Song>;
    addSongToPlaylist(playlistId: PlaylistId, songId: SongId): Promise<Playlist | null>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    confirmPremiumUpgrade(sessionId: string): Promise<boolean>;
    createCheckoutSession(successUrl: string, cancelUrl: string): Promise<string>;
    createPlaylist(input: PlaylistInput): Promise<Playlist>;
    deletePlaylist(id: PlaylistId): Promise<boolean>;
    deleteSong(id: SongId): Promise<boolean>;
    editSong(id: SongId, input: SongInput): Promise<Song | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPlaylist(id: PlaylistId): Promise<Playlist | null>;
    getSong(id: SongId): Promise<SongPublic | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: UserId): Promise<UserProfile | null>;
    getUserTier(): Promise<SubscriptionTier>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listMyPlaylists(): Promise<Array<Playlist>>;
    listSongs(): Promise<Array<SongPublic>>;
    removeSongFromPlaylist(playlistId: PlaylistId, songId: SongId): Promise<Playlist | null>;
    saveCallerUserProfile(name: string): Promise<UserProfile>;
    searchSongs(searchTerm: string): Promise<Array<SongPublic>>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updatePlaylist(id: PlaylistId, input: PlaylistInput): Promise<Playlist | null>;
    upgradeUserTier(): Promise<boolean>;
}
