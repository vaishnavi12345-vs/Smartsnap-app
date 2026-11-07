import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

const GOLD = '#d7fa75';
const MUTED = '#838782';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: '#111312', borderTopColor: '#242725', height: 82, paddingTop: 9, paddingBottom: 20 },
      tabBarActiveTintColor: GOLD,
      tabBarInactiveTintColor: MUTED,
      tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="gallery" options={{ title: 'Gallery', tabBarIcon: ({ color, size }) => <Ionicons name="images-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="studio" options={{ title: 'Studio', tabBarIcon: ({ color, size }) => <View style={{ width: 42, height: 42, borderRadius: 15, backgroundColor: GOLD, alignItems: 'center', justifyContent: 'center', marginTop: -19 }}><Ionicons name="sparkles" size={21} color="#171a13" /></View> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
    </Tabs>
  );
}
