import { ScrollView, Text, View, Image, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useFollow } from "@/lib/follow-context";
import * as Haptics from "expo-haptics";
import { ImpactFeedbackStyle } from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";

interface UserProfile {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  albumsLogged: number;
  followers: number;
  following: number;
  avgRating: number;
}

// Mock user data
const MOCK_USERS: Record<string, UserProfile> = {
  "musiclover92": {
    id: "musiclover92",
    name: "Music Lover",
    bio: "Vinyl enthusiast | Album collector | Music nerd",
    avatar: "https://i.scdn.co/image/ab67616d0000b273",
    albumsLogged: 127,
    followers: 342,
    following: 89,
    avgRating: 4.2,
  },
  "vinylcollector": {
    id: "vinylcollector",
    name: "Vinyl Collector",
    bio: "Collecting vinyl records since 1995",
    avatar: "https://i.scdn.co/image/ab67616d0000b273",
    albumsLogged: 89,
    followers: 156,
    following: 42,
    avgRating: 4.5,
  },
  "synthwave_fan": {
    id: "synthwave_fan",
    name: "Synthwave Fan",
    bio: "80s vibes, electronic beats",
    avatar: "https://i.scdn.co/image/ab67616d0000b273",
    albumsLogged: 45,
    followers: 78,
    following: 34,
    avgRating: 4.0,
  },
};

export default function UserProfileScreen() {
  const colors = useColors();
  const router = useRouter();
  const { userId } = useLocalSearchParams();
  const { isFollowing, follow, unfollow } = useFollow();

  const user = MOCK_USERS[userId as string];

  if (!user) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">User not found</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 bg-primary px-6 py-3 rounded-lg"
        >
          <Text className="text-background font-semibold">Go Back</Text>
        </Pressable>
      </ScreenContainer>
    );
  }

  const isCurrentUserFollowing = isFollowing(user.id);

  const handleFollowToggle = () => {
    Haptics.impactAsync(ImpactFeedbackStyle.Light);
    if (isCurrentUserFollowing) {
      unfollow(user.id);
    } else {
      follow(user.id);
    }
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="bg-surface p-6 border-b border-border">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1">
              <Image
                source={{ uri: user.avatar }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
              <Text className="text-2xl font-bold text-foreground mt-4">{user.name}</Text>
              <Text className="text-sm text-muted mt-1">{user.bio}</Text>
            </View>

            {/* Follow Button */}
            <Pressable
              onPress={handleFollowToggle}
              style={({ pressed }) => [
                {
                  backgroundColor: isCurrentUserFollowing ? colors.border : colors.primary,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              className="px-4 py-2 rounded-lg"
            >
              <Text className={`font-semibold ${isCurrentUserFollowing ? "text-foreground" : "text-background"}`}>
                {isCurrentUserFollowing ? "Following" : "Follow"}
              </Text>
            </Pressable>
          </View>

          {/* Stats */}
          <View className="flex-row justify-around mt-4">
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary">{user.albumsLogged}</Text>
              <Text className="text-xs text-muted mt-1">Albums</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary">{user.followers}</Text>
              <Text className="text-xs text-muted mt-1">Followers</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary">{user.following}</Text>
              <Text className="text-xs text-muted mt-1">Following</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary">{user.avgRating.toFixed(1)}★</Text>
              <Text className="text-xs text-muted mt-1">Avg Rating</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="p-6">
          <Text className="text-xl font-bold text-foreground mb-4">Recent Albums</Text>
          <View className="bg-surface rounded-lg p-4 border border-border">
            <Text className="text-sm text-muted text-center py-8">
              This user's recent album logs will appear here
            </Text>
          </View>
        </View>

        {/* Spacer */}
        <View className="h-4" />
      </ScrollView>

      {/* Close Button */}
      <Pressable
        onPress={() => router.back()}
        style={{ position: "absolute", top: 16, left: 16, zIndex: 10 }}
        className="bg-surface rounded-full w-10 h-10 items-center justify-center border border-border"
      >
        <Text className="text-lg text-foreground">✕</Text>
      </Pressable>
    </ScreenContainer>
  );
}
