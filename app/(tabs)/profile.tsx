import { ScrollView, Text, View, Pressable, Image } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

export default function ProfileScreen() {
  const colors = useColors();

  const userStats = {
    name: "Music Lover",
    bio: "Vinyl enthusiast | Album collector | Music nerd",
    albums: 127,
    followers: 342,
    following: 89,
    avgRating: 4.2,
  };

  const favoriteAlbums = [
    { id: 1, title: "Rumours", artist: "Fleetwood Mac", coverUrl: "https://via.placeholder.com/100" },
    { id: 2, title: "Abbey Road", artist: "The Beatles", coverUrl: "https://via.placeholder.com/100" },
    { id: 3, title: "Thriller", artist: "Michael Jackson", coverUrl: "https://via.placeholder.com/100" },
  ];

  return (
    <ScreenContainer className="p-0">
      <ScrollView>
        {/* Profile Header */}
        <View className="bg-surface p-6 border-b border-border">
          <View className="items-center mb-4">
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
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
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary">{userStats.avgRating}★</Text>
              <Text className="text-xs text-muted mt-1">Avg Rating</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3 mt-4">
            <Pressable
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, flex: 1 }]}
              className="bg-primary rounded-lg py-3"
            >
              <Text className="text-white font-semibold text-center">Edit Profile</Text>
            </Pressable>
            <Pressable
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, flex: 1 }]}
              className="bg-surface border border-border rounded-lg py-3"
            >
              <Text className="text-foreground font-semibold text-center">Share</Text>
            </Pressable>
          </View>
        </View>

        {/* Favorite Albums */}
        <View className="p-6">
          <Text className="text-xl font-bold text-foreground mb-4">Favorite Albums</Text>
          <View className="flex-row gap-3">
            {favoriteAlbums.map((album) => (
              <Pressable
                key={album.id}
                onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                className="flex-1"
              >
                <Image
                  source={{ uri: album.coverUrl }}
                  style={{ width: "100%", height: 100, borderRadius: 8 }}
                />
                <Text className="text-xs font-semibold text-foreground mt-2" numberOfLines={1}>
                  {album.title}
                </Text>
                <Text className="text-xs text-muted" numberOfLines={1}>
                  {album.artist}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View className="p-6 border-t border-border">
          <Text className="text-xl font-bold text-foreground mb-4">Recent Activity</Text>
          <View className="gap-3">
            {[1, 2, 3].map((i) => (
              <View key={i} className="bg-surface p-4 rounded-lg">
                <Text className="text-sm font-semibold text-foreground">Logged "Album Title"</Text>
                <Text className="text-xs text-muted mt-1">Rated 4.5 ★ • 2 days ago</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
