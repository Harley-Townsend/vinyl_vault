import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Albums table - stores music album metadata from MusicBrainz
 */
export const albums = mysqlTable("albums", {
  id: int("id").autoincrement().primaryKey(),
  mbid: varchar("mbid", { length: 36 }).notNull().unique(), // MusicBrainz ID
  title: varchar("title", { length: 255 }).notNull(),
  artistName: varchar("artistName", { length: 255 }).notNull(),
  releaseDate: timestamp("releaseDate"),
  genres: json("genres"), // JSON array of genres
  label: varchar("label", { length: 255 }),
  coverArtUrl: text("coverArtUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Album = typeof albums.$inferSelect;
export type InsertAlbum = typeof albums.$inferInsert;

/**
 * User logs - represents a user's listening entry for an album
 */
export const userLogs = mysqlTable("userLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  albumId: int("albumId").notNull(),
  rating: int("rating").notNull(), // 1-5 stars
  listeningFormat: varchar("listeningFormat", { length: 50 }).notNull(), // vinyl, cd, spotify, apple_music, etc.
  isFirstListen: boolean("isFirstListen").default(false).notNull(),
  reviewText: text("reviewText"),
  listenedAt: timestamp("listenedAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserLog = typeof userLogs.$inferSelect;
export type InsertUserLog = typeof userLogs.$inferInsert;

/**
 * Reviews/Comments - user comments on other users' log entries
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  logId: int("logId").notNull(),
  commentText: text("commentText").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Likes - users can like log entries
 */
export const likes = mysqlTable("likes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  logId: int("logId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Like = typeof likes.$inferSelect;
export type InsertLike = typeof likes.$inferInsert;

/**
 * Follows - user follows another user
 */
export const follows = mysqlTable("follows", {
  id: int("id").autoincrement().primaryKey(),
  followerId: int("followerId").notNull(),
  followingId: int("followingId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Follow = typeof follows.$inferSelect;
export type InsertFollow = typeof follows.$inferInsert;

/**
 * Favorite albums - user's favorite albums for profile display
 */
export const favoriteAlbums = mysqlTable("favoriteAlbums", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  albumId: int("albumId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type FavoriteAlbum = typeof favoriteAlbums.$inferSelect;
export type InsertFavoriteAlbum = typeof favoriteAlbums.$inferInsert;

/**
 * User profiles - extended user information
 */
export const userProfiles = mysqlTable("userProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  bio: text("bio"),
  profilePictureUrl: text("profilePictureUrl"),
  isPublic: boolean("isPublic").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = typeof userProfiles.$inferInsert;
