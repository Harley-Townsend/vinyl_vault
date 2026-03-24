import { ScrollView, Text, View, Pressable, Image, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";
import * as Haptics from "expo-haptics";

// Half-star rating component
function StarRating({ rating, onRate, editable = false }: { rating: number; onRate?: (r: number) => void; editable?: boolean }) {
  const colors = useColors();
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= Math.floor(rating);
    const isHalf = i - 0.5 <= rating && rating < i;
    
    stars.push(
      <Pressable
        key={i}
        onPress={() => {
          if (editable && onRate) {
            onRate(i);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        }}
        disabled={!editable}
        style={{ marginRight: 4 }}
      >
        <Text style={{ fontSize: 24 }}>
          {isFilled ? "★" : isHalf ? "⯨" : "☆"}
        </Text>
      </Pressable>
    );
  }
  
  return <View className="flex-row">{stars}</View>;
}

// Mock album log data
const mockLogs = [
  {
    id: 1,
    albumTitle: "Midnights",
    artist: "Taylor Swift",
    rating: 4.5,
    format: "Vinyl",
    coverUrl: "https://via.placeholder.com/100",
    review: "Amazing album! Love the production.",
    userName: "musiclover92",
    likes: 234,
  },
  {
    id: 2,
    albumTitle: "Rumours",
    artist: "Fleetwood Mac",
    rating: 5,
    format: "CD",
    coverUrl: "https://via.placeholder.com/100",
    review: "Classic masterpiece. Never gets old.",
    userName: "vinylcollector",
    likes: 567,
  },
  {
    id: 3,
    albumTitle: "Blinding Lights",
    artist: "The Weeknd",
    rating: 4,
    format: "Spotify",
    coverUrl: "https://via.placeholder.com/100",
    review: "Great synth-pop vibes throughout.",
    userName: "synthwave_fan",
    likes: 189,
  },
];

export default function HomeScreen() {
  const colors = useColors();
  const [likedLogs, setLikedLogs] = useState<Set<number>>(new Set());

  const toggleLike = (logId: number) => {
    const newLiked = new Set(likedLogs);
    if (newLiked.has(logId)) {
      newLiked.delete(logId);
    } else {
      newLiked.add(logId);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setLikedLogs(newLiked);
  };

  return (
    <ScreenContainer className="p-0">
      <FlatList
        data={mockLogs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="border-b border-border p-4">
            {/* Album Header */}
            <View className="flex-row gap-3 mb-3">
              <Image
                source={{ uri: item.coverUrl }}
                style={{ width: 80, height: 80, borderRadius: 8 }}
              />
              <View className="flex-1">
                <Text className="text-sm text-muted">{item.userName}</Text>
                <Text className="text-lg font-bold text-foreground mt-1">{item.albumTitle}</Text>
                <Text className="text-sm text-muted">{item.artist}</Text>
                <View className="mt-2">
                  <StarRating rating={item.rating} />
                </View>
              </View>
            </View>

            {/* Format Badge */}
            <View className="mb-2">
              <View
                style={{ backgroundColor: colors.primary + "20" }}
                className="inline-flex px-3 py-1 rounded-full self-start"
              >
                <Text style={{ color: colors.primary }} className="text-xs font-semibold">
                  {item.format}
                </Text>
              </View>
            </View>

            {/* Review */}
            <Text className="text-sm text-foreground mb-3">{item.review}</Text>

            {/* Actions */}
            <View className="flex-row gap-4">
              <Pressable
                onPress={() => toggleLike(item.id)}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              >
                <Text className="text-base">
                  {likedLogs.has(item.id) ? "❤️" : "🤍"} {item.likes + (likedLogs.has(item.id) ? 1 : 0)}
                </Text>
              </Pressable>
              <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
                <Text className="text-base">💬 Comment</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListHeaderComponent={
          <View className="p-4 pb-0">
            <Text className="text-3xl font-bold text-foreground mb-2">Vinyl Vault</Text>
            <Text className="text-muted">Community album logs</Text>
          </View>
        }
        scrollEnabled={true}
      />
    </ScreenContainer>
  );
}
