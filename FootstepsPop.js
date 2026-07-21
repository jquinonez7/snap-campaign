// FootstepsPop.js
import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet } from "react-native";

const FOOTSTEPS_IMAGE = require("./assets/footsteps.png");
const WIDTH = 90;
const HEIGHT = WIDTH * (916 / 2519); // matches footsteps.png's real proportions

export default function FootstepsPop({ target }) {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!target) return;
    scale.setValue(0.4);
    opacity.setValue(0);
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [target?.x, target?.y, scale, opacity]);

  if (!target) return null;

  return (
    <Animated.Image
      source={FOOTSTEPS_IMAGE}
      resizeMode="contain"
      pointerEvents="none"
      style={[
        styles.footsteps,
        {
          left: `${target.x}%`,
          top: `${target.y}%`,
          opacity,
          transform: [{ scale }],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  footsteps: {
    position: "absolute",
    width: WIDTH,
    height: HEIGHT,
    marginLeft: -WIDTH / 2,
    marginTop: -HEIGHT - 26, // sits just above the badge, not on top of it
    zIndex: 6,
  },
});