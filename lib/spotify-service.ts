/**
 * Spotify API Service
 * Provides comprehensive album search with guaranteed artwork
 */

let spotifyAccessToken: string | null = null;
let tokenExpiresAt: number = 0;

export interface SpotifyAlbum {
  id: string;
  title: string;
  artist: string;
  releaseDate?: string;
  coverUrl: string;
  uri?: string;
  genres?: string[];
}

/**
 * Get Spotify access token using Client Credentials flow
 */
async function getSpotifyAccessToken(): Promise<string> {
  const now = Date.now();

  // Return cached token if still valid
  if (spotifyAccessToken && tokenExpiresAt > now) {
    return spotifyAccessToken;
  }

  const clientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID || process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Spotify credentials not configured. Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.");
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error(`Spotify auth failed: ${response.status}`);
    }

    const data = await response.json();
    spotifyAccessToken = data.access_token || null;
    tokenExpiresAt = now + (data.expires_in || 3600) * 1000;

    if (!spotifyAccessToken) {
      throw new Error("No access token received from Spotify");
    }

    return spotifyAccessToken;
  } catch (error) {
    console.error("Error getting Spotify access token:", error);
    throw error;
  }
}

/**
 * Search for albums on Spotify
 */
export async function searchSpotifyAlbums(query: string, limit: number = 20): Promise<SpotifyAlbum[]> {
  try {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const token = await getSpotifyAccessToken();
    const params = new URLSearchParams({
      q: query.trim(),
      type: "album",
      limit: Math.min(limit, 50).toString(),
    });

    console.log("Searching Spotify for:", query);

    const response = await fetch(`https://api.spotify.com/v1/search?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Spotify API error:", response.status);
      return [];
    }

    const data = await response.json();
    const albums = data.albums?.items || [];

    console.log(`Found ${albums.length} albums on Spotify`);

    return albums
      .filter((album: any) => album.images && album.images.length > 0)
      .map((album: any) => ({
        id: album.id,
        title: album.name,
        artist: album.artists?.[0]?.name || "Unknown Artist",
        releaseDate: album.release_date,
        // Use the largest available image (usually 640x640)
        coverUrl: album.images[0]?.url || "",
        uri: album.uri,
        genres: album.genres || [],
      }))
      .slice(0, limit);
  } catch (error) {
    console.error("Error searching Spotify albums:", error);
    return [];
  }
}

/**
 * Search by artist name on Spotify
 */
export async function searchSpotifyByArtist(artistName: string, limit: number = 20): Promise<SpotifyAlbum[]> {
  return searchSpotifyAlbums(`artist:${artistName}`, limit);
}

/**
 * Get album details from Spotify
 */
export async function getSpotifyAlbumDetails(albumId: string): Promise<SpotifyAlbum | null> {
  try {
    const token = await getSpotifyAccessToken();

    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const album = await response.json();

    if (!album.images || album.images.length === 0) {
      return null;
    }

    return {
      id: album.id,
      title: album.name,
      artist: album.artists?.[0]?.name || "Unknown Artist",
      releaseDate: album.release_date,
      coverUrl: album.images[0]?.url || "",
      uri: album.uri,
      genres: album.genres || [],
    };
  } catch (error) {
    console.error("Error fetching Spotify album details:", error);
    return null;
  }
}
