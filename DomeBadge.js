// DomeBadge.js
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DOME_IMAGE = require("./assets/dome2.png");

// The static preview shown when the dome is tapped — a mockup of what the
// real AR lens/activation looks like. Not a live camera, just an image.
const DOME_PREVIEW_IMAGE = require("./assets/lenspreview.png");

const WIDTH = 180;
const HEIGHT = WIDTH * 0.75;

export default function DomeBadge({ location }) {
  const pulse = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1700,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const glowScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.22] });
  const glowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0] });

  const handlePressIn = () => {
    Animated.spring(pressScale, { toValue: 0.92, useNativeDriver: true, friction: 6 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(pressScale, { toValue: 1, useNativeDriver: true, friction: 6 }).start();
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => setIsPreviewOpen(true)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.wrapper, { left: `${location.x}%`, top: `${location.y}%` }]}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityRole="button"
        accessibilityLabel="Snapchat Dome"
        accessibilityHint="Opens a preview of the EDC Lens activation"
      >
        <Animated.View
          style={[
            styles.glow,
            { opacity: glowOpacity, transform: [{ scale: glowScale }] },
          ]}
        />

        <Animated.Image
          source={DOME_IMAGE}
          style={[styles.dome, { transform: [{ scale: pressScale }] }]}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Modal
        visible={isPreviewOpen}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setIsPreviewOpen(false)}
      >
        <View style={styles.previewContainer}>
          <Image
            source={DOME_PREVIEW_IMAGE}
            style={styles.previewImage}
            resizeMode="cover"
          />

          <TouchableOpacity
            onPress={() => setIsPreviewOpen(false)}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Close preview"
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: WIDTH + 20,
    marginLeft: -(WIDTH + 20) / 2,
    marginTop: -HEIGHT / 2,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 10,
  },
  glow: {
    position: "absolute",
    top: HEIGHT * 0.15,
    width: WIDTH * 0.55,
    height: WIDTH * 0.55,
    borderRadius: (WIDTH * 0.55) / 2,
    backgroundColor: "#FFFC00",
  },
  dome: {
    width: WIDTH,
    height: HEIGHT,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  previewImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 55,
    left: 20,
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
});