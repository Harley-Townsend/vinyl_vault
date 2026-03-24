import { ScrollView, Text, View, Pressable, Switch } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import * as Haptics from "expo-haptics";
import { useState } from "react";

export default function SettingsScreen() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === "dark");
  const [notifications, setNotifications] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const SettingRow = ({ label, value, onToggle }: { label: string; value: boolean; onToggle: () => void }) => (
    <View className="flex-row justify-between items-center py-4 px-6 border-b border-border">
      <Text className="text-foreground font-medium">{label}</Text>
      <Switch value={value} onValueChange={onToggle} />
    </View>
  );

  return (
    <ScreenContainer className="p-0">
      <ScrollView>
        <View className="p-6 pb-0">
          <Text className="text-3xl font-bold text-foreground">Settings</Text>
        </View>

        {/* Appearance */}
        <View className="mt-6">
          <View className="px-6 py-3 bg-surface">
            <Text className="text-sm font-bold text-primary">APPEARANCE</Text>
          </View>
          <SettingRow label="Dark Mode" value={darkMode} onToggle={toggleDarkMode} />
        </View>

        {/* Privacy */}
        <View className="mt-6">
          <View className="px-6 py-3 bg-surface">
            <Text className="text-sm font-bold text-primary">PRIVACY</Text>
          </View>
          <SettingRow label="Private Profile" value={privateProfile} onToggle={() => setPrivateProfile(!privateProfile)} />
          <View className="flex-row justify-between items-center py-4 px-6 border-b border-border">
            <Text className="text-foreground font-medium">Block Users</Text>
            <Text className="text-muted">→</Text>
          </View>
        </View>

        {/* Notifications */}
        <View className="mt-6">
          <View className="px-6 py-3 bg-surface">
            <Text className="text-sm font-bold text-primary">NOTIFICATIONS</Text>
          </View>
          <SettingRow label="Enable Notifications" value={notifications} onToggle={() => setNotifications(!notifications)} />
          <View className="flex-row justify-between items-center py-4 px-6 border-b border-border">
            <Text className="text-foreground font-medium">Notification Preferences</Text>
            <Text className="text-muted">→</Text>
          </View>
        </View>

        {/* Account */}
        <View className="mt-6">
          <View className="px-6 py-3 bg-surface">
            <Text className="text-sm font-bold text-primary">ACCOUNT</Text>
          </View>
          <Pressable
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="flex-row justify-between items-center py-4 px-6 border-b border-border"
          >
            <Text className="text-foreground font-medium">Change Password</Text>
            <Text className="text-muted">→</Text>
          </Pressable>
          <Pressable
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="flex-row justify-between items-center py-4 px-6 border-b border-border"
          >
            <Text className="text-foreground font-medium">Email Preferences</Text>
            <Text className="text-muted">→</Text>
          </Pressable>
        </View>

        {/* About */}
        <View className="mt-6">
          <View className="px-6 py-3 bg-surface">
            <Text className="text-sm font-bold text-primary">ABOUT</Text>
          </View>
          <View className="flex-row justify-between items-center py-4 px-6 border-b border-border">
            <Text className="text-foreground font-medium">Version</Text>
            <Text className="text-muted">1.0.0</Text>
          </View>
          <Pressable
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="flex-row justify-between items-center py-4 px-6 border-b border-border"
          >
            <Text className="text-foreground font-medium">About Vinyl Vault</Text>
            <Text className="text-muted">→</Text>
          </Pressable>
          <Pressable
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="flex-row justify-between items-center py-4 px-6"
          >
            <Text className="text-foreground font-medium">Terms & Privacy</Text>
            <Text className="text-muted">→</Text>
          </Pressable>
        </View>

        {/* Logout */}
        <View className="p-6 mt-6">
          <Pressable
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            className="bg-error rounded-lg py-4"
          >
            <Text className="text-white font-semibold text-center">Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
