/**
 * MusicBrainz API Service
 * Handles album search and metadata retrieval
 */

const MUSICBRAINZ_API = "https://musicbrainz.org/ws/2";
const COVER_ART_API = "https://coverartarchive.org";

export interface Album {
  id: string;
  mbid: string;
  title: string;
  artistName: string;
  releaseDate?: string;
  genres?: string[];
  coverArtUrl?: string;
}

/**
 * Search for albums by title and/or artist
 */
export async function searchAlbums(query: string, limit: number = 20): Promise<Album[]> {
  try {
    // Build search query
    const searchParams = new URLSearchParams({
      query: query,
      fmt: "json",
      limit: limit.toString(),
    });

    const response = await fetch(`${MUSICBRAINZ_API}/release?${searchParams}`, {
      headers: {
        "User-Agent": "VinylVault/1.0 (music-app)",
      },
    });

    if (!response.ok) {
      console.error("MusicBrainz API error:", response.status);
      return [];
    }

    const data = await response.json();
    const releases = data.releases || [];

    // Transform MusicBrainz data to our Album format
    const albums: Album[] = await Promise.all(
      releases.map(async (release: any) => {
        const album: Album = {
          id: release.id,
          mbid: release.id,
          title: release.title,
          artistName: release["artist-credit"]?.[0]?.artist?.name || "Unknown Artist",
          releaseDate: release.date,
          genres: release.tags?.map((tag: any) => tag.name) || [],
        };

        // Try to fetch cover art
        try {
          album.coverArtUrl = await getCoverArtUrl(release.id);
        } catch (error) {
          console.warn("Failed to fetch cover art for", release.id);
        }

        return album;
      })
    );

    return albums;
  } catch (error) {
    console.error("Error searching albums:", error);
    return [];
  }
}

/**
 * Get cover art URL for an album
 */
async function getCoverArtUrl(mbid: string): Promise<string | undefined> {
  try {
    const response = await fetch(`${COVER_ART_API}/release/${mbid}`, {
      headers: {
        "User-Agent": "VinylVault/1.0 (music-app)",
      },
    });

    if (!response.ok) {
      return undefined;
    }

    const data = await response.json();
    const frontImage = data.images?.find((img: any) => img.front);
    return frontImage?.thumbnails?.small || frontImage?.image;
  } catch (error) {
    console.warn("Error fetching cover art:", error);
    return undefined;
  }
}

/**
 * Get detailed album information by MBID
 */
export async function getAlbumDetails(mbid: string): Promise<Album | null> {
  try {
    const response = await fetch(`${MUSICBRAINZ_API}/release/${mbid}?fmt=json&inc=artist-credits+genres+tags`, {
      headers: {
        "User-Agent": "VinylVault/1.0 (music-app)",
      },
    });

    if (!response.ok) {
      return null;
    }

    const release = await response.json();

    const album: Album = {
      id: release.id,
      mbid: release.id,
      title: release.title,
      artistName: release["artist-credit"]?.[0]?.artist?.name || "Unknown Artist",
      releaseDate: release.date,
      genres: release.tags?.map((tag: any) => tag.name) || [],
    };

    // Fetch cover art
    try {
      album.coverArtUrl = await getCoverArtUrl(mbid);
    } catch (error) {
      console.warn("Failed to fetch cover art");
    }

    return album;
  } catch (error) {
    console.error("Error fetching album details:", error);
    return null;
  }
}

/**
 * Search by artist name
 */
export async function searchByArtist(artistName: string, limit: number = 20): Promise<Album[]> {
  return searchAlbums(`artist:"${artistName}"`, limit);
}
