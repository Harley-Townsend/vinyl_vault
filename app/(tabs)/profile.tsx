import { ScrollView, Text, View, Image, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useFollow } from "@/lib/follow-context";
import { useStats } from "@/lib/stats-context";
import * as Haptics from "expo-haptics";
import { ImpactFeedbackStyle } from "expo-haptics";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const colors = useColors();
  const { getFollowerCount, getFollowingCount } = useFollow();
  const { stats } = useStats();
  const router = useRouter();
  const currentUserId = "current-user";

  const userStats = {
    name: "Music Lover",
    bio: "Vinyl enthusiast | Album collector | Music nerd",
    albums: stats.totalAlbumsLogged,
    followers: getFollowerCount(currentUserId),
    following: getFollowingCount(),
    avgRating: stats.averageRating,
  };

  const favoriteAlbums = [
    { id: 1, title: "Rumours", artist: "Fleetwood Mac", coverUrl: "https://i.scdn.co/image/ab67616d0000b27357df7ce0eac715cf70e519a7" },
    { id: 2, title: "Abbey Road", artist: "The Beatles", coverUrl: "https://i.scdn.co/image/ab67616d0000b273" },
    { id: 3, title: "Kind of Blue", artist: "Miles Davis", coverUrl: "https://i.scdn.co/image/ab67616d0000b273" },
  ];

  const handleViewStats = () => {
    Haptics.impactAsync(ImpactFeedbackStyle.Light);
    router.push("/(tabs)/stats");
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView showsVerticalScrollIndicator={false}>
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

        {/* Favorite Albums Section */}
        <View className="p-6">
          <Text className="text-xl font-bold text-foreground mb-4">Favorite Albums</Text>
          <View className="flex-row gap-4">
            {favoriteAlbums.map((album) => (
              <View key={album.id} className="items-center flex-1">
                <Image
                  source={{ uri: album.coverUrl }}
                  style={{ width: 80, height: 80, borderRadius: 8 }}
                />
                <Text className="text-xs text-foreground mt-2 text-center font-semibold">{album.title}</Text>
                <Text className="text-xs text-muted text-center">{album.artist}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Average Rating */}
        <View className="px-6 mb-6">
          <View className="bg-surface rounded-lg p-4 border border-border">
            <Text className="text-muted text-sm mb-2">Your Average Rating</Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-4xl font-bold text-primary">{userStats.avgRating.toFixed(1)}</Text>
              <Text className="text-2xl text-primary">★</Text>
            </View>
          </View>
        </View>

        {/* Favorite Genre */}
        <View className="px-6 mb-6">
          <View className="bg-surface rounded-lg p-4 border border-border">
            <Text className="text-muted text-sm mb-2">Favorite Genre</Text>
            <Text className="text-2xl font-bold text-foreground">{stats.favoriteGenre}</Text>
          </View>
        </View>

        {/* Spacer */}
        <View className="h-4" />
      </ScrollView>
    </ScreenContainer>
  );
}
