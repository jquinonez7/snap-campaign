// components/InfoCard.js
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Linking,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height: SCREEN_H } = Dimensions.get("window");

export default function InfoCard({ location, onClose }) {
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (location) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 60,
      }).start();
    }
  }, [location, translateY]);

  const closeCard = () => {
    Animated.timing(translateY, {
      toValue: 300,
      duration: 180,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 6,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 80) {
          closeCard();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!location) return null;

  const handleOpenSnap = async () => {
    try {
      const supported = await Linking.canOpenURL(location.deepLink);
      if (supported) {
        await Linking.openURL(location.deepLink);
      } else {
        // Fallback if Snapchat isn't installed or the scheme isn't registered
        await Linking.openURL("https://www.snapchat.com/");
      }
    } catch (e) {
      await Linking.openURL("https://www.snapchat.com/");
    }
  };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {/* dim backdrop */}
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={closeCard}
      />

      <Animated.View
        style={[styles.card, { transform: [{ translateY }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.grabber} />

        <View style={styles.headerRow}>
          <View
            style={[styles.tagPill, { backgroundColor: location.color }]}
          >
            <Text style={styles.tagText}>{location.tag}</Text>
          </View>
          <TouchableOpacity onPress={closeCard} hitSlop={10}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.locationName}>
          {location.icon} {location.name}
        </Text>
        <Text style={styles.featureName}>{location.feature}</Text>

        <Text style={styles.description}>{location.description}</Text>

        <TouchableOpacity
          style={[styles.ctaButton, { backgroundColor: location.color }]}
          onPress={handleOpenSnap}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>{location.cta} →</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  card: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#111114",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 36,
    maxHeight: SCREEN_H * 0.5,
  },
  grabber: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#444",
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111",
  },
  closeText: {
    color: "#999",
    fontSize: 16,
  },
  locationName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 14,
  },
  featureName: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
    marginBottom: 12,
  },
  description: {
    color: "#ddd",
    fontSize: 15,
    lineHeight: 21,
  },
  ctaButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
  },
  ctaText: {
    color: "#111",
    fontWeight: "800",
    fontSize: 15,
  },
});