import { ScrollView, Text, View, ActivityIndicator, Pressable, Image, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import * as Haptics from "expo-haptics";

export default function AlbumDetailScreen() {
  const router = useRouter();
  const { logId } = useLocalSearchParams();
  const [log, setLog] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const { data: logData, isLoading } = trpc.logs.getById.useQuery(
    { id: parseInt(logId as string) },
    { enabled: !!logId }
  );

  const { data: reviewsData } = trpc.reviews.getForLog.useQuery(
    { logId: parseInt(logId as string) },
    { enabled: !!logId }
  );

  const { data: hasLiked } = trpc.likes.hasLiked.useQuery(
    { logId: parseInt(logId as string) },
    { enabled: !!logId }
  );

  const { data: count } = trpc.likes.getCount.useQuery(
    { logId: parseInt(logId as string) },
    { enabled: !!logId }
  );

  const likeMutation = trpc.likes.like.useMutation();
  const unlikeMutation = trpc.likes.unlike.useMutation();

  useEffect(() => {
    if (logData) setLog(logData);
    if (reviewsData) setReviews(reviewsData);
    if (hasLiked !== undefined) setLiked(hasLiked);
    if (count !== undefined) setLikeCount(count);
  }, [logData, reviewsData, hasLiked, count]);

  const handleLike = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      if (liked) {
        await unlikeMutation.mutateAsync({ logId: parseInt(logId as string) });
        setLiked(false);
        setLikeCount(Math.max(0, likeCount - 1));
      } else {
        await likeMutation.mutateAsync({ logId: parseInt(logId as string) });
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

  if (isLoading) {
    return (
      <ScreenContainer className="flex items-center justify-center">
        <ActivityIndicator size="large" color="#D4AF37" />
      </ScreenContainer>
    );
  }

  if (!log) {
    return (
      <ScreenContainer className="flex items-center justify-center p-6">
        <Text className="text-foreground">Album not found</Text>
        <Pressable onPress={() => router.back()} className="mt-4">
          <Text className="text-primary font-semibold">Go Back</Text>
        </Pressable>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <ScrollView>
        {/* Header */}
        <View className="px-6 py-4 border-b border-border">
          <Pressable onPress={() => router.back()}>
            <Text className="text-primary text-lg">← Back</Text>
          </Pressable>
        </View>

        {/* Album Cover */}
        <View className="px-6 py-6 items-center">
          <Image
            source={{
              uri: log.album?.coverArtUrl || "https://via.placeholder.com/200",
            }}
            className="w-40 h-40 rounded-lg"
            resizeMode="cover"
          />
        </View>

        {/* Album Info */}
        <View className="px-6 py-6 border-b border-border">
          <Text className="text-2xl font-bold text-foreground">{log.album?.title}</Text>
          <Text className="text-lg text-muted mt-2">{log.album?.artistName}</Text>

          {log.album?.releaseDate && (
            <Text className="text-sm text-muted mt-2">
              Released: {new Date(log.album.releaseDate).getFullYear()}
            </Text>
          )}

          {log.album?.label && (
            <Text className="text-sm text-muted mt-1">Label: {log.album.label}</Text>
          )}
        </View>

        {/* User's Log */}
        <View className="px-6 py-6 border-b border-border">
          <Text className="text-lg font-semibold text-foreground mb-3">Your Log</Text>

          {/* Rating */}
          <View className="mb-4">
            <Text className="text-primary font-semibold text-2xl">
              {"★".repeat(log.log?.rating)}{"☆".repeat(5 - (log.log?.rating || 0))}
            </Text>
            <Text className="text-sm text-muted mt-1">{log.log?.rating} out of 5 stars</Text>
          </View>

          {/* Listening Details */}
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Text className="text-sm text-muted">Format:</Text>
              <Text className="text-sm bg-surface px-3 py-1 rounded text-foreground font-semibold">
                {log.log?.listeningFormat}
              </Text>
            </View>

            {log.log?.isFirstListen && (
              <View className="flex-row items-center gap-2">
                <Text className="text-sm text-primary">✨ First time listening</Text>
              </View>
            )}

            <View className="flex-row items-center gap-2">
              <Text className="text-sm text-muted">Logged:</Text>
              <Text className="text-sm text-foreground">{formatDate(log.log?.listenedAt)}</Text>
            </View>
          </View>

          {/* Review */}
          {log.log?.reviewText && (
            <View className="mt-4 p-4 bg-surface rounded-lg border border-border">
              <Text className="text-foreground">{log.log.reviewText}</Text>
            </View>
          )}
        </View>

        {/* Actions */}
        <View className="px-6 py-6 border-b border-border flex-row gap-3">
          <Pressable
            onPress={handleLike}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className={`flex-1 py-3 rounded-lg items-center ${
              liked ? "bg-error/10 border border-error" : "bg-surface border border-border"
            }`}
          >
            <View className="flex-row items-center gap-2">
              <Text className={liked ? "text-error text-xl" : "text-muted text-xl"}>
                {liked ? "❤️" : "🤍"}
              </Text>
              <Text className={liked ? "text-error font-semibold" : "text-foreground font-semibold"}>
                {likeCount}
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => router.navigate({ pathname: "/(tabs)/log-album", params: { albumData: JSON.stringify(log.album) } } as any)}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="flex-1 py-3 rounded-lg items-center bg-primary"
          >
            <Text className="text-background font-semibold">Log Again</Text>
          </Pressable>
        </View>

        {/* Reviews */}
        {reviews.length > 0 && (
          <View className="px-6 py-6">
            <Text className="text-lg font-semibold text-foreground mb-4">
              Comments ({reviews.length})
            </Text>

            {reviews.map((review: any) => (
              <View
                key={review.review.id}
                className="mb-4 p-4 bg-surface rounded-lg border border-border"
              >
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="font-semibold text-foreground">{review.user?.name}</Text>
                  <Text className="text-xs text-muted">
                    {formatDate(review.review.createdAt)}
                  </Text>
                </View>
                <Text className="text-sm text-foreground">{review.review.commentText}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
