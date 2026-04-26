import { create } from "zustand";
import type { SongPublic } from "../backend.d";

interface LyricsModalState {
  song: SongPublic | null;
  open: boolean;
  openSong: (song: SongPublic) => void;
  close: () => void;
}

export const useLyricsModal = create<LyricsModalState>((set) => ({
  song: null,
  open: false,
  openSong: (song) => set({ song, open: true }),
  close: () => set({ open: false }),
}));
