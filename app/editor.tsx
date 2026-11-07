import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

const LIME = '#d7fa75';
type EditAction = 'rotate' | 'flip';
export default function EditorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ uri?: string }>();
  const source = Array.isArray(params.uri) ? params.uri[0] : params.uri;
  const [actions, setActions] = useState<EditAction[]>([]);
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState('Adjust');
  const preview = useMemo(() => {
    let style: Record<string, unknown> = {};
    if (actions.includes('rotate')) style.transform = [{ rotate: '90deg' }];
    if (actions.includes('flip')) style.transform = [...(Array.isArray(style.transform) ? style.transform : []), { scaleX: -1 }];
    return style;
  }, [actions]);
  const toggle = (action: EditAction) => setActions((current) => current.includes(action) ? current.filter((item) => item !== action) : [...current, action]);
  const processImage = async () => {
    if (!source) return null;
    const ops: ImageManipulator.Action[] = [];
    actions.forEach((action) => { if (action === 'rotate') ops.push({ rotate: 90 }); else ops.push({ flip: ImageManipulator.FlipType.Horizontal }); });
    const context = ImageManipulator.ImageManipulator.manipulate(source);
    ops.forEach((op) => { if ('rotate' in op) context.rotate(op.rotate); else if ('flip' in op) context.flip(op.flip); });
    const rendered = await context.renderAsync();
    return rendered.saveAsync({ compress: 1, format: ImageManipulator.SaveFormat.JPEG });
  };
  const save = async () => {
    setBusy(true);
    try {
      const result = await processImage();
      if (!result) return;
      const permission = await MediaLibrary.requestPermissionsAsync(true);
      if (!permission.granted) { Alert.alert('Permission needed', 'Allow SmartSnap to save the edited photo to your library.'); return; }
      await MediaLibrary.saveToLibraryAsync(result.uri);
      Alert.alert('Saved!', 'Your edited photo has been saved to your photo library.', [{ text: 'Done', onPress: () => router.back() }]);
    } catch { Alert.alert('Could not save photo', 'Please try again, or check your available storage.'); }
    finally { setBusy(false); }
  };
  const share = async () => {
    setBusy(true);
    try {
      const result = await processImage();
      if (!result) return;
      if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(result.uri, { mimeType: 'image/jpeg', dialogTitle: 'Share your SmartSnap photo' });
      else await Share.share({ url: result.uri });
    } catch { Alert.alert('Could not share photo', 'Please try again.'); }
    finally { setBusy(false); }
  };
  if (!source) return <SafeAreaView style={styles.safe}><View style={styles.missing}><Text style={styles.missingText}>No photo was selected.</Text><Pressable onPress={() => router.back()}><Text style={{ color: LIME, marginTop: 14 }}>Go back</Text></Pressable></View></SafeAreaView>;
  return <SafeAreaView style={styles.safe} edges={['top']}><View style={styles.header}><Pressable style={styles.headerButton} onPress={() => router.back()}><Ionicons name="close" size={23} color="#f2f3ed" /></Pressable><View style={{ alignItems: 'center' }}><Text style={styles.headerTitle}>Photo editor</Text><Text style={styles.headerSub}>A few thoughtful touches</Text></View><Pressable style={styles.doneButton} onPress={save} disabled={busy}><Text style={styles.doneText}>{busy ? 'Saving…' : 'Save'}</Text></Pressable></View>
    <View style={styles.canvas}><Image source={{ uri: source }} style={[styles.image, preview as never]} resizeMode="contain" /><View style={styles.imageBadge}><Ionicons name="lock-closed" size={11} color={LIME} /><Text style={styles.badgeText}>EDITED ON YOUR DEVICE</Text></View></View>
    <View style={styles.actionBar}><Pressable style={[styles.actionButton, actions.includes('rotate') && styles.selected]} onPress={() => toggle('rotate')}><Ionicons name="refresh-outline" size={20} color={actions.includes('rotate') ? '#151811' : '#d4d7cf'} /><Text style={[styles.actionText, actions.includes('rotate') && styles.selectedText]}>Rotate</Text></Pressable><Pressable style={[styles.actionButton, actions.includes('flip') && styles.selected]} onPress={() => toggle('flip')}><Ionicons name="swap-horizontal-outline" size={20} color={actions.includes('flip') ? '#151811' : '#d4d7cf'} /><Text style={[styles.actionText, actions.includes('flip') && styles.selectedText]}>Flip</Text></Pressable><Pressable style={styles.actionButton} onPress={() => setActions([])}><Ionicons name="arrow-undo-outline" size={20} color="#d4d7cf" /><Text style={styles.actionText}>Reset</Text></Pressable><Pressable style={styles.actionButton} onPress={share} disabled={busy}><Ionicons name="share-social-outline" size={20} color="#d4d7cf" /><Text style={styles.actionText}>Share</Text></Pressable></View>
    <View style={styles.bottom}><View style={styles.tabs}>{['Adjust', 'Filters', 'Crop'].map((tab) => <Pressable key={tab} onPress={() => setActive(tab)} style={styles.tab}><Text style={[styles.tabText, active === tab && styles.tabActive]}>{tab}</Text>{active === tab && <View style={styles.underline} />}</Pressable>)}</View>
      {active === 'Adjust' ? <View style={styles.info}><Ionicons name="sparkles-outline" size={18} color={LIME} /><Text style={styles.infoText}>Your original stays untouched. Rotate and flip are applied when you save.</Text></View> : active === 'Filters' ? <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterList}>{['Original', 'Natural', 'Soft', 'Warm', 'Moody'].map((filter, index) => <Pressable key={filter} onPress={() => index === 0 ? setActive('Adjust') : Alert.alert('Coming soon', 'Filter processing will be added in a future SmartSnap update.')} style={styles.filter}><View style={[styles.filterSwatch, { backgroundColor: ['#343a34', '#9caa85', '#c4b8aa', '#bb8d63', '#414d53'][index] }]}><Ionicons name={index === 0 ? 'image-outline' : 'sparkles-outline'} size={18} color="white" /></View><Text style={styles.filterText}>{filter}</Text></Pressable>)}</ScrollView> : <View style={styles.info}><Ionicons name="crop-outline" size={18} color={LIME} /><Text style={styles.infoText}>Crop tools are coming soon. Use rotate and flip to adjust the composition in this MVP.</Text></View>}
    </View>
  </SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#0d0e0e' }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, height: 58 }, headerButton: { width: 42, height: 42, justifyContent: 'center' }, headerTitle: { color: '#f3f4ed', fontWeight: '700', fontSize: 14 }, headerSub: { color: '#777d75', fontSize: 9, marginTop: 3 }, doneButton: { minWidth: 57, backgroundColor: LIME, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 10, alignItems: 'center' }, doneText: { color: '#151811', fontWeight: '800', fontSize: 11 }, canvas: { flex: 1, marginHorizontal: 15, marginTop: 7, marginBottom: 13, borderRadius: 18, backgroundColor: '#171918', overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }, image: { width: '100%', height: '100%' }, imageBadge: { position: 'absolute', bottom: 12, left: 12, flexDirection: 'row', gap: 6, alignItems: 'center', backgroundColor: 'rgba(0,0,0,.6)', paddingHorizontal: 9, paddingVertical: 7, borderRadius: 10 }, badgeText: { color: '#e4e8db', fontSize: 8, fontWeight: '800', letterSpacing: 0.8 }, actionBar: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 8, marginHorizontal: 15, backgroundColor: '#171918', borderRadius: 16 }, actionButton: { alignItems: 'center', justifyContent: 'center', gap: 5, minWidth: 62, paddingVertical: 8, borderRadius: 10 }, actionText: { color: '#aeb3aa', fontSize: 9, fontWeight: '600' }, selected: { backgroundColor: LIME }, selectedText: { color: '#151811' }, bottom: { minHeight: 145, paddingTop: 16 }, tabs: { flexDirection: 'row', justifyContent: 'center', gap: 43 }, tab: { alignItems: 'center', gap: 6 }, tabText: { color: '#777d75', fontSize: 12, fontWeight: '600' }, tabActive: { color: '#f1f2eb' }, underline: { width: 18, height: 2, backgroundColor: LIME, borderRadius: 2 }, info: { flexDirection: 'row', gap: 10, alignItems: 'center', marginHorizontal: 22, marginTop: 17, padding: 12, backgroundColor: '#171a16', borderRadius: 13 }, infoText: { color: '#abb0a6', fontSize: 10, lineHeight: 15, flex: 1 }, filterList: { gap: 13, paddingHorizontal: 22, paddingTop: 12 }, filter: { alignItems: 'center', gap: 7 }, filterSwatch: { width: 45, height: 45, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }, filterText: { color: '#c3c7bd', fontSize: 9 }, missing: { flex: 1, justifyContent: 'center', alignItems: 'center' }, missingText: { color: 'white', fontSize: 16 } });
