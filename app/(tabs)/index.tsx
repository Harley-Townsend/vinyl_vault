import { ScrollView, Text, View, Pressable, Image, FlatList, TextInput, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { LogAlbumModal, type LogAlbumData } from "@/components/log-album-modal";
import { HalfStarRating } from "@/components/half-star-rating";
import { useFollow } from "@/lib/follow-context";

// Alias for compatibility
const StarRating = HalfStarRating;

interface Comment {
  id: number;
  userName: string;
  userId: string;
  text: string;
  timestamp: string;
}

interface AlbumLog {
  id: number;
  albumTitle: string;
  artist: string;
  rating: number;
  format: string;
  coverUrl: string;
  review: string;
  userName: string;
  userId: string;
  likes: number;
  comments: Comment[];
}

// Mock album log data with Spotify artwork
const mockLogs: AlbumLog[] = [
  {
    id: 1,
    albumTitle: "Midnights",
    artist: "Taylor Swift",
    rating: 4.5,
    format: "Vinyl",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
    review: "Amazing album! Love the production.",
    userName: "musiclover92",
    userId: "musiclover92",
    likes: 234,
    comments: [
      { id: 1, userName: "user123", userId: "user123", text: "Totally agree! Lavender edition is beautiful", timestamp: "2h ago" },
      { id: 2, userName: "vinylhead", userId: "vinylhead", text: "The vinyl pressing sounds incredible", timestamp: "1h ago" },
    ],
  },
  {
    id: 2,
    albumTitle: "Rumours",
    artist: "Fleetwood Mac",
    rating: 5,
    format: "CD",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b27357df7ce0eac715cf70e519a7",
    review: "Classic masterpiece. Never gets old.",
    userName: "vinylcollector",
    userId: "vinylcollector",
    likes: 567,
    comments: [
      { id: 3, userName: "classicrock_fan", userId: "classicrock_fan", text: "One of the best albums ever made", timestamp: "3h ago" },
    ],
  },
  {
    id: 3,
    albumTitle: "Blinding Lights",
    artist: "The Weeknd",
    rating: 4,
    format: "Spotify",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273a3eff72f62782fb589a492f9",
    review: "Great synth-pop vibes throughout.",
    userName: "synthwave_fan",
    userId: "synthwave_fan",
    likes: 189,
    comments: [],
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const { followedUsers } = useFollow();
  const [likedLogs, setLikedLogs] = useState<Set<number>>(new Set());
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [logs, setLogs] = useState(mockLogs);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");

  // Filter logs to show only from followed users
  const filteredLogs = logs.filter((log) => followedUsers.has(log.userId));

  const handleAlbumTap = (log: typeof mockLogs[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/album-detail",
      params: {
        albumId: log.id.toString(),
        title: log.albumTitle,
        artist: log.artist,
        coverUrl: log.coverUrl,
        releaseDate: "2024",
        genres: "Pop,Rock",
        description: "A great album with amazing production and memorable tracks.",
      },
    });
  };

  const handleUserTap = (userId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/user-profile",
      params: { userId },
    });
  };

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
    const newLog: AlbumLog = {
      id: logs.length + 1,
      albumTitle: data.albumTitle,
      artist: data.artist,
      rating: data.rating,
      format: data.format,
      coverUrl: data.coverUrl,
      review: data.review,
      userName: "You",
      userId: "current-user",
      likes: 0,
      comments: [],
    };
    setLogs([newLog, ...logs]);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleAddComment = () => {
    if (!commentText.trim() || selectedLogId === null) return;

    setLogs(
      logs.map((log) => {
        if (log.id === selectedLogId) {
          return {
            ...log,
            comments: [
              ...log.comments,
              {
                id: log.comments.length + 1,
                userName: "You",
                userId: "current-user",
                text: commentText,
                timestamp: "now",
              },
            ],
          };
        }
        return log;
      })
    );

    setCommentText("");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const selectedLog = logs.find((log) => log.id === selectedLogId);

  return (
    <>
      <ScreenContainer className="p-0">
        <FlatList
          data={filteredLogs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="border-b border-border p-4">
              {/* Album Header */}
              <Pressable
                onPress={() => handleAlbumTap(item)}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <View className="flex-row gap-3 mb-3">
                  {/* Album Cover with Fallback */}
                  <View style={{ width: 80, height: 80, borderRadius: 8, backgroundColor: colors.border, overflow: 'hidden' }}>
                    {item.coverUrl ? (
                      <Image
                        source={{ uri: item.coverUrl }}
                        style={{ width: '100%', height: '100%', borderRadius: 8 }}
                        onError={() => console.log('Image failed to load')}
                      />
                    ) : (
                      <View className="w-full h-full bg-primary items-center justify-center">
                        <Text className="text-2xl text-background">♫</Text>
                      </View>
                    )}
                  </View>
                  
                  {/* Album Info */}
                  <View className="flex-1">
                  <Pressable onPress={() => handleUserTap(item.userId)}>
                    <Text className="text-xs text-muted mb-1 font-semibold hover:underline">{item.userName}</Text>
                  </Pressable>
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
              </Pressable>

              {/* Review */}
              <Text className="text-sm text-foreground mb-3">{item.review}</Text>

              {/* Comments Preview */}
              {item.comments.length > 0 && (
                <View className="bg-surface rounded-lg p-2 mb-3">
                  {item.comments.slice(0, 2).map((comment) => (
                    <View key={comment.id} className="mb-2">
                      <Pressable onPress={() => handleUserTap(comment.userId)}>
                        <Text className="text-xs font-semibold text-primary">{comment.userName}</Text>
                      </Pressable>
                      <Text className="text-xs text-muted">{comment.text}</Text>
                    </View>
                  ))}
                  {item.comments.length > 2 && (
                    <Text className="text-xs text-primary font-semibold">+{item.comments.length - 2} more</Text>
                  )}
                </View>
              )}

              {/* Interactions */}
              <View className="flex-row gap-4">
                <Pressable
                  onPress={() => toggleLike(item.id)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                  className="flex-row items-center gap-1"
                >
                  <Text className={`text-lg ${ likedLogs.has(item.id) ? 'text-primary' : 'text-muted'}`}>{likedLogs.has(item.id) ? '❤️' : '🤍'}</Text>
                  <Text className="text-sm text-muted">{item.likes}</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setSelectedLogId(item.id);
                    setCommentModalVisible(true);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                  className="flex-row items-center gap-1"
                >
                  <View className="w-6 h-6 rounded-full items-center justify-center bg-surface border border-border">
                    <Text className="text-sm text-muted">💭</Text>
                  </View>
                  <Text className="text-sm text-muted">{item.comments.length}</Text>
                </Pressable>
              </View>
            </View>
          )}
          ListHeaderComponent={
            <View className="p-6 pb-4 mt-2">
              <Text className="text-4xl font-bold text-foreground mb-2">Vinyl Vault</Text>
              <Text className="text-muted">Community album logs</Text>
            </View>
          }
          scrollEnabled={true}
        />
      </ScreenContainer>

      {/* Log Album Button - Positioned at bottom above tab bar */}
      <Pressable
        onPress={() => setLogModalVisible(true)}
        style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
        className="absolute bottom-24 right-6 bg-primary rounded-full w-16 h-16 items-center justify-center shadow-lg"
      >
        <Text className="text-3xl text-background font-bold">+</Text>
      </Pressable>

      {/* Log Album Modal */}
      <LogAlbumModal
        visible={logModalVisible}
        onClose={() => setLogModalVisible(false)}
        onSubmit={handleLogAlbum}
      />

      {/* Comments Modal */}
      <Modal
        visible={commentModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, backgroundColor: colors.background }}
        >
          <View style={{ flex: 1, backgroundColor: colors.background }}>
            {/* Header */}
            <View className="flex-row items-center justify-between p-6 pb-4 border-b border-border mt-2">
              <Text className="text-2xl font-bold text-foreground">Comments</Text>
              <Pressable 
                onPress={() => setCommentModalVisible(false)}
                style={{ padding: 12, marginRight: -12 }}
              >
                <Text className="text-3xl">✕</Text>
              </Pressable>
            </View>

            {/* Comments List */}
            <FlatList
              data={selectedLog?.comments || []}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="bg-surface rounded-lg p-3 m-4 mb-2">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-sm font-semibold text-foreground">{item.userName}</Text>
                    <Text className="text-xs text-muted">{item.timestamp}</Text>
                  </View>
                  <Text className="text-sm text-foreground">{item.text}</Text>
                </View>
              )}
              ListEmptyComponent={
                <Text className="text-center text-muted py-8">No comments yet. Be the first!</Text>
              }
              scrollEnabled={true}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
            />

            {/* Comment Input - Fixed at bottom */}
            <View className="border-t border-border p-4 bg-background">
              <TextInput
                placeholder="Add a comment..."
                placeholderTextColor={colors.muted}
                value={commentText}
                onChangeText={setCommentText}
                multiline
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground mb-3"
                style={{ minHeight: 60, maxHeight: 120 }}
              />
              <Pressable
                onPress={handleAddComment}
                disabled={!commentText.trim()}
                style={({ pressed }) => [
                  {
                    backgroundColor: commentText.trim() ? colors.primary : colors.border,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
                className="rounded-lg py-3 items-center"
              >
                <Text className="text-white font-semibold">Post Comment</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
