import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";

export default function ActivationCamera() {
  const [isOpen, setIsOpen] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const openCamera = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();

      if (!result.granted) {
        return;
      }
    }

    setIsOpen(true);
  };

  return (
    <>
      {/* Replace this with your dome badge */}
      <Pressable onPress={openCamera} style={styles.domeButton}>
        <Text style={styles.buttonText}>Tap the dome</Text>
      </Pressable>

      <Modal
        visible={isOpen}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.cameraContainer}>
          <CameraView style={StyleSheet.absoluteFill} facing="back" />

          {/* Transparent activation overlay */}
          <Image
            source={require("./assets/lenspreview.png")}
            style={styles.activationOverlay}
            resizeMode="contain"
          />

          <View style={styles.header}>
            <Pressable
              onPress={() => setIsOpen(false)}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Close activation camera"
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>

            <Text style={styles.title}>
              Step inside Snapped @ EDC
            </Text>
          </View>

          <View style={styles.instructions}>
            <Text style={styles.instructionsText}>
              Move your camera around to preview the activation
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  domeButton: {
    backgroundColor: "#fffc00",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    alignSelf: "center",
  },
  buttonText: {
    fontWeight: "700",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  activationOverlay: {
    position: "absolute",
    width: "100%",
    height: "70%",
    alignSelf: "center",
    bottom: "8%",
  },
  header: {
    position: "absolute",
    top: 55,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    left: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    color: "#fff",
    fontSize: 32,
    lineHeight: 34,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowRadius: 8,
  },
  instructions: {
    position: "absolute",
    bottom: 35,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  instructionsText: {
    color: "#fff",
    fontWeight: "600",
  },
});