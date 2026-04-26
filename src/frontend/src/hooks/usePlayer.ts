import { create } from "zustand";
import type { SongPublic } from "../backend.d";

export type { SongPublic as PlayerSong };

interface PlayerState {
  currentSong: SongPublic | null;
  queue: SongPublic[];
  queueIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;

  // Actions
  playSong: (song: SongPublic, queue?: SongPublic[]) => void;
  playQueue: (songs: SongPublic[], startIndex?: number) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsPlaying: (playing: boolean) => void;
}

export const usePlayer = create<PlayerState>((set, get) => ({
  currentSong: null,
  queue: [],
  queueIndex: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,

  playSong: (song, queue) => {
    const songs = queue ?? [song];
    const idx = songs.findIndex((s) => s.id === song.id);
    set({
      currentSong: song,
      queue: songs,
      queueIndex: idx >= 0 ? idx : 0,
      isPlaying: true,
      currentTime: 0,
    });
  },

  playQueue: (songs, startIndex = 0) => {
    if (!songs.length) return;
    set({
      currentSong: songs[startIndex],
      queue: songs,
      queueIndex: startIndex,
      isPlaying: true,
      currentTime: 0,
    });
  },

  togglePlay: () => {
    set((s) => ({ isPlaying: !s.isPlaying }));
  },

  pause: () => set({ isPlaying: false }),
  resume: () => set({ isPlaying: true }),

  next: () => {
    const { queue, queueIndex } = get();
    if (!queue.length) return;
    const nextIdx = (queueIndex + 1) % queue.length;
    set({
      currentSong: queue[nextIdx],
      queueIndex: nextIdx,
      isPlaying: true,
      currentTime: 0,
    });
  },

  prev: () => {
    const { queue, queueIndex, currentTime } = get();
    if (!queue.length) return;
    // If more than 3s in, restart current song
    if (currentTime > 3) {
      set({ currentTime: 0 });
      return;
    }
    const prevIdx = (queueIndex - 1 + queue.length) % queue.length;
    set({
      currentSong: queue[prevIdx],
      queueIndex: prevIdx,
      isPlaying: true,
      currentTime: 0,
    });
  },

  seek: (time) => {
    set({ currentTime: time });
  },

  setVolume: (volume) => set({ volume }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}));

// Audio element singleton — managed outside React
let audioEl: HTMLAudioElement | null = null;

export function getAudioElement(): HTMLAudioElement {
  if (!audioEl) {
    audioEl = new Audio();
    audioEl.preload = "metadata";

    // Wire audio events back to store
    audioEl.addEventListener("timeupdate", () => {
      usePlayer.getState().setCurrentTime(audioEl!.currentTime);
    });
    audioEl.addEventListener("durationchange", () => {
      usePlayer.getState().setDuration(audioEl!.duration || 0);
    });
    audioEl.addEventListener("ended", () => {
      usePlayer.getState().next();
    });
    audioEl.addEventListener("play", () => {
      usePlayer.getState().setIsPlaying(true);
    });
    audioEl.addEventListener("pause", () => {
      usePlayer.getState().setIsPlaying(false);
    });
  }
  return audioEl;
}

// Subscribe to store changes to drive the audio element
usePlayer.subscribe((state, prev) => {
  const audio = getAudioElement();

  // Song changed
  if (state.currentSong !== prev.currentSong && state.currentSong) {
    audio.src = state.currentSong.audioUrl;
    audio.load();
    if (state.isPlaying) {
      audio.play().catch(() => {});
    }
  }

  // Play/pause toggled
  if (state.isPlaying !== prev.isPlaying) {
    if (state.isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }

  // Seek requested (detect by comparing times with tolerance)
  if (
    state.currentTime !== prev.currentTime &&
    Math.abs(state.currentTime - audio.currentTime) > 1.5
  ) {
    audio.currentTime = state.currentTime;
  }

  // Volume
  if (state.volume !== prev.volume) {
    audio.volume = state.volume;
  }
});
