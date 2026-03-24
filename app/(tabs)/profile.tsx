import { ScrollView, Text, View, Image, Pressable, FlatList, TextInput } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useFollow } from "@/lib/follow-context";
import { useStats } from "@/lib/stats-context";
import * as Haptics from "expo-haptics";
import { ImpactFeedbackStyle } from "expo-haptics";
import { useRouter } from "expo-router";
import { useState, useMemo } from "react";

interface UserLog {
  id: number;
  albumTitle: string;
  artist: string;
  rating: number;
  format: string;
  coverUrl: string;
  review: string;
  dateAdded: string;
}

// Mock user logs
const mockUserLogs: UserLog[] = [
  {
    id: 1,
    albumTitle: "Midnights",
    artist: "Taylor Swift",
    rating: 4.5,
    format: "Vinyl",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
    review: "Amazing album! Love the production.",
    dateAdded: "2024-03-20",
  },
  {
    id: 2,
    albumTitle: "Rumours",
    artist: "Fleetwood Mac",
    rating: 5,
    format: "CD",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b27357df7ce0eac715cf70e519a7",
    review: "Classic masterpiece. Never gets old.",
    dateAdded: "2024-03-18",
  },
  {
    id: 3,
    albumTitle: "Blinding Lights",
    artist: "The Weeknd",
    rating: 4,
    format: "Spotify",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273a3eff72f62782fb589a492f9",
    review: "Great synth-pop vibes throughout.",
    dateAdded: "2024-03-15",
  },
];

export default function ProfileScreen() {
  const colors = useColors();
  const { getFollowerCount, getFollowingCount } = useFollow();
  const { stats } = useStats();
  const router = useRouter();
  const currentUserId = "current-user";
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");

  const userStats = {
    name: "Music Lover",
    bio: "Vinyl enthusiast | Album collector | Music nerd",
    albums: stats.totalAlbumsLogged,
    followers: getFollowerCount(currentUserId),
    following: getFollowingCount(),
    avgRating: stats.averageRating,
  };

  // Sort logs based on selected filter
  const sortedLogs = useMemo(() => {
    const logs = [...mockUserLogs];
    if (sortBy === "date") {
      return logs.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    } else {
      return logs.sort((a, b) => b.rating - a.rating);
    }
  }, [sortBy]);

  const handleViewStats = () => {
    Haptics.impactAsync(ImpactFeedbackStyle.Light);
    router.push("/(tabs)/stats");
  };

  return (
    <ScreenContainer className="p-0">
      <FlatList
        data={sortedLogs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="border-b border-border p-4">
            <View className="flex-row gap-3">
              {/* Album Cover */}
              <Image
                source={{ uri: item.coverUrl }}
                style={{ width: 80, height: 80, borderRadius: 8 }}
              />

              {/* Album Info */}
              <View className="flex-1">
                <Text className="text-lg font-bold text-foreground">{item.albumTitle}</Text>
                <Text className="text-sm text-muted">{item.artist}</Text>
                <View className="flex-row items-center gap-2 mt-2">
                  <Text className="text-primary font-semibold">{item.rating}★</Text>
                  <Text className="text-xs bg-primary px-2 py-1 rounded text-background font-semibold">
                    {item.format}
                  </Text>
                </View>
                <Text className="text-xs text-muted mt-2">{new Date(item.dateAdded).toLocaleDateString()}</Text>
              </View>
            </View>
            {item.review && <Text className="text-sm text-foreground mt-3">{item.review}</Text>}
          </View>
        )}
        ListHeaderComponent={
          <View>
            {/* Profile Header */}
            <View className="bg-surface p-6 border-b border-border">
              <View className="items-center mb-4">
                <Image
                  source={{ uri: "https://i.scdn.co/image/ab67616d0000b273" }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text className="text-2xl font-bold text-foreground mt-4">{userStats.name}</Text>
                <Text className="text-sm text-muted mt-1 text-center">{userStats.bio}</Text>
              </View>

              {/* Stats */}
              <View className="flex-row justify-around mt-4">
                <View className="items-center">
                  <Text className="text-2xl font-bold text-primary">{userStats.albums}</Text>
                  <Text className="text-xs text-muted mt-1">Albums</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-primary">{userStats.followers}</Text>
                  <Text className="text-xs text-muted mt-1">Followers</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-primary">{userStats.following}</Text>
                  <Text className="text-xs text-muted mt-1">Following</Text>
                </View>
              </View>

              {/* View Stats Button */}
              <Pressable
                onPress={handleViewStats}
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.primary,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
                className="mt-4 py-3 px-6 rounded-lg items-center"
              >
                <Text className="text-background font-semibold">View Detailed Stats</Text>
              </Pressable>
            </View>

            {/* Diary/Timeline Section */}
            <View className="p-6 border-b border-border">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-xl font-bold text-foreground">My Diary</Text>
                <View className="flex-row gap-2">
                  <Pressable
                    onPress={() => setSortBy("date")}
                    style={({ pressed }) => [
                      {
                        backgroundColor: sortBy === "date" ? colors.primary : colors.surface,
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                    className="px-3 py-2 rounded-lg border border-border"
                  >
                    <Text className={`text-xs font-semibold ${sortBy === "date" ? "text-background" : "text-foreground"}`}>
                      Newest
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setSortBy("rating")}
                    style={({ pressed }) => [
                      {
                        backgroundColor: sortBy === "rating" ? colors.primary : colors.surface,
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                    className="px-3 py-2 rounded-lg border border-border"
                  >
                    <Text className={`text-xs font-semibold ${sortBy === "rating" ? "text-background" : "text-foreground"}`}>
                      Top Rated
                    </Text>
                  </Pressable>
                </View>
              </View>
              <Text className="text-sm text-muted">{sortedLogs.length} albums logged</Text>
            </View>
          </View>
        }
        scrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ScreenContainer>
  );
}
