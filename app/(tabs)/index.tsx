import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LIME = '#d7fa75';
const FEATURE = 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&auto=format&fit=crop&q=85';
const RECENT = [
  { id: '1', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700&auto=format&fit=crop&q=80', title: 'Open road' },
  { id: '2', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=700&auto=format&fit=crop&q=80', title: 'Blue hour' },
  { id: '3', image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=700&auto=format&fit=crop&q=80', title: 'Golden light' },
];

function SectionTitle({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  return <View style={styles.sectionTitle}><Text style={styles.sectionHeading}>{title}</Text>{action ? <Pressable onPress={onPress}><Text style={styles.action}>{action}</Text></Pressable> : null}</View>;
}

export default function HomeScreen() {
  const router = useRouter();
  const tools = [
    { name: 'Enhance', icon: 'sparkles-outline' as const, screen: '/gallery' },
    { name: 'Edit photo', icon: 'options-outline' as const, screen: '/gallery' },
    { name: 'Filters', icon: 'color-filter-outline' as const, screen: '/studio' },
    { name: 'Collage', icon: 'grid-outline' as const, screen: '/studio' },
  ];
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topbar}>
          <View><Text style={styles.brand}>SMART<Text style={{ color: LIME }}>SNAP</Text></Text><Text style={styles.tagline}>YOUR CREATIVE SPACE</Text></View>
          <Pressable style={styles.avatar} onPress={() => router.push('/profile')}><Ionicons name="person" size={18} color="#141610" /></Pressable>
        </View>
        <Text style={styles.greeting}>Make something{ '\n' }<Text style={styles.greetingAccent}>beautiful today.</Text></Text>
        <Pressable style={styles.featureCard} onPress={() => router.push('/camera')}>
          <Image source={{ uri: FEATURE }} style={StyleSheet.absoluteFill} resizeMode="cover" />
          <View style={styles.featureScrim} />
          <View style={styles.featureTop}><View style={styles.liveTag}><View style={styles.dot} /><Text style={styles.liveText}>YOUR NEXT SHOT</Text></View><Ionicons name="arrow-up" size={18} color="white" /></View>
          <View><Text style={styles.featureTitle}>See it.{ '\n' }Capture it.</Text><Text style={styles.featureSub}>A little inspiration goes a long way.</Text></View>
          <View style={styles.cameraCta}><Ionicons name="camera" size={18} color="#171a13" /><Text style={styles.cameraCtaText}>Open camera</Text></View>
        </Pressable>
        <SectionTitle title="Quick tools" />
        <View style={styles.toolGrid}>{tools.map((tool) => <Pressable key={tool.name} style={styles.tool} onPress={() => router.push(tool.screen as never)}><View style={styles.toolIcon}><Ionicons name={tool.icon} size={21} color={LIME} /></View><Text style={styles.toolText}>{tool.name}</Text></Pressable>)}</View>
        <SectionTitle title="Your inspiration" action="See all" onPress={() => router.push('/gallery')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentRow}>{RECENT.map((photo) => <Pressable key={photo.id} style={styles.recentCard} onPress={() => router.push('/gallery')}><Image source={{ uri: photo.image }} style={styles.recentImage} /><View style={styles.recentLabel}><Text style={styles.recentText}>{photo.title}</Text><Ionicons name="arrow-forward" size={14} color={LIME} /></View></Pressable>)}</ScrollView>
        <View style={styles.tip}><Ionicons name="bulb-outline" size={19} color={LIME} /><Text style={styles.tipText}>Good light is everywhere. Look for it.</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0d0e0e' }, content: { paddingHorizontal: 22, paddingBottom: 32 },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 9, marginBottom: 27 },
  brand: { color: '#f4f4ed', fontSize: 19, letterSpacing: 1.8, fontWeight: '900' }, tagline: { color: '#858a82', fontSize: 8, letterSpacing: 2, marginTop: 3, fontWeight: '700' },
  avatar: { width: 39, height: 39, borderRadius: 14, backgroundColor: LIME, alignItems: 'center', justifyContent: 'center' },
  greeting: { color: '#f4f4ed', fontSize: 31, lineHeight: 37, fontWeight: '700', letterSpacing: -1, marginBottom: 20 }, greetingAccent: { color: LIME },
  featureCard: { height: 285, borderRadius: 22, overflow: 'hidden', padding: 18, justifyContent: 'space-between', marginBottom: 27 }, featureScrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.28)' }, featureTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  liveTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(17,19,18,0.65)', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20 }, dot: { width: 6, height: 6, borderRadius: 5, backgroundColor: LIME, marginRight: 7 }, liveText: { fontSize: 9, color: 'white', fontWeight: '800', letterSpacing: 1 },
  featureTitle: { fontSize: 34, color: 'white', fontWeight: '800', lineHeight: 35, letterSpacing: -1 }, featureSub: { color: '#eceee8', fontSize: 12, marginTop: 8 },
  cameraCta: { alignSelf: 'flex-start', flexDirection: 'row', gap: 8, alignItems: 'center', borderRadius: 12, backgroundColor: LIME, paddingHorizontal: 15, paddingVertical: 11 }, cameraCtaText: { color: '#171a13', fontSize: 12, fontWeight: '800' },
  sectionTitle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }, sectionHeading: { color: '#f4f4ed', fontSize: 17, fontWeight: '700', letterSpacing: -0.3 }, action: { color: LIME, fontSize: 12, fontWeight: '700' },
  toolGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28 }, tool: { width: '23%', alignItems: 'center', gap: 8 }, toolIcon: { width: 57, height: 57, borderRadius: 18, backgroundColor: '#1b1f1b', alignItems: 'center', justifyContent: 'center' }, toolText: { color: '#c4c8c0', fontSize: 10, fontWeight: '600' },
  recentRow: { gap: 12, paddingBottom: 3 }, recentCard: { width: 143, backgroundColor: '#171918', borderRadius: 16, overflow: 'hidden' }, recentImage: { width: '100%', height: 112 }, recentLabel: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 11 }, recentText: { color: '#e8e9e2', fontSize: 11, fontWeight: '600' },
  tip: { flexDirection: 'row', alignItems: 'center', gap: 9, padding: 14, marginTop: 24, borderRadius: 14, backgroundColor: '#171a16' }, tipText: { color: '#b8bdb2', fontSize: 12 },
});
