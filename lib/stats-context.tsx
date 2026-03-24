import React, { createContext, useContext, useState, ReactNode } from "react";

export interface GenreStats {
  genre: string;
  count: number;
  averageRating: number;
}

export interface ListeningStats {
  totalAlbumsLogged: number;
  averageRating: number;
  favoriteGenre: string;
  genreBreakdown: GenreStats[];
  recentAlbums: Array<{ title: string; artist: string; rating: number; date: string }>;
}

interface StatsContextType {
  stats: ListeningStats;
  updateStats: (newStats: Partial<ListeningStats>) => void;
  getGenreStats: () => GenreStats[];
  getAverageRating: () => number;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

const DEFAULT_STATS: ListeningStats = {
  totalAlbumsLogged: 42,
  averageRating: 4.1,
  favoriteGenre: "Pop",
  genreBreakdown: [
    { genre: "Pop", count: 12, averageRating: 4.3 },
    { genre: "Rock", count: 10, averageRating: 4.2 },
    { genre: "Hip-Hop", count: 8, averageRating: 4.0 },
    { genre: "Jazz", count: 7, averageRating: 4.4 },
    { genre: "Electronic", count: 5, averageRating: 3.8 },
  ],
  recentAlbums: [
    { title: "Midnights", artist: "Taylor Swift", rating: 4.5, date: "2024-03-20" },
    { title: "Rumours", artist: "Fleetwood Mac", rating: 5, date: "2024-03-18" },
    { title: "Kind of Blue", artist: "Miles Davis", rating: 4.5, date: "2024-03-15" },
  ],
};

export function StatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<ListeningStats>(DEFAULT_STATS);

  const updateStats = (newStats: Partial<ListeningStats>) => {
    setStats((prev) => ({ ...prev, ...newStats }));
  };

  const getGenreStats = () => stats.genreBreakdown;

  const getAverageRating = () => stats.averageRating;

  return (
    <StatsContext.Provider
      value={{
        stats,
        updateStats,
        getGenreStats,
        getAverageRating,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error("useStats must be used within StatsProvider");
  }
  return context;
}
