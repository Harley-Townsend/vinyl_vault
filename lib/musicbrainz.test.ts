import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchAlbums, getAlbumById, getCoverArt } from "./musicbrainz";

// Mock fetch globally
global.fetch = vi.fn();

describe("MusicBrainz API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("searchAlbums", () => {
    it("should return empty array on network error", async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error("Network error"));

      const results = await searchAlbums("The Dark Side of the Moon");

      expect(results).toEqual([]);
    });

    it("should handle API error responses", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      });

      const results = await searchAlbums("Invalid Album");

      expect(results).toEqual([]);
    });

    it("should parse album data correctly", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          releases: [
            {
              id: "test-id-123",
              title: "Test Album",
              "artist-credit": [
                {
                  artist: {
                    name: "Test Artist",
                  },
                },
              ],
              date: "2020-01-01",
              "label-info": [
                {
                  label: {
                    name: "Test Label",
                  },
                },
              ],
              tags: [
                { name: "rock" },
                { name: "pop" },
              ],
            },
          ],
        }),
      });

      // Mock cover art fetch
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
      });

      const results = await searchAlbums("Test Album");

      expect(results).toHaveLength(1);
      expect(results[0]).toMatchObject({
        id: "test-id-123",
        mbid: "test-id-123",
        title: "Test Album",
        artistName: "Test Artist",
        releaseDate: "2020-01-01",
        label: "Test Label",
      });
    });

    it("should limit results to specified count", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          releases: Array(15).fill({
            id: "test-id",
            title: "Album",
            "artist-credit": [{ artist: { name: "Artist" } }],
          }),
        }),
      });

      const results = await searchAlbums("Album", 5);

      expect(results.length).toBeLessThanOrEqual(5);
    });
  });

  describe("getAlbumById", () => {
    it("should return null on error", async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error("Network error"));

      const result = await getAlbumById("invalid-id");

      expect(result).toBeNull();
    });

    it("should fetch album by MBID", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: "test-mbid",
          title: "Album Title",
          "artist-credit": [
            {
              artist: {
                name: "Artist Name",
              },
            },
          ],
          date: "2020-01-01",
          tags: [],
        }),
      });

      // Mock cover art fetch
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
      });

      const result = await getAlbumById("test-mbid");

      expect(result).not.toBeNull();
      expect(result?.mbid).toBe("test-mbid");
      expect(result?.title).toBe("Album Title");
    });
  });

  describe("getCoverArt", () => {
    it("should return null if cover art not found", async () => {
      (global.fetch as any)
        .mockResolvedValueOnce({ ok: false }) // First attempt
        .mockResolvedValueOnce({ ok: false }); // Fallback attempt

      const url = await getCoverArt("test-id");

      expect(url).toBeNull();
    });

    it("should return cover art URL if found", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
      });

      const url = await getCoverArt("test-id");

      expect(url).toBe("https://coverartarchive.org/release/test-id/front-250.jpg");
    });

    it("should try fallback URL if first attempt fails", async () => {
      (global.fetch as any)
        .mockResolvedValueOnce({ ok: false }) // First attempt fails
        .mockResolvedValueOnce({ ok: true }); // Fallback succeeds

      const url = await getCoverArt("test-id");

      expect(url).toBe("https://coverartarchive.org/release/test-id/front.jpg");
    });

    it("should return null on network error", async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error("Network error"));

      const url = await getCoverArt("test-id");

      expect(url).toBeNull();
    });
  });
});
