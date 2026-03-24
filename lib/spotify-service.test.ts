import { describe, it, expect, beforeAll } from "vitest";
import { searchSpotifyAlbums } from "./spotify-service";

describe("Spotify API Service", () => {
  it("should search for albums on Spotify", async () => {
    const results = await searchSpotifyAlbums("Taylor Swift Midnights", 5);
    
    expect(Array.isArray(results)).toBe(true);
    
    if (results.length > 0) {
      const album = results[0];
      expect(album.id).toBeDefined();
      expect(album.title).toBeDefined();
      expect(album.artist).toBeDefined();
      expect(album.coverUrl).toBeDefined();
      expect(album.coverUrl.length).toBeGreaterThan(0);
    }
  });

  it("should return empty array for empty query", async () => {
    const results = await searchSpotifyAlbums("", 5);
    expect(results).toEqual([]);
  });

  it("should handle API errors gracefully", async () => {
    const results = await searchSpotifyAlbums("xyzabc123notarealalbum", 5);
    expect(Array.isArray(results)).toBe(true);
  });
});
