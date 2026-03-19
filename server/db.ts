import { eq, and, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, albums, userLogs, reviews, likes, follows, favoriteAlbums, userProfiles, InsertAlbum, InsertUserLog, InsertReview, InsertLike, InsertFollow, InsertFavoriteAlbum, InsertUserProfile } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================================================
// ALBUM FUNCTIONS
// ============================================================================

export async function getOrCreateAlbum(data: InsertAlbum) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    // Check if album exists by MBID
    const existing = await db.select().from(albums).where(eq(albums.mbid, data.mbid!)).limit(1);
    if (existing.length > 0) {
      return existing[0];
    }

    // Create new album
    await db.insert(albums).values(data);
    const newAlbum = await db.select().from(albums).where(eq(albums.mbid, data.mbid!)).limit(1);
    return newAlbum[0];
  } catch (error) {
    console.error("[Database] Failed to get or create album:", error);
    throw error;
  }
}

export async function getAlbumById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(albums).where(eq(albums.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAlbumByMbid(mbid: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(albums).where(eq(albums.mbid, mbid)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// ============================================================================
// USER LOG FUNCTIONS
// ============================================================================

export async function createUserLog(data: InsertUserLog) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(userLogs).values(data);
  const newLog = await db.select().from(userLogs).orderBy(desc(userLogs.createdAt)).limit(1);
  return newLog[0];
}

export async function getUserLogs(userId: number, limit: number = 50, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select({
      log: userLogs,
      album: albums,
    })
    .from(userLogs)
    .innerJoin(albums, eq(userLogs.albumId, albums.id))
    .where(eq(userLogs.userId, userId))
    .orderBy(desc(userLogs.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getHomeFeed(userId: number, limit: number = 50, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];

  // Get logs from users that the current user follows
  return db
    .select({
      log: userLogs,
      album: albums,
      user: users,
    })
    .from(userLogs)
    .innerJoin(albums, eq(userLogs.albumId, albums.id))
    .innerJoin(users, eq(userLogs.userId, users.id))
    .innerJoin(follows, eq(userLogs.userId, follows.followingId))
    .where(eq(follows.followerId, userId))
    .orderBy(desc(userLogs.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getUserLogById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select({
      log: userLogs,
      album: albums,
    })
    .from(userLogs)
    .innerJoin(albums, eq(userLogs.albumId, albums.id))
    .where(eq(userLogs.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateUserLog(id: number, data: Partial<InsertUserLog>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(userLogs).set(data).where(eq(userLogs.id, id));
  return getUserLogById(id);
}

export async function deleteUserLog(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(userLogs).where(eq(userLogs.id, id));
}

// ============================================================================
// REVIEW/COMMENT FUNCTIONS
// ============================================================================

export async function createReview(data: InsertReview) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(reviews).values(data);
  const newReview = await db.select().from(reviews).orderBy(desc(reviews.createdAt)).limit(1);
  return newReview[0];
}

export async function getLogReviews(logId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select({
      review: reviews,
      user: users,
    })
    .from(reviews)
    .innerJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.logId, logId))
    .orderBy(desc(reviews.createdAt));
}

export async function deleteReview(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(reviews).where(eq(reviews.id, id));
}

// ============================================================================
// LIKE FUNCTIONS
// ============================================================================

export async function likeLog(userId: number, logId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.insert(likes).values({ userId, logId });
    return true;
  } catch (error) {
    console.error("[Database] Failed to like log:", error);
    return false;
  }
}

export async function unlikeLog(userId: number, logId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(likes).where(and(eq(likes.userId, userId), eq(likes.logId, logId)));
}

export async function hasUserLikedLog(userId: number, logId: number) {
  const db = await getDb();
  if (!db) return false;

  const result = await db
    .select()
    .from(likes)
    .where(and(eq(likes.userId, userId), eq(likes.logId, logId)))
    .limit(1);

  return result.length > 0;
}

export async function getLogLikeCount(logId: number) {
  const db = await getDb();
  if (!db) return 0;

  const result = await db
    .select({ count: sql`COUNT(*)` })
    .from(likes)
    .where(eq(likes.logId, logId));

  return result[0]?.count as number || 0;
}

// ============================================================================
// FOLLOW FUNCTIONS
// ============================================================================

export async function followUser(followerId: number, followingId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.insert(follows).values({ followerId, followingId });
    return true;
  } catch (error) {
    console.error("[Database] Failed to follow user:", error);
    return false;
  }
}

export async function unfollowUser(followerId: number, followingId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(follows).where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)));
}

export async function isFollowing(followerId: number, followingId: number) {
  const db = await getDb();
  if (!db) return false;

  const result = await db
    .select()
    .from(follows)
    .where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)))
    .limit(1);

  return result.length > 0;
}

export async function getFollowerCount(userId: number) {
  const db = await getDb();
  if (!db) return 0;

  const result = await db
    .select({ count: sql`COUNT(*)` })
    .from(follows)
    .where(eq(follows.followingId, userId));

  return result[0]?.count as number || 0;
}

export async function getFollowingCount(userId: number) {
  const db = await getDb();
  if (!db) return 0;

  const result = await db
    .select({ count: sql`COUNT(*)` })
    .from(follows)
    .where(eq(follows.followerId, userId));

  return result[0]?.count as number || 0;
}

// ============================================================================
// FAVORITE ALBUM FUNCTIONS
// ============================================================================

export async function addFavoriteAlbum(userId: number, albumId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.insert(favoriteAlbums).values({ userId, albumId });
    return true;
  } catch (error) {
    console.error("[Database] Failed to add favorite album:", error);
    return false;
  }
}

export async function removeFavoriteAlbum(userId: number, albumId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(favoriteAlbums).where(and(eq(favoriteAlbums.userId, userId), eq(favoriteAlbums.albumId, albumId)));
}

export async function getUserFavoriteAlbums(userId: number, limit: number = 10) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select({
      favorite: favoriteAlbums,
      album: albums,
    })
    .from(favoriteAlbums)
    .innerJoin(albums, eq(favoriteAlbums.albumId, albums.id))
    .where(eq(favoriteAlbums.userId, userId))
    .limit(limit);
}

// ============================================================================
// USER PROFILE FUNCTIONS
// ============================================================================

export async function createUserProfile(data: InsertUserProfile) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(userProfiles).values(data);
  const newProfile = await db.select().from(userProfiles).where(eq(userProfiles.userId, data.userId!)).limit(1);
  return newProfile[0];
}

export async function getUserProfile(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateUserProfile(userId: number, data: Partial<InsertUserProfile>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(userProfiles).set(data).where(eq(userProfiles.userId, userId));
  return getUserProfile(userId);
}

export async function getUserStats(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const logCount = await db
    .select({ count: sql`COUNT(*)` })
    .from(userLogs)
    .where(eq(userLogs.userId, userId));

  const avgRating = await db
    .select({ avg: sql`AVG(rating)` })
    .from(userLogs)
    .where(eq(userLogs.userId, userId));

  const followerCount = await getFollowerCount(userId);
  const followingCount = await getFollowingCount(userId);

  return {
    totalLogsCount: logCount[0]?.count as number || 0,
    averageRating: avgRating[0]?.avg as number || 0,
    followerCount,
    followingCount,
  };
}
