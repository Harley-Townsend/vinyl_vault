import { ScrollView, Text, View, Pressable, ActivityIndicator, Image, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { trpc } from "@/lib/trpc";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function ProfileScreen() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [userLogs, setUserLogs] = useState<any[]>([]);

  // Fetch user profile and stats
  const { data: profileStats } = trpc.profiles.getStats.useQuery(
    { userId: user?.id || 0 },
    { enabled: isAuthenticated && !!user?.id }
  );

  const { data: logs } = trpc.logs.getUserLogs.useQuery(
    { userId: user?.id || 0, limit: 10, offset: 0 },
    { enabled: isAuthenticated && !!user?.id }
  );

  const { data: favorites } = trpc.favorites.getForUser.useQuery(
    { userId: user?.id || 0, limit: 6 },
    { enabled: isAuthenticated && !!user?.id }
  );

  useEffect(() => {
    if (profileStats) {
      setStats(profileStats);
    }
    if (logs) {
      setUserLogs(logs);
    }
  }, [profileStats, logs]);

  if (loading) {
    return (
      <ScreenContainer className="flex items-center justify-center">
        <ActivityIndicator size="large" color="#D4AF37" />
      </ScreenContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="flex items-center justify-center p-6">
        <View className="gap-6 items-center">
          <Text className="text-2xl font-bold text-foreground">Sign In Required</Text>
          <Text className="text-sm text-muted text-center">
            Sign in to view your profile and listening history.
          </Text>
          <Pressable
            onPress={() => router.navigate({ pathname: "/(tabs)" } as any)}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            className="bg-primary px-8 py-4 rounded-full"
          >
            <Text className="text-background font-semibold">Go Home</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <ScrollView>
        {/* Header */}
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-2xl font-bold text-foreground">My Profile</Text>
        </View>

        {/* Profile Section */}
        <View className="px-6 py-6 border-b border-border">
          <View className="flex-row items-center gap-4">
            {/* Profile Picture */}
            <View className="w-16 h-16 bg-primary rounded-full items-center justify-center">
              <Text className="text-2xl">👤</Text>
            </View>

            {/* User Info */}
            <View className="flex-1">
              <Text className="text-xl font-bold text-foreground">{user?.name || "Listener"}</Text>
              <Text className="text-sm text-muted mt-1">{user?.email}</Text>
            </View>

            {/* Edit Button */}
            <Pressable
              onPress={() => router.navigate({ pathname: "/(tabs)/edit-profile" } as any)}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              className="px-4 py-2 bg-surface border border-border rounded-lg"
            >
              <Text className="text-foreground font-semibold text-sm">Edit</Text>
            </Pressable>
          </View>
        </View>

        {/* Stats Section */}
        {stats && (
          <View className="px-6 py-6 border-b border-border">
            <Text className="text-lg font-semibold text-foreground mb-4">Your Stats</Text>
            <View className="flex-row gap-3">
              <StatCard label="Albums Logged" value={stats.totalLogsCount || 0} />
              <StatCard label="Avg Rating" value={stats.averageRating?.toFixed(1) || "—"} />
              <StatCard label="Followers" value={stats.followerCount || 0} />
              <StatCard label="Following" value={stats.followingCount || 0} />
            </View>
          </View>
        )}

        {/* Favorite Albums */}
        {favorites && favorites.length > 0 && (
          <View className="px-6 py-6 border-b border-border">
            <Text className="text-lg font-semibold text-foreground mb-4">Favorite Albums</Text>
            <View className="flex-row flex-wrap gap-3">
              {favorites.map((fav: any) => (
                <View key={fav.album.id} className="w-[30%]">
                  <Image
                    source={{ uri: fav.album.coverArtUrl || "https://via.placeholder.com/100" }}
                    className="w-full aspect-square rounded-lg"
                    resizeMode="cover"
                  />
                  <Text className="text-xs text-foreground mt-2 font-semibold" numberOfLines={2}>
                    {fav.album.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Recent Logs */}
        {userLogs.length > 0 && (
          <View className="px-6 py-6 border-b border-border">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-foreground">Recent Logs</Text>
              <Pressable
                onPress={() => router.navigate({ pathname: "/(tabs)/my-ratings" } as any)}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Text className="text-primary text-sm font-semibold">See All</Text>
              </Pressable>
            </View>

            {userLogs.map((item: any) => (
              <View key={item.log.id} className="mb-4 pb-4 border-b border-border last:border-b-0">
                <View className="flex-row gap-3">
                  <Image
                    source={{
                      uri: item.album.coverArtUrl || "https://via.placeholder.com/50",
                    }}
                    className="w-12 h-12 rounded"
                    resizeMode="cover"
                  />
                  <View className="flex-1">
                    <Text className="font-semibold text-foreground text-sm">
                      {item.album.title}
                    </Text>
                    <Text className="text-xs text-muted">{item.album.artistName}</Text>
                    <View className="flex-row items-center gap-2 mt-1">
                      <Text className="text-primary text-xs">
                        {"★".repeat(item.log.rating)}{"☆".repeat(5 - item.log.rating)}
                      </Text>
                      <Text className="text-xs text-muted">{item.log.listeningFormat}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Settings */}
        <View className="px-6 py-6 gap-3">
          <Pressable
            onPress={() => router.navigate({ pathname: "/(tabs)/settings" } as any)}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="px-4 py-3 bg-surface border border-border rounded-lg"
          >
            <Text className="text-foreground font-semibold">Settings</Text>
          </Pressable>

          <Pressable
            onPress={logout}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="px-4 py-3 bg-error/10 border border-error rounded-lg"
          >
            <Text className="text-error font-semibold">Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function StatCard({ label, value }: { label: string; value: any }) {
  return (
    <View className="flex-1 bg-surface border border-border rounded-lg p-3 items-center">
      <Text className="text-2xl font-bold text-primary">{value}</Text>
      <Text className="text-xs text-muted mt-1 text-center">{label}</Text>
    </View>
  );
}
