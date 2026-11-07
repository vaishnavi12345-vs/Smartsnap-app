import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions, type CameraType, type FlashMode } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const LIME = '#d7fa75';
export default function CameraScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [type, setType] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [ready, setReady] = useState(false);
  const camera = useRef<CameraView>(null);
  const takePhoto = async () => {
    if (!camera.current || !ready) return;
    try {
      const photo = await camera.current.takePictureAsync({ quality: 1, exif: true });
      if (photo?.uri) router.replace({ pathname: '/editor', params: { uri: photo.uri } });
    } catch { Alert.alert('Could not take photo', 'Please try again.'); }
  };
  const chooseFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 1 });
    if (!result.canceled && result.assets[0]) router.replace({ pathname: '/editor', params: { uri: result.assets[0].uri } });
  };
  if (!permission) return <View style={styles.permission}><Text style={styles.permissionText}>Checking camera access…</Text></View>;
  if (!permission.granted) return <SafeAreaView style={styles.permission}><Pressable style={styles.closePermission} onPress={() => router.back()}><Ionicons name="close" size={24} color="white" /></Pressable><Ionicons name="camera-outline" size={48} color={LIME} /><Text style={styles.permissionTitle}>A camera, in your pocket.</Text><Text style={styles.permissionText}>Allow camera access to capture photographs in SmartSnap.</Text><Pressable style={styles.allowButton} onPress={requestPermission}><Text style={styles.allowText}>Allow camera</Text></Pressable></SafeAreaView>;
  return <View style={styles.screen}><CameraView ref={camera} style={StyleSheet.absoluteFill} facing={type} flash={flash} onCameraReady={() => setReady(true)}><SafeAreaView style={styles.overlay}>
    <View style={styles.top}><Pressable style={styles.roundButton} onPress={() => router.back()}><Ionicons name="close" size={23} color="white" /></Pressable><Text style={styles.cameraLabel}>SMARTSNAP CAMERA</Text><Pressable style={styles.roundButton} onPress={() => setFlash(flash === 'off' ? 'on' : 'off')}><Ionicons name={flash === 'off' ? 'flash-off' : 'flash'} size={20} color={flash === 'off' ? 'white' : LIME} /></Pressable></View>
    <View style={styles.grid}><View style={styles.gridV} /><View style={styles.gridH} /></View>
    <View style={styles.controls}><Pressable style={styles.libraryButton} onPress={chooseFromLibrary}><Ionicons name="images-outline" size={24} color="white" /></Pressable><Pressable onPress={takePhoto} disabled={!ready} style={[styles.shutter, !ready && { opacity: 0.55 }]}><View style={styles.shutterInner} /></Pressable><Pressable style={styles.flipButton} onPress={() => setType(type === 'back' ? 'front' : 'back')}><Ionicons name="camera-reverse-outline" size={25} color="white" /></Pressable></View>
  </SafeAreaView></CameraView></View>;
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#000' }, overlay: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 24 }, top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }, cameraLabel: { color: 'white', fontSize: 10, letterSpacing: 2, fontWeight: '800' }, roundButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(0,0,0,.4)', alignItems: 'center', justifyContent: 'center' }, grid: { position: 'absolute', top: '25%', bottom: '25%', left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-evenly' }, gridV: { height: '100%', borderLeftWidth: 1, borderColor: 'rgba(255,255,255,.25)' }, gridH: { position: 'absolute', top: '50%', left: 0, right: 0, borderTopWidth: 1, borderColor: 'rgba(255,255,255,.25)' }, controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 25 }, libraryButton: { width: 50, height: 50, borderRadius: 15, backgroundColor: 'rgba(0,0,0,.42)', alignItems: 'center', justifyContent: 'center' }, flipButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(0,0,0,.42)', alignItems: 'center', justifyContent: 'center' }, shutter: { width: 76, height: 76, borderRadius: 40, borderWidth: 4, borderColor: 'white', alignItems: 'center', justifyContent: 'center' }, shutterInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'white' }, permission: { flex: 1, backgroundColor: '#0d0e0e', justifyContent: 'center', alignItems: 'center', padding: 35 }, closePermission: { position: 'absolute', top: 60, right: 22 }, permissionTitle: { color: 'white', fontSize: 21, fontWeight: '700', marginTop: 22 }, permissionText: { color: '#9da198', fontSize: 13, textAlign: 'center', lineHeight: 20, marginTop: 9 }, allowButton: { backgroundColor: LIME, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 14, marginTop: 23 }, allowText: { color: '#151811', fontWeight: '800' } });
