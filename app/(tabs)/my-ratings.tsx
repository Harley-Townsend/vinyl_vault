import { ScrollView, Text, View, FlatList, ActivityIndicator, Pressable, Image } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { trpc } from "@/lib/trpc";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

export default function MyRatingsScreen() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [logs, setLogs] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "artist">("recent");

  const { data: userLogs, isLoading } = trpc.logs.getUserLogs.useQuery(
    { userId: user?.id || 0, limit: 100, offset: 0 },
    { enabled: isAuthenticated && !!user?.id }
  );

  useEffect(() => {
    if (userLogs) {
      let sorted = [...userLogs];

      if (sortBy === "rating") {
        sorted.sort((a, b) => b.log.rating - a.log.rating);
      } else if (sortBy === "artist") {
        sorted.sort((a, b) => a.album.artistName.localeCompare(b.album.artistName));
      } else {
        sorted.sort((a, b) => new Date(b.log.createdAt).getTime() - new Date(a.log.createdAt).getTime());
      }

      setLogs(sorted);
    }
  }, [userLogs, sortBy]);

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="flex items-center justify-center">
        <Text className="text-foreground">Not authenticated</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 border-b border-border">
          <Pressable onPress={() => router.back()}>
            <Text className="text-primary text-lg">← Back</Text>
          </Pressable>
          <Text className="text-2xl font-bold text-foreground mt-3">My Ratings</Text>
          <Text className="text-sm text-muted mt-1">{logs.length} albums logged</Text>
        </View>

        {/* Sort Options */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-6 py-3 border-b border-border"
        >
          {(["recent", "rating", "artist"] as const).map((option) => (
            <Pressable
              key={option}
              onPress={() => setSortBy(option)}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              className={`mr-3 px-4 py-2 rounded-full ${
                sortBy === option ? "bg-primary" : "bg-surface border border-border"
              }`}
            >
              <Text
                className={`text-sm font-semibold capitalize ${
                  sortBy === option ? "text-background" : "text-foreground"
                }`}
              >
                {option === "recent" ? "Recent" : option === "rating" ? "Top Rated" : "Artist"}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Logs List */}
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#D4AF37" />
          </View>
        ) : logs.length === 0 ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
            <View className="flex-1 items-center justify-center">
              <Text className="text-lg font-semibold text-foreground">No ratings yet</Text>
              <Text className="text-sm text-muted mt-2 text-center">
                Start logging albums to see them here.
              </Text>
            </View>
          </ScrollView>
        ) : (
          <FlatList
            data={logs}
            keyExtractor={(item) => `${item.log.id}`}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.navigate({ pathname: "/(tabs)/album-detail", params: { logId: item.log.id } } as any)}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                className="px-6 py-4 border-b border-border"
              >
                <View className="flex-row gap-4">
                  {/* Album Cover */}
                  <Image
                    source={{
                      uri: item.album.coverArtUrl || "https://via.placeholder.com/80",
                    }}
                    className="w-16 h-16 rounded-lg"
                    resizeMode="cover"
                  />

                  {/* Content */}
                  <View className="flex-1 justify-center">
                    <Text className="text-base font-semibold text-foreground" numberOfLines={2}>
                      {item.album.title}
                    </Text>
                    <Text className="text-sm text-muted mt-1">{item.album.artistName}</Text>

                    {/* Rating and Format */}
                    <View className="flex-row items-center gap-2 mt-2">
                      <Text className="text-primary font-semibold">
                        {"★".repeat(item.log.rating)}{"☆".repeat(5 - item.log.rating)}
                      </Text>
                      <Text className="text-xs text-muted bg-surface px-2 py-1 rounded">
                        {item.log.listeningFormat}
                      </Text>
                    </View>
                  </View>

                  {/* Arrow */}
                  <View className="justify-center">
                    <Text className="text-primary text-lg">→</Text>
                  </View>
                </View>
              </Pressable>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </ScreenContainer>
  );
}
