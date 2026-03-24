/**
 * iTunes Search API Service
 * Provides reliable album artwork and metadata without authentication
 */

const ITUNES_API = "https://itunes.apple.com/search";

export interface ItunesAlbum {
  id: string;
  title: string;
  artistName: string;
  releaseDate?: string;
  coverArtUrl: string;
  collectionId: number;
}

/**
 * Search for albums on iTunes
 */
export async function searchItunesAlbums(query: string, limit: number = 20): Promise<ItunesAlbum[]> {
  try {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const params = new URLSearchParams({
      term: query.trim(),
      media: "music",
      entity: "album",
      limit: Math.min(limit, 50).toString(),
    });

    console.log("Searching iTunes for:", query);

    const response = await fetch(`${ITUNES_API}?${params}`);

    if (!response.ok) {
      console.error("iTunes API error:", response.status);
      return [];
    }

    const data = await response.json();
    const results = data.results || [];

    console.log(`Found ${results.length} albums on iTunes`);

    if (results.length === 0) {
      return [];
    }

    // Transform iTunes data to our Album format
    const albums: ItunesAlbum[] = results
      .filter((result: any) => result.artworkUrl100 || result.artworkUrl60) // Must have artwork
      .map((result: any) => ({
        id: result.collectionId.toString(),
        title: result.collectionName || "Unknown Album",
        artistName: result.artistName || "Unknown Artist",
        releaseDate: result.releaseDate?.substring(0, 10),
        // Use the largest available artwork (600x600)
        coverArtUrl: (result.artworkUrl100 || result.artworkUrl60)
          .replace("100x100", "600x600")
          .replace("60x60", "600x600"),
        collectionId: result.collectionId,
      }))
      .slice(0, limit);

    return albums;
  } catch (error) {
    console.error("Error searching iTunes albums:", error);
    return [];
  }
}

/**
 * Get album details from iTunes
 */
export async function getItunesAlbumDetails(collectionId: number): Promise<ItunesAlbum | null> {
  try {
    const params = new URLSearchParams({
      id: collectionId.toString(),
      media: "music",
      entity: "album",
    });

    const response = await fetch(`${ITUNES_API}?${params}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const result = data.results?.[0];

    if (!result) {
      return null;
    }

    return {
      id: result.collectionId.toString(),
      title: result.collectionName || "Unknown Album",
      artistName: result.artistName || "Unknown Artist",
      releaseDate: result.releaseDate?.substring(0, 10),
      coverArtUrl: (result.artworkUrl100 || result.artworkUrl60)
        .replace("100x100", "600x600")
        .replace("60x60", "600x600"),
      collectionId: result.collectionId,
    };
  } catch (error) {
    console.error("Error fetching iTunes album details:", error);
    return null;
  }
}

/**
 * Search by artist name on iTunes
 */
export async function searchItunesByArtist(artistName: string, limit: number = 20): Promise<ItunesAlbum[]> {
  return searchItunesAlbums(`artist:${artistName}`, limit);
}
