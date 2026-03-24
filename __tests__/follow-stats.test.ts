import { describe, it, expect, beforeEach } from "vitest";

// Mock types and interfaces
interface User {
  id: string;
  name: string;
}

interface AlbumLog {
  id: number;
  userId: string;
  rating: number;
  genre: string;
}

// Follow System Tests
describe("Follow System", () => {
  let followedUsers: Set<string>;
  let followers: Set<string>;

  beforeEach(() => {
    followedUsers = new Set(["user123", "vinylcollector"]);
    followers = new Set(["musiclover92", "classicrock_fan"]);
  });

  it("should add a user to followed list", () => {
    const userId = "newuser";
    followedUsers.add(userId);
    expect(followedUsers.has(userId)).toBe(true);
    expect(followedUsers.size).toBe(3);
  });

  it("should remove a user from followed list", () => {
    const userId = "user123";
    followedUsers.delete(userId);
    expect(followedUsers.has(userId)).toBe(false);
    expect(followedUsers.size).toBe(1);
  });

  it("should check if user is being followed", () => {
    expect(followedUsers.has("user123")).toBe(true);
    expect(followedUsers.has("nonexistent")).toBe(false);
  });

  it("should get follower count", () => {
    expect(followers.size).toBe(2);
  });

  it("should get following count", () => {
    expect(followedUsers.size).toBe(2);
  });

  it("should not duplicate followed users", () => {
    followedUsers.add("user123");
    expect(followedUsers.size).toBe(2);
  });

  it("should handle following and unfollowing", () => {
    const userId = "testuser";
    
    // Initially not following
    expect(followedUsers.has(userId)).toBe(false);
    
    // Follow user
    followedUsers.add(userId);
    expect(followedUsers.has(userId)).toBe(true);
    expect(followedUsers.size).toBe(3);
    
    // Unfollow user
    followedUsers.delete(userId);
    expect(followedUsers.has(userId)).toBe(false);
    expect(followedUsers.size).toBe(2);
  });
});

// Stats Calculation Tests
describe("Stats Calculations", () => {
  let logs: AlbumLog[];

  beforeEach(() => {
    logs = [
      { id: 1, userId: "user1", rating: 5, genre: "Rock" },
      { id: 2, userId: "user1", rating: 4, genre: "Rock" },
      { id: 3, userId: "user2", rating: 4.5, genre: "Jazz" },
      { id: 4, userId: "user2", rating: 3.5, genre: "Pop" },
      { id: 5, userId: "user3", rating: 4, genre: "Electronic" },
      { id: 6, userId: "user1", rating: 5, genre: "Rock" },
    ];
  });

  it("should calculate total albums logged", () => {
    const totalAlbums = logs.length;
    expect(totalAlbums).toBe(6);
  });

  it("should calculate average rating", () => {
    const totalRating = logs.reduce((sum, log) => sum + log.rating, 0);
    const averageRating = totalRating / logs.length;
    // (5 + 4 + 4.5 + 3.5 + 4 + 5) / 6 = 26 / 6 = 4.333...
    expect(averageRating).toBeCloseTo(4.33, 2);
  });

  it("should calculate genre breakdown", () => {
    const genreStats: Record<string, { count: number; totalRating: number }> = {};

    logs.forEach((log) => {
      if (!genreStats[log.genre]) {
        genreStats[log.genre] = { count: 0, totalRating: 0 };
      }
      genreStats[log.genre].count++;
      genreStats[log.genre].totalRating += log.rating;
    });

    expect(genreStats["Rock"].count).toBe(3);
    expect(genreStats["Jazz"].count).toBe(1);
    expect(genreStats["Pop"].count).toBe(1);
    expect(genreStats["Electronic"].count).toBe(1);
  });

  it("should find favorite genre", () => {
    const genreStats: Record<string, number> = {};

    logs.forEach((log) => {
      genreStats[log.genre] = (genreStats[log.genre] || 0) + 1;
    });

    const favoriteGenre = Object.keys(genreStats).reduce((a, b) =>
      genreStats[a] > genreStats[b] ? a : b
    );

    expect(favoriteGenre).toBe("Rock");
  });

  it("should calculate average rating per genre", () => {
    const genreStats: Record<string, { count: number; totalRating: number }> = {};

    logs.forEach((log) => {
      if (!genreStats[log.genre]) {
        genreStats[log.genre] = { count: 0, totalRating: 0 };
      }
      genreStats[log.genre].count++;
      genreStats[log.genre].totalRating += log.rating;
    });

    const rockAverage = genreStats["Rock"].totalRating / genreStats["Rock"].count;
    expect(rockAverage).toBeCloseTo(4.67, 1);
  });

  it("should get recent albums", () => {
    const recentAlbums = logs.slice(-3);
    expect(recentAlbums.length).toBe(3);
    expect(recentAlbums[2].id).toBe(6);
  });

  it("should filter logs by user", () => {
    const userId = "user1";
    const userLogs = logs.filter((log) => log.userId === userId);
    expect(userLogs.length).toBe(3);
    expect(userLogs.every((log) => log.userId === userId)).toBe(true);
  });

  it("should calculate stats for followed users only", () => {
    const followedUsers = new Set(["user1", "user2"]);
    const followedLogs = logs.filter((log) => followedUsers.has(log.userId));
    
    expect(followedLogs.length).toBe(5);
    
    const totalRating = followedLogs.reduce((sum, log) => sum + log.rating, 0);
    const averageRating = totalRating / followedLogs.length;
    // (5 + 4 + 4.5 + 3.5 + 4) / 5 = 22 / 5 = 4.4
    expect(averageRating).toBeCloseTo(4.4, 1);
  });
});

// Feed Filtering Tests
describe("Feed Filtering", () => {
  let logs: AlbumLog[];
  let followedUsers: Set<string>;

  beforeEach(() => {
    logs = [
      { id: 1, userId: "user1", rating: 5, genre: "Rock" },
      { id: 2, userId: "user2", rating: 4, genre: "Jazz" },
      { id: 3, userId: "user3", rating: 4.5, genre: "Pop" },
      { id: 4, userId: "user1", rating: 3.5, genre: "Electronic" },
    ];
    followedUsers = new Set(["user1", "user2"]);
  });

  it("should filter logs to show only from followed users", () => {
    const filteredLogs = logs.filter((log) => followedUsers.has(log.userId));
    expect(filteredLogs.length).toBe(3);
    expect(filteredLogs.every((log) => followedUsers.has(log.userId))).toBe(true);
  });

  it("should show empty feed when no followed users", () => {
    const emptyFollowed = new Set<string>();
    const filteredLogs = logs.filter((log) => emptyFollowed.has(log.userId));
    expect(filteredLogs.length).toBe(0);
  });

  it("should update feed when following new user", () => {
    let filteredLogs = logs.filter((log) => followedUsers.has(log.userId));
    expect(filteredLogs.length).toBe(3);

    followedUsers.add("user3");
    filteredLogs = logs.filter((log) => followedUsers.has(log.userId));
    expect(filteredLogs.length).toBe(4);
  });

  it("should update feed when unfollowing user", () => {
    let filteredLogs = logs.filter((log) => followedUsers.has(log.userId));
    expect(filteredLogs.length).toBe(3);

    followedUsers.delete("user1");
    filteredLogs = logs.filter((log) => followedUsers.has(log.userId));
    expect(filteredLogs.length).toBe(1);
  });
});
