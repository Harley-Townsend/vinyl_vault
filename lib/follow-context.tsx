import React, { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

interface FollowContextType {
  followedUsers: Set<string>;
  followers: Set<string>;
  isFollowing: (userId: string) => boolean;
  follow: (userId: string) => void;
  unfollow: (userId: string) => void;
  getFollowerCount: (userId: string) => number;
  getFollowingCount: () => number;
}

const FollowContext = createContext<FollowContextType | undefined>(undefined);

export function FollowProvider({ children }: { children: ReactNode }) {
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set(["user123", "vinylcollector"]));
  const [followers, setFollowers] = useState<Set<string>>(new Set(["musiclover92", "classicrock_fan"]));

  const isFollowing = (userId: string) => followedUsers.has(userId);

  const follow = (userId: string) => {
    setFollowedUsers((prev) => new Set([...prev, userId]));
  };

  const unfollow = (userId: string) => {
    setFollowedUsers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(userId);
      return newSet;
    });
  };

  const getFollowerCount = () => followers.size;
  const getFollowingCount = () => followedUsers.size;

  return (
    <FollowContext.Provider
      value={{
        followedUsers,
        followers,
        isFollowing,
        follow,
        unfollow,
        getFollowerCount,
        getFollowingCount,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
}

export function useFollow() {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error("useFollow must be used within FollowProvider");
  }
  return context;
}
