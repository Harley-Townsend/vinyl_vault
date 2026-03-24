import { ScrollView, Text, View, Pressable, Image, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { LogAlbumModal, type LogAlbumData } from "@/components/log-album-modal";

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

// Mock album log data with real album covers
const mockLogs = [
  {
    id: 1,
    albumTitle: "Midnights",
    artist: "Taylor Swift",
    rating: 4.5,
    format: "Vinyl",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/5a/f4/e7/5af4e7d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/886447572622.jpg/600x600bb.jpg",
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
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/7c/5a/f8/7c5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00008811927308.600x600-75.jpg/600x600bb.jpg",
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
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/4c/5a/f8/4c5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602438695622.600x600-75.jpg/600x600bb.jpg",
    review: "Great synth-pop vibes throughout.",
    userName: "synthwave_fan",
    likes: 189,
  },
  {
    id: 4,
    albumTitle: "Abbey Road",
    artist: "The Beatles",
    rating: 5,
    format: "Vinyl",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/8c/5a/f8/8c5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg",
    review: "The greatest album ever made.",
    userName: "beatles_fan",
    likes: 892,
  },
  {
    id: 5,
    albumTitle: "Thriller",
    artist: "Michael Jackson",
    rating: 5,
    format: "CD",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/9c/5a/f8/9c5af8d8-5c8c-f7c9-e1b9-e8c8d8b8a8a8/00602498651088.600x600-75.jpg/600x600bb.jpg",
    review: "Iconic. Timeless. Perfect.",
    userName: "pop_lover",
    likes: 1205,
  },
];

export default function HomeScreen() {
  const colors = useColors();
  const [likedLogs, setLikedLogs] = useState<Set<number>>(new Set());
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [logs, setLogs] = useState(mockLogs);

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

  const handleLogAlbum = (data: LogAlbumData) => {
    const newLog = {
      id: logs.length + 1,
      albumTitle: data.albumTitle,
      artist: data.artist,
      rating: data.rating,
      format: data.format,
      coverUrl: "https://via.placeholder.com/100",
      review: data.review,
      userName: "You",
      likes: 0,
    };
    setLogs([newLog, ...logs]);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <>
      <ScreenContainer className="p-0">
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="border-b border-border p-4">
              {/* Album Header */}
              <View className="flex-row gap-3 mb-3">
                {/* Album Cover */}
                <Image
                  source={{ uri: item.coverUrl }}
                  style={{ width: 80, height: 80, borderRadius: 8, backgroundColor: colors.border }}
                />
                
                {/* Album Info */}
                <View className="flex-1">
                  <Text className="text-xs text-muted mb-1">{item.userName}</Text>
                  <Text className="text-lg font-bold text-foreground">{item.albumTitle}</Text>
                  <Text className="text-sm text-muted">{item.artist}</Text>
                  <View className="flex-row items-center gap-2 mt-1">
                    <StarRating rating={item.rating} />
                    <Text className="text-xs bg-primary px-2 py-1 rounded text-white font-semibold">
                      {item.format}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Review */}
              <Text className="text-sm text-foreground mb-3">{item.review}</Text>

              {/* Interactions */}
              <View className="flex-row gap-4">
                <Pressable
                  onPress={() => toggleLike(item.id)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                  className="flex-row items-center gap-1"
                >
                  <Text className="text-lg">{likedLogs.has(item.id) ? "❤️" : "🤍"}</Text>
                  <Text className="text-sm text-muted">{item.likes}</Text>
                </Pressable>
                <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]} className="flex-row items-center gap-1">
                  <Text className="text-lg">💬</Text>
                  <Text className="text-sm text-muted">Comment</Text>
                </Pressable>
              </View>
            </View>
          )}
          ListHeaderComponent={
            <View className="p-4 pb-2">
              <Text className="text-3xl font-bold text-foreground mb-2">Vinyl Vault</Text>
              <Text className="text-muted">Community album logs</Text>
            </View>
          }
          scrollEnabled={true}
        />
      </ScreenContainer>

      {/* Log Album Button */}
      <Pressable
        onPress={() => setLogModalVisible(true)}
        style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
        className="absolute bottom-24 right-6 bg-primary rounded-full w-16 h-16 items-center justify-center shadow-lg"
      >
        <Text className="text-2xl">+</Text>
      </Pressable>

      {/* Log Album Modal */}
      <LogAlbumModal
        visible={logModalVisible}
        onClose={() => setLogModalVisible(false)}
        onSubmit={handleLogAlbum}
      />
    </>
  );
}
