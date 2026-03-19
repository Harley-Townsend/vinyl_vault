/**
 * MusicBrainz API Integration
 * 
 * Provides functions to search for albums and fetch metadata from MusicBrainz
 * and the Cover Art Archive.
 */

const MB_BASE_URL = "https://musicbrainz.org/ws/2";
const CAA_BASE_URL = "https://coverartarchive.org";

export interface AlbumSearchResult {
  id: string;
  mbid: string;
  title: string;
  artistName: string;
  releaseDate?: string;
  label?: string;
  genres?: string[];
  coverArtUrl?: string;
}

/**
 * Search for albums by title and artist
 */
export async function searchAlbums(
  query: string,
  limit: number = 10
): Promise<AlbumSearchResult[]> {
  try {
    // Build search query
    const searchQuery = encodeURIComponent(query);
    const url = `${MB_BASE_URL}/release?query=${searchQuery}&fmt=json&limit=${limit}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "VinylVault/1.0 (https://vinyl-vault.app)",
      },
    });

    if (!response.ok) {
      throw new Error(`MusicBrainz API error: ${response.statusText}`);
    }

    const data = await response.json();
    const results: AlbumSearchResult[] = [];

    // Process results
    if (data.releases && Array.isArray(data.releases)) {
      for (const release of data.releases.slice(0, limit)) {
        const album: AlbumSearchResult = {
          id: release.id,
          mbid: release.id,
          title: release.title,
          artistName: release["artist-credit"]?.[0]?.artist?.name || "Unknown Artist",
          releaseDate: release.date,
          label: release["label-info"]?.[0]?.label?.name,
          genres: extractGenres(release),
        };

        // Fetch cover art
        try {
          const coverUrl = await getCoverArt(release.id);
          if (coverUrl) {
            album.coverArtUrl = coverUrl;
          }
        } catch (error) {
          console.warn(`Failed to fetch cover art for ${release.id}:`, error);
        }

        results.push(album);
      }
    }

    return results;
  } catch (error) {
    console.error("Album search error:", error);
    return [];
  }
}

/**
 * Get album details by MusicBrainz ID
 */
export async function getAlbumById(mbid: string): Promise<AlbumSearchResult | null> {
  try {
    const url = `${MB_BASE_URL}/release/${mbid}?inc=artist-credits+labels+recordings&fmt=json`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "VinylVault/1.0 (https://vinyl-vault.app)",
      },
    });

    if (!response.ok) {
      throw new Error(`MusicBrainz API error: ${response.statusText}`);
    }

    const release = await response.json();

    const album: AlbumSearchResult = {
      id: release.id,
      mbid: release.id,
      title: release.title,
      artistName: release["artist-credit"]?.[0]?.artist?.name || "Unknown Artist",
      releaseDate: release.date,
      label: release["label-info"]?.[0]?.label?.name,
      genres: extractGenres(release),
    };

    // Fetch cover art
    try {
      const coverUrl = await getCoverArt(release.id);
      if (coverUrl) {
        album.coverArtUrl = coverUrl;
      }
    } catch (error) {
      console.warn(`Failed to fetch cover art for ${mbid}:`, error);
    }

    return album;
  } catch (error) {
    console.error("Get album error:", error);
    return null;
  }
}

/**
 * Get cover art for a release from the Cover Art Archive
 */
export async function getCoverArt(mbid: string): Promise<string | null> {
  try {
    const url = `${CAA_BASE_URL}/release/${mbid}/front-250.jpg`;

    // Check if cover art exists
    const response = await fetch(url, { method: "HEAD" });

    if (response && response.ok) {
      return url;
    }

    // Try without size specification
    const fallbackUrl = `${CAA_BASE_URL}/release/${mbid}/front.jpg`;
    const fallbackResponse = await fetch(fallbackUrl, { method: "HEAD" });

    if (fallbackResponse && fallbackResponse.ok) {
      return fallbackUrl;
    }

    return null;
  } catch (error) {
    console.warn("Cover art fetch error:", error);
    return null;
  }
}

/**
 * Extract genres from MusicBrainz release data
 */
function extractGenres(release: any): string[] {
  const genres = new Set<string>();

  // Try to extract from tags
  if (release.tags && Array.isArray(release.tags)) {
    release.tags.forEach((tag: any) => {
      if (tag.name) {
        genres.add(capitalizeGenre(tag.name));
      }
    });
  }

  // Try to extract from recordings
  if (release.media && Array.isArray(release.media)) {
    release.media.forEach((medium: any) => {
      if (medium.tracks && Array.isArray(medium.tracks)) {
        medium.tracks.forEach((track: any) => {
          if (track.recording?.tags && Array.isArray(track.recording.tags)) {
            track.recording.tags.forEach((tag: any) => {
              if (tag.name) {
                genres.add(capitalizeGenre(tag.name));
              }
            });
          }
        });
      }
    });
  }

  return Array.from(genres).slice(0, 5); // Return top 5 genres
}

/**
 * Capitalize genre names
 */
function capitalizeGenre(genre: string): string {
  return genre
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Search for albums with retry logic
 */
export async function searchAlbumsWithRetry(
  query: string,
  maxRetries: number = 3
): Promise<AlbumSearchResult[]> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const results = await searchAlbums(query);
      if (results.length > 0) {
        return results;
      }
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  return [];
}
