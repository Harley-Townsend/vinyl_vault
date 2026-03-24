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
 * Get cover art URL for an album (with fallback)
 */
async function getCoverArtUrl(mbid: string): Promise<string | undefined> {
  try {
    // Try to fetch from Cover Art Archive
    const response = await fetch(`${COVER_ART_API}/release/${mbid}/front-250.jpg`, {
      method: "HEAD",
    });

    if (response.ok) {
      return `${COVER_ART_API}/release/${mbid}/front-250.jpg`;
    }

    // Fallback: try to get JSON response with image URLs
    const jsonResponse = await fetch(`${COVER_ART_API}/release/${mbid}`, {
      headers: {
        "User-Agent": "VinylVault/1.0 (music-app)",
      },
    });

    if (jsonResponse.ok) {
      const data = await jsonResponse.json();
      const frontImage = data.images?.find((img: any) => img.front);
      if (frontImage?.thumbnails?.small) {
        return frontImage.thumbnails.small;
      }
      if (frontImage?.image) {
        return frontImage.image;
      }
    }

    return undefined;
  } catch (error) {
    console.warn("Error fetching cover art for", mbid, error);
    return undefined;
  }
}

/**
 * Search for albums by title and/or artist
 */
export async function searchAlbums(query: string, limit: number = 20): Promise<Album[]> {
  try {
    if (!query || query.trim().length === 0) {
      return [];
    }

    // Build search query - search for both release and recording
    const searchParams = new URLSearchParams({
      query: query.trim(),
      fmt: "json",
      limit: limit.toString(),
    });

    console.log("Searching MusicBrainz for:", query);

    const response = await fetch(`${MUSICBRAINZ_API}/release?${searchParams}`, {
      headers: {
        "User-Agent": "VinylVault/1.0 (music-app)",
      },
    });

    if (!response.ok) {
      console.error("MusicBrainz API error:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    const releases = data.releases || [];

    console.log(`Found ${releases.length} releases for "${query}"`);

    if (releases.length === 0) {
      return [];
    }

    // Transform MusicBrainz data to our Album format
    const albums: Album[] = [];

    for (const release of releases.slice(0, limit)) {
      try {
        const album: Album = {
          id: release.id,
          mbid: release.id,
          title: release.title || "Unknown Album",
          artistName:
            release["artist-credit"]?.[0]?.artist?.name ||
            release["artist-credit"]?.[0]?.name ||
            "Unknown Artist",
          releaseDate: release.date || release["first-release-date"],
          genres: release.tags?.map((tag: any) => tag.name) || [],
        };

        // Try to fetch cover art
        const coverUrl = await getCoverArtUrl(release.id);
        if (coverUrl) {
          album.coverArtUrl = coverUrl;
        }

        albums.push(album);
      } catch (error) {
        console.warn("Error processing release:", error);
        continue;
      }
    }

    console.log(`Processed ${albums.length} albums with cover art`);
    return albums;
  } catch (error) {
    console.error("Error searching albums:", error);
    return [];
  }
}

/**
 * Get detailed album information by MBID
 */
export async function getAlbumDetails(mbid: string): Promise<Album | null> {
  try {
    const response = await fetch(
      `${MUSICBRAINZ_API}/release/${mbid}?fmt=json&inc=artist-credits+genres+tags`,
      {
        headers: {
          "User-Agent": "VinylVault/1.0 (music-app)",
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const release = await response.json();

    const album: Album = {
      id: release.id,
      mbid: release.id,
      title: release.title || "Unknown Album",
      artistName: release["artist-credit"]?.[0]?.artist?.name || "Unknown Artist",
      releaseDate: release.date,
      genres: release.tags?.map((tag: any) => tag.name) || [],
    };

    // Fetch cover art
    const coverUrl = await getCoverArtUrl(mbid);
    if (coverUrl) {
      album.coverArtUrl = coverUrl;
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
