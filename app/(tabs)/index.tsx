import { ScrollView, Text, View, FlatList, ActivityIndicator, Pressable, Image } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { trpc } from "@/lib/trpc";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";

export default function HomeScreen() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [feedData, setFeedData] = useState<any[]>([]);

  // Fetch home feed
  const { data: feed, isLoading: feedLoading } = trpc.logs.getHomeFeed.useQuery(
    { limit: 50, offset: 0 },
    { enabled: isAuthenticated }
  );

  useEffect(() => {
    if (feed) {
      setFeedData(feed);
    }
  }, [feed]);

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
          <Text className="text-4xl font-bold text-foreground">Vinyl Vault</Text>
          <Text className="text-lg text-muted text-center">
            Log your favorite albums, rate them, and discover what others are listening to.
          </Text>
          <Pressable
            onPress={() => router.push("/oauth/callback")}
            style={({ pressed }) => [
              { opacity: pressed ? 0.8 : 1 },
            ]}
            className="bg-primary px-8 py-4 rounded-full"
          >
            <Text className="text-background font-semibold text-lg">Sign In</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-3xl font-bold text-foreground">Vinyl Vault</Text>
          <Text className="text-sm text-muted mt-1">Welcome, {user?.name || "Listener"}</Text>
        </View>

        {/* Feed */}
        {feedLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#D4AF37" />
          </View>
        ) : feedData.length === 0 ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
            <View className="flex-1 items-center justify-center gap-4">
              <Text className="text-lg font-semibold text-foreground">No logs yet</Text>
              <Text className="text-sm text-muted text-center">
                Follow users or log your first album to see activity here.
              </Text>
              <Pressable
                onPress={() => router.navigate({ pathname: "/(tabs)/search" } as any)}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.8 : 1 },
                ]}
                className="bg-primary px-6 py-3 rounded-full mt-4"
              >
                <Text className="text-background font-semibold">Log an Album</Text>
              </Pressable>
            </View>
          </ScrollView>
        ) : (
          <FlatList
            data={feedData}
            keyExtractor={(item, index) => `${item.log.id}-${index}`}
            renderItem={({ item }) => (
            <FeedCard
              log={item.log}
              album={item.album}
              user={item.user}
              onPress={() => router.navigate({ pathname: "/(tabs)/album-detail", params: { logId: item.log.id } } as any)}
            />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
            scrollEnabled={true}
          />
        )}
      </View>
    </ScreenContainer>
  );
}

function FeedCard({ log, album, user, onPress }: any) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const { data: hasLiked } = trpc.likes.hasLiked.useQuery({ logId: log.id });
  const { data: count } = trpc.likes.getCount.useQuery({ logId: log.id });
  const likeMutation = trpc.likes.like.useMutation();
  const unlikeMutation = trpc.likes.unlike.useMutation();

  useEffect(() => {
    if (hasLiked !== undefined) setLiked(hasLiked);
    if (count !== undefined) setLikeCount(count);
  }, [hasLiked, count]);

  const handleLike = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      if (liked) {
        await unlikeMutation.mutateAsync({ logId: log.id });
        setLiked(false);
        setLikeCount(Math.max(0, likeCount - 1));
      } else {
        await likeMutation.mutateAsync({ logId: log.id });
        setLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
      className="px-6 py-4 border-b border-border"
    >
      <View className="flex-row gap-4">
        {/* Album Cover */}
        <View className="w-16 h-16 bg-surface rounded-lg overflow-hidden">
          {album?.coverArtUrl ? (
            <Image
              source={{ uri: album.coverArtUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full items-center justify-center bg-border">
              <Text className="text-xs text-muted">No Art</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text className="text-sm text-muted">{user?.name || "Anonymous"}</Text>
          <Text className="text-base font-semibold text-foreground mt-1">{album?.title}</Text>
          <Text className="text-sm text-muted">{album?.artistName}</Text>

          {/* Rating and Format */}
          <View className="flex-row items-center gap-2 mt-2">
            <Text className="text-primary font-semibold">
              {"★".repeat(log.rating)}{"☆".repeat(5 - log.rating)}
            </Text>
            <Text className="text-xs text-muted bg-surface px-2 py-1 rounded">
              {log.listeningFormat}
            </Text>
            {log.isFirstListen && (
              <Text className="text-xs text-primary bg-surface px-2 py-1 rounded">
                First Listen
              </Text>
            )}
          </View>

          {/* Review preview */}
          {log.reviewText && (
            <Text className="text-sm text-foreground mt-2 line-clamp-2">
              "{log.reviewText}"
            </Text>
          )}

          {/* Actions */}
          <View className="flex-row items-center gap-4 mt-3">
            <Pressable
              onPress={handleLike}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              className="flex-row items-center gap-1"
            >
              <Text className={liked ? "text-error text-lg" : "text-muted text-lg"}>
                {liked ? "❤️" : "🤍"}
              </Text>
              <Text className="text-xs text-muted">{likeCount}</Text>
            </Pressable>
            <Text className="text-xs text-muted">{formatDate(log.listenedAt)}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
