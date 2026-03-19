import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import * as db from "./db";

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

  // ============================================================================
  // ALBUMS
  // ============================================================================
  albums: router({
    // Search albums (public)
    search: publicProcedure
      .input(z.object({
        query: z.string().min(1),
        limit: z.number().default(20),
      }))
      .query(async ({ input }) => {
        // This will be called by frontend to search MusicBrainz
        // For now, return empty - frontend will handle MusicBrainz API calls
        return [];
      }),

    // Get album by ID
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getAlbumById(input.id);
      }),

    // Get album by MusicBrainz ID
    getByMbid: publicProcedure
      .input(z.object({ mbid: z.string() }))
      .query(async ({ input }) => {
        return db.getAlbumByMbid(input.mbid);
      }),

    // Get or create album (protected)
    getOrCreate: protectedProcedure
      .input(z.object({
        mbid: z.string(),
        title: z.string(),
        artistName: z.string(),
        releaseDate: z.date().optional(),
        genres: z.array(z.string()).optional(),
        label: z.string().optional(),
        coverArtUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return db.getOrCreateAlbum(input);
      }),
  }),

  // ============================================================================
  // USER LOGS (Album listening entries)
  // ============================================================================
  logs: router({
    // Create a new log entry
    create: protectedProcedure
      .input(z.object({
        albumId: z.number(),
        rating: z.number().min(1).max(5),
        listeningFormat: z.string().min(1),
        isFirstListen: z.boolean().default(false),
        reviewText: z.string().optional(),
        listenedAt: z.date(),
      }))
      .mutation(async ({ ctx, input }) => {
        return db.createUserLog({
          userId: ctx.user.id,
          ...input,
        });
      }),

    // Get user's logs
    getUserLogs: protectedProcedure
      .input(z.object({
        userId: z.number(),
        limit: z.number().default(50),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        return db.getUserLogs(input.userId, input.limit, input.offset);
      }),

    // Get home feed (logs from followed users)
    getHomeFeed: protectedProcedure
      .input(z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      }))
      .query(async ({ ctx, input }) => {
        return db.getHomeFeed(ctx.user.id, input.limit, input.offset);
      }),

    // Get single log by ID
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getUserLogById(input.id);
      }),

    // Update log
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        rating: z.number().min(1).max(5).optional(),
        listeningFormat: z.string().optional(),
        isFirstListen: z.boolean().optional(),
        reviewText: z.string().optional(),
        listenedAt: z.date().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Verify ownership
        const log = await db.getUserLogById(input.id);
        if (!log || log.log.userId !== ctx.user.id) {
          throw new Error("Unauthorized");
        }

        const { id, ...updateData } = input;
        return db.updateUserLog(id, updateData);
      }),

    // Delete log
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        // Verify ownership
        const log = await db.getUserLogById(input.id);
        if (!log || log.log.userId !== ctx.user.id) {
          throw new Error("Unauthorized");
        }

        await db.deleteUserLog(input.id);
        return { success: true };
      }),
  }),

  // ============================================================================
  // REVIEWS/COMMENTS
  // ============================================================================
  reviews: router({
    // Create review on a log
    create: protectedProcedure
      .input(z.object({
        logId: z.number(),
        commentText: z.string().min(1).max(1000),
      }))
      .mutation(async ({ ctx, input }) => {
        return db.createReview({
          userId: ctx.user.id,
          logId: input.logId,
          commentText: input.commentText,
        });
      }),

    // Get reviews for a log
    getForLog: publicProcedure
      .input(z.object({ logId: z.number() }))
      .query(async ({ input }) => {
        return db.getLogReviews(input.logId);
      }),

    // Delete review
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        // Note: In production, verify ownership
        await db.deleteReview(input.id);
        return { success: true };
      }),
  }),

  // ============================================================================
  // LIKES
  // ============================================================================
  likes: router({
    // Like a log
    like: protectedProcedure
      .input(z.object({ logId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return db.likeLog(ctx.user.id, input.logId);
      }),

    // Unlike a log
    unlike: protectedProcedure
      .input(z.object({ logId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.unlikeLog(ctx.user.id, input.logId);
        return { success: true };
      }),

    // Check if user liked a log
    hasLiked: protectedProcedure
      .input(z.object({ logId: z.number() }))
      .query(async ({ ctx, input }) => {
        return db.hasUserLikedLog(ctx.user.id, input.logId);
      }),

    // Get like count for a log
    getCount: publicProcedure
      .input(z.object({ logId: z.number() }))
      .query(async ({ input }) => {
        return db.getLogLikeCount(input.logId);
      }),
  }),

  // ============================================================================
  // FOLLOWS
  // ============================================================================
  follows: router({
    // Follow a user
    follow: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.id === input.userId) {
          throw new Error("Cannot follow yourself");
        }
        return db.followUser(ctx.user.id, input.userId);
      }),

    // Unfollow a user
    unfollow: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.unfollowUser(ctx.user.id, input.userId);
        return { success: true };
      }),

    // Check if following
    isFollowing: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ ctx, input }) => {
        return db.isFollowing(ctx.user.id, input.userId);
      }),

    // Get follower count
    getFollowerCount: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return db.getFollowerCount(input.userId);
      }),

    // Get following count
    getFollowingCount: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return db.getFollowingCount(input.userId);
      }),
  }),

  // ============================================================================
  // FAVORITE ALBUMS
  // ============================================================================
  favorites: router({
    // Add favorite album
    add: protectedProcedure
      .input(z.object({ albumId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return db.addFavoriteAlbum(ctx.user.id, input.albumId);
      }),

    // Remove favorite album
    remove: protectedProcedure
      .input(z.object({ albumId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.removeFavoriteAlbum(ctx.user.id, input.albumId);
        return { success: true };
      }),

    // Get user's favorite albums
    getForUser: publicProcedure
      .input(z.object({ userId: z.number(), limit: z.number().default(10) }))
      .query(async ({ input }) => {
        return db.getUserFavoriteAlbums(input.userId, input.limit);
      }),
  }),

  // ============================================================================
  // USER PROFILES
  // ============================================================================
  profiles: router({
    // Get user profile
    getProfile: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return db.getUserProfile(input.userId);
      }),

    // Update profile (protected)
    updateProfile: protectedProcedure
      .input(z.object({
        bio: z.string().optional(),
        profilePictureUrl: z.string().optional(),
        isPublic: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return db.updateUserProfile(ctx.user.id, input);
      }),

    // Get user stats
    getStats: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return db.getUserStats(input.userId);
      }),

    // Initialize profile for new user
    initializeProfile: protectedProcedure.mutation(async ({ ctx }) => {
      const existing = await db.getUserProfile(ctx.user.id);
      if (!existing) {
        return db.createUserProfile({
          userId: ctx.user.id,
          bio: "",
          isPublic: true,
        });
      }
      return existing;
    }),
  }),
});

export type AppRouter = typeof appRouter;
