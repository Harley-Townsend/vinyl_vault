import { ScrollView, Text, View, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useStats } from "@/lib/stats-context";
import { useRouter } from "expo-router";

export default function StatsScreen() {
  const { stats } = useStats();
  const router = useRouter();

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-foreground mb-2">Your Stats</Text>
          <Text className="text-muted">Track your listening journey</Text>
        </View>

        {/* Overall Stats Cards */}
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 bg-surface rounded-lg p-4 border border-border">
            <Text className="text-muted text-sm mb-1">Total Albums</Text>
            <Text className="text-3xl font-bold text-foreground">{stats.totalAlbumsLogged}</Text>
          </View>
          <View className="flex-1 bg-surface rounded-lg p-4 border border-border">
            <Text className="text-muted text-sm mb-1">Avg Rating</Text>
            <Text className="text-3xl font-bold text-primary">{stats.averageRating.toFixed(1)}★</Text>
          </View>
        </View>

        {/* Favorite Genre */}
        <View className="bg-surface rounded-lg p-4 border border-border mb-6">
          <Text className="text-muted text-sm mb-2">Your Favorite Genre</Text>
          <Text className="text-2xl font-bold text-foreground">{stats.favoriteGenre}</Text>
        </View>

        {/* Genre Breakdown */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-foreground mb-4">Genre Breakdown</Text>
          {stats.genreBreakdown.map((genre, index) => (
            <View key={index} className="mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-foreground font-medium">{genre.genre}</Text>
                <View className="flex-row items-center gap-2">
                  <Text className="text-muted text-sm">{genre.count} albums</Text>
                  <Text className="text-primary font-semibold">{genre.averageRating.toFixed(1)}★</Text>
                </View>
              </View>
              {/* Simple bar chart */}
              <View className="h-2 bg-border rounded-full overflow-hidden">
                <View
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${(genre.count / 12) * 100}%` }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Recent Albums */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-foreground mb-4">Recently Logged</Text>
          {stats.recentAlbums.map((album, index) => (
            <View key={index} className="flex-row justify-between items-center bg-surface rounded-lg p-3 mb-3 border border-border">
              <View className="flex-1">
                <Text className="text-foreground font-semibold">{album.title}</Text>
                <Text className="text-muted text-sm">{album.artist}</Text>
              </View>
              <Text className="text-primary font-bold">{album.rating}★</Text>
            </View>
          ))}
        </View>

        {/* Spacer */}
        <View className="h-4" />
      </ScrollView>
    </ScreenContainer>
  );
}
