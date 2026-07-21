// AlexBadge.js
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";

// Drop a real bitmoji at assets/alexbitmoji.png and this will pick it up
// automatically. Until then, it falls back to the emoji below.
let ALEX_IMAGE;
try {
  ALEX_IMAGE = require("./assets/whitehat.png");
} catch (e) {
  ALEX_IMAGE = null;
}

const WIDTH = 64;
const HEIGHT = 100;

export default function AlexBadge({ location, isActive, onPress }) {
  const pulse = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1400,
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

  useEffect(() => {
    Animated.spring(scale, {
      toValue: isActive ? 1.15 : 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  }, [isActive, scale]);

  const glowScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.5] });
  const glowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] });

  // Separate colors: glow stays this green no matter what, handle text stays
  // dark so it reads clearly against the now-solid-white handle background.
  const glowColor = "#C6FF3D";
  const textColor = "#111111";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(location)}
      style={[
        styles.wrapper,
        { left: `${location.x}%`, top: `${location.y}%` },
      ]}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      <Animated.View
        style={[
          styles.glow,
          {
            backgroundColor: glowColor,
            opacity: glowOpacity,
            transform: [{ scale: glowScale }],
          },
        ]}
      />

      {ALEX_IMAGE ? (
        <Animated.Image
          source={ALEX_IMAGE}
          resizeMode="contain"
          style={[styles.image, { transform: [{ scale }] }]}
        />
      ) : (
        <Animated.Text
          style={[styles.icon, { transform: [{ scale }] }]}
        >
          {location.avatarEmoji || "🧑"}
        </Animated.Text>
      )}

      {location.handle ? (
        <Text style={[styles.handle, { color: textColor }]} numberOfLines={1}>
          {location.handle}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: WIDTH,
    height: HEIGHT,
    marginLeft: -WIDTH / 2,
    marginTop: -HEIGHT / 2,
    alignItems: "center",
    zIndex: 10,
  },
  glow: {
    position: "absolute",
    width: WIDTH * 0.75,
    height: WIDTH * 0.75,
    borderRadius: (WIDTH * 0.75) / 2,
    bottom: 18,
  },
  image: {
    width: WIDTH,
    height: HEIGHT,
  },
  icon: {
    fontSize: 40,
  },
  handle: {
    position: "absolute",
    bottom: -20,
    fontSize: 10,
    fontWeight: "800",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 7,
    overflow: "hidden",
    textAlign: "center",
  },
});