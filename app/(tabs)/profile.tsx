import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const LIME = '#d7fa75';
export default function ProfileScreen() {
  const router = useRouter();
  const rows = [
    { label: 'Camera settings', icon: 'camera-outline' as const, action: () => router.push('/camera') },
    { label: 'Photo library', icon: 'images-outline' as const, action: () => router.push('/gallery') },
    { label: 'Privacy & permissions', icon: 'shield-checkmark-outline' as const, action: () => Alert.alert('Your privacy', 'SmartSnap MVP processes photos on your device. Photos are not uploaded to a server.') },
    { label: 'Help & feedback', icon: 'help-circle-outline' as const, action: () => Alert.alert('SmartSnap help', 'Thanks for trying SmartSnap. More support options will be added soon.') },
    { label: 'About SmartSnap', icon: 'information-circle-outline' as const, action: () => Alert.alert('SmartSnap', 'Capture. Create. Enhance. Share.\n\nMVP preview · Version 1.0.0') },
  ];
  return <SafeAreaView style={styles.safe} edges={['top']}><ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.eyebrow}>YOUR SPACE</Text><Text style={styles.title}>Profile</Text>
    <View style={styles.profileCard}><View style={styles.avatar}><Ionicons name="person" size={29} color="#171a13" /></View><View style={{ flex: 1 }}><Text style={styles.name}>Photo enthusiast</Text><Text style={styles.sub}>Your creative journey starts here</Text></View><Pressable onPress={() => Alert.alert('Profile', 'Account creation and cloud sync are not part of this offline MVP.')}><Ionicons name="create-outline" size={20} color={LIME} /></Pressable></View>
    <View style={styles.stats}><View style={styles.stat}><Text style={styles.statValue}>LOCAL</Text><Text style={styles.statLabel}>Photo storage</Text></View><View style={styles.divider} /><View style={styles.stat}><Text style={styles.statValue}>PRIVATE</Text><Text style={styles.statLabel}>By default</Text></View><View style={styles.divider} /><View style={styles.stat}><Text style={styles.statValue}>MVP</Text><Text style={styles.statLabel}>App edition</Text></View></View>
    <Text style={styles.section}>Settings</Text><View style={styles.menu}>{rows.map((row, i) => <Pressable key={row.label} style={[styles.menuRow, i === rows.length - 1 && { borderBottomWidth: 0 }]} onPress={row.action}><View style={styles.menuIcon}><Ionicons name={row.icon} size={19} color="#c6cbc1" /></View><Text style={styles.menuLabel}>{row.label}</Text><Ionicons name="chevron-forward" size={16} color="#70766e" /></Pressable>)}</View>
    <Text style={styles.footer}>SMARTSNAP · CAPTURE WHAT MOVES YOU</Text>
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#0d0e0e' }, content: { paddingHorizontal: 21, paddingTop: 16, paddingBottom: 30 }, eyebrow: { color: '#888d85', letterSpacing: 1.7, fontSize: 9, fontWeight: '700' }, title: { color: '#f4f4ed', fontSize: 30, fontWeight: '800', marginTop: 4 }, profileCard: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 16, borderRadius: 18, backgroundColor: '#171918', marginTop: 23 }, avatar: { width: 54, height: 54, borderRadius: 18, backgroundColor: LIME, alignItems: 'center', justifyContent: 'center' }, name: { color: '#f1f2eb', fontSize: 14, fontWeight: '700' }, sub: { color: '#888d85', fontSize: 10, marginTop: 5 }, stats: { flexDirection: 'row', backgroundColor: '#151716', borderRadius: 16, paddingVertical: 16, marginTop: 13, justifyContent: 'space-around', alignItems: 'center' }, stat: { alignItems: 'center', gap: 5 }, statValue: { color: LIME, fontWeight: '800', fontSize: 11, letterSpacing: 0.4 }, statLabel: { color: '#858a82', fontSize: 9 }, divider: { width: 1, height: 27, backgroundColor: '#2a2d2a' }, section: { color: '#f1f2eb', fontSize: 15, fontWeight: '700', marginTop: 29, marginBottom: 12 }, menu: { backgroundColor: '#151716', borderRadius: 17, paddingHorizontal: 13 }, menuRow: { minHeight: 56, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#242725', gap: 11 }, menuIcon: { width: 29, alignItems: 'center' }, menuLabel: { flex: 1, color: '#d7dad3', fontSize: 12, fontWeight: '500' }, footer: { textAlign: 'center', color: '#5e635c', fontSize: 8, letterSpacing: 1.5, marginTop: 30 } });
