import { getSessionCookieOptions } from "./_core/cookies";
import { COOKIE_NAME } from "../shared/const.js";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  spotify: router({
    search: publicProcedure
      .input(z.object({ query: z.string(), limit: z.number().optional() }))
      .query(async ({ input }) => {
        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
          throw new Error("Spotify credentials not configured");
        }

        try {
          // Get access token
          const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
            },
            body: "grant_type=client_credentials",
          });

          if (!tokenResponse.ok) {
            throw new Error("Failed to get Spotify token");
          }

          const tokenData = await tokenResponse.json();
          const token = tokenData.access_token;

          // Search for albums
          const params = new URLSearchParams({
            q: input.query,
            type: "album",
            limit: Math.min(input.limit || 20, 50).toString(),
          });

          const searchResponse = await fetch(`https://api.spotify.com/v1/search?${params}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!searchResponse.ok) {
            throw new Error("Failed to search Spotify");
          }

          const searchData = await searchResponse.json();
          const albums = searchData.albums?.items || [];

          return albums
            .filter((album: any) => album.images && album.images.length > 0)
            .map((album: any) => ({
              id: album.id,
              title: album.name,
              artist: album.artists?.[0]?.name || "Unknown Artist",
              releaseDate: album.release_date,
              coverUrl: album.images[0]?.url || "",
              uri: album.uri,
            }));
        } catch (error) {
          console.error("Spotify search error:", error);
          throw error;
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
