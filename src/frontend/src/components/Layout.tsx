import { usePlayer } from "@/hooks/usePlayer";
import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { LyricsModal } from "./LyricsModal";
import { MiniPlayer } from "./MiniPlayer";
import { MobileHeader } from "./MobileHeader";
import { Sidebar } from "./Sidebar";

export function Layout() {
  const { currentSong } = usePlayer();
  const hasPlayer = !!currentSong;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="dark flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop Sidebar — always visible ≥ md */}
      <div className="hidden md:flex">
        <Sidebar onNavigate={() => {}} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          aria-hidden="true"
          onClick={closeSidebar}
          onKeyDown={(e) => e.key === "Escape" && closeSidebar()}
          role="presentation"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
      )}

      {/* Mobile Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full z-50 md:hidden transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!sidebarOpen}
      >
        <Sidebar onNavigate={closeSidebar} />
      </div>

      {/* Main Content */}
      <main
        className="flex-1 flex flex-col min-w-0 overflow-hidden"
        style={{ paddingBottom: hasPlayer ? "5rem" : "0" }}
      >
        {/* Mobile top header */}
        <MobileHeader onMenuClick={() => setSidebarOpen((v) => !v)} />

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </main>

      {/* Mini Player — fixed bottom */}
      <MiniPlayer />

      {/* Lyrics Modal — global */}
      <LyricsModal />
    </div>
  );
}
