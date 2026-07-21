// Hotspot.js
import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

// Bundled avatar images referenced by id in Locations.js (avatar: "image").
// Add more entries here if you wire up additional real photos/bitmojis.
const AVATAR_IMAGES = {
  "jade": require("./assets/bitmoji_jade.png"),
  "alex": require("./assets/whitehat.png"),
  "jess": require("./assets/pinkhatbitmoji.png"),
};

// Bounding box each free-shape avatar renders within (resizeMode="contain"
// keeps it undistorted regardless of the source image's exact proportions).
const FREE_BOX = {
  "will": { width: 64, height: 112 },
  "jess": { width: 64, height: 147 },
};

export default function Hotspot({ location, isActive, onPress }) {
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
      toValue: isActive ? 1.25 : 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  }, [isActive, scale]);

  const ringScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.2],
  });
  const ringOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0],
  });

  const avatarImage = AVATAR_IMAGES[location.id];
  const ringColor = location.color || "#FFFC00";
  const isFree = location.shape === "free";

  if (isFree) {
    const box = FREE_BOX[location.id] || { width: 64, height: 100 };
    const freeHeight = box.height;
    const freeWidth = box.width;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onPress(location)}
        style={[
          styles.freeWrapper,
          {
            left: `${location.x}%`,
            top: `${location.y}%`,
            width: freeWidth,
            marginLeft: -freeWidth / 2,
            marginTop: -freeHeight / 2,
          },
        ]}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Animated.View
          style={[
            styles.freeGlow,
            {
              backgroundColor: ringColor,
              opacity: ringOpacity,
              transform: [{ scale: ringScale }],
            },
          ]}
        />

        {avatarImage ? (
          <Animated.Image
            source={avatarImage}
            resizeMode="contain"
            style={[
              { width: freeWidth, height: freeHeight },
              { transform: [{ scale }] },
            ]}
          />
        ) : (
          <Text style={styles.icon}>{location.avatarEmoji || location.icon}</Text>
        )}

        {location.handle ? (
          <Text
            style={[styles.handle, { color: ringColor }]}
            numberOfLines={1}
          >
            {location.handle}
          </Text>
        ) : null}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(location)}
      style={[
        styles.wrapper,
        { left: `${location.x}%`, top: `${location.y}%` },
      ]}
      hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
    >
      <Animated.View
        style={[
          styles.ring,
          {
            backgroundColor: ringColor,
            opacity: ringOpacity,
            transform: [{ scale: ringScale }],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.dot,
          {
            borderColor: ringColor,
            transform: [{ scale }],
          },
        ]}
      >
        {avatarImage ? (
          <Image source={avatarImage} style={styles.avatarImage} />
        ) : (
          <Text style={styles.icon}>{location.avatarEmoji || location.icon}</Text>
        )}
      </Animated.View>

      {location.handle ? (
        <Text
          style={[styles.handle, { color: ringColor }]}
          numberOfLines={1}
        >
          {location.handle}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const DOT_SIZE = 40;
const WRAPPER_WIDTH = 84;
const FREE_WIDTH = 64;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: WRAPPER_WIDTH,
    marginLeft: -WRAPPER_WIDTH / 2,
    marginTop: -DOT_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  ring: {
    position: "absolute",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.5,
    backgroundColor: "#111",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  avatarImage: {
    width: DOT_SIZE,
    height: DOT_SIZE,
  },
  icon: {
    fontSize: 18,
  },
  handle: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: "800",
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 7,
    overflow: "hidden",
    textAlign: "center",
  },
  freeWrapper: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 10,
  },
  freeGlow: {
    position: "absolute",
    width: FREE_WIDTH * 0.75,
    height: FREE_WIDTH * 0.75,
    borderRadius: (FREE_WIDTH * 0.75) / 2,
    bottom: 10,
  },
});