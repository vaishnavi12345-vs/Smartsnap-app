import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { SafeAreaView } from 'react-native-safe-area-context';

const LIME = '#d7fa75';
export default function GalleryScreen() {
  const router = useRouter();
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [permission, requestPermission] = MediaLibrary.usePermissions();
  const loadPhotos = useCallback(async () => {
    setLoading(true);
    try {
      let current = permission;
      if (!current?.granted) current = await requestPermission();
      if (!current.granted) { setAssets([]); return; }
      const result = await MediaLibrary.getAssetsAsync({ mediaType: 'photo', first: 100, sortBy: [MediaLibrary.SortBy.creationTime] });
      setAssets(result.assets);
    } catch { Alert.alert('Could not load photos', 'Please check photo library permissions in your device settings.'); }
    finally { setLoading(false); }
  }, [permission, requestPermission]);
  useFocusEffect(useCallback(() => { loadPhotos(); }, [loadPhotos]));
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}><View><Text style={styles.eyebrow}>YOUR COLLECTION</Text><Text style={styles.title}>Gallery</Text></View><Pressable onPress={() => router.push('/camera')} style={styles.addButton}><Ionicons name="camera" size={20} color="#151811" /></Pressable></View>
      <View style={styles.countRow}><Text style={styles.count}>{assets.length} photographs</Text><Ionicons name="options-outline" size={18} color="#93988f" /></View>
      {loading ? <ActivityIndicator color={LIME} style={{ marginTop: 50 }} /> : assets.length ? <FlatList data={assets} keyExtractor={(item) => item.id} numColumns={2} columnWrapperStyle={styles.row} contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false} renderItem={({ item }) => <Pressable style={styles.photoCard} onPress={() => router.push({ pathname: '/editor', params: { uri: item.uri } })}><Image source={{ uri: item.uri }} style={styles.photo} /><View style={styles.photoMeta}><Text style={styles.photoDate}>{item.creationTime ? new Date(item.creationTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Photo'}</Text><Ionicons name="arrow-up-right" size={15} color={LIME} /></View></Pressable>} /> : <View style={styles.empty}><View style={styles.emptyIcon}><Ionicons name={permission?.granted ? 'images-outline' : 'lock-closed-outline'} size={27} color={LIME} /></View><Text style={styles.emptyTitle}>{permission?.granted ? 'A fresh canvas' : 'Your photos, your choice'}</Text><Text style={styles.emptyText}>{permission?.granted ? 'Your device photos will appear here. Capture a new moment or import one to start editing.' : 'Allow photo access to browse and edit pictures from your library.'}</Text><Pressable style={styles.primary} onPress={permission?.granted ? () => router.push('/camera') : loadPhotos}><Text style={styles.primaryText}>{permission?.granted ? 'Open camera' : 'Allow photo access'}</Text></Pressable></View>}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#0d0e0e', paddingHorizontal: 20 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }, eyebrow: { color: '#888d85', letterSpacing: 1.7, fontSize: 9, fontWeight: '700' }, title: { color: '#f4f4ed', fontSize: 30, fontWeight: '800', marginTop: 4 }, addButton: { width: 43, height: 43, borderRadius: 15, backgroundColor: LIME, alignItems: 'center', justifyContent: 'center' }, countRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 22, marginBottom: 14 }, count: { color: '#969b92', fontSize: 12 }, grid: { paddingBottom: 30 }, row: { gap: 11, marginBottom: 11 }, photoCard: { width: '48.3%', backgroundColor: '#171918', borderRadius: 15, overflow: 'hidden' }, photo: { width: '100%', height: 174, backgroundColor: '#202320' }, photoMeta: { height: 36, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, photoDate: { color: '#c3c7be', fontSize: 10 }, empty: { alignItems: 'center', paddingHorizontal: 30, marginTop: 100 }, emptyIcon: { width: 66, height: 66, borderRadius: 23, backgroundColor: '#1a1e19', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }, emptyTitle: { color: '#f5f5ee', fontSize: 20, fontWeight: '700' }, emptyText: { color: '#969a92', lineHeight: 20, fontSize: 12, textAlign: 'center', marginTop: 8 }, primary: { marginTop: 20, paddingHorizontal: 20, paddingVertical: 13, borderRadius: 13, backgroundColor: LIME }, primaryText: { color: '#151811', fontWeight: '800', fontSize: 12 } });
