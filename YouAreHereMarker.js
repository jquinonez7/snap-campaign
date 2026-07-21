// YouAreHereMarker.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function YouAreHereMarker({ x, y }) {
  return (
    <View style={[styles.wrapper, { left: `${x}%`, top: `${y}%` }]} pointerEvents="none">
      <View style={styles.dot} />
      <Text style={styles.label}>YOU</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    marginLeft: -18,
    marginTop: -8,
    width: 36,
    alignItems: "center",
    zIndex: 7,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#00D1FF",
    borderWidth: 2,
    borderColor: "#fff",
  },
  label: {
    marginTop: 2,
    fontSize: 8,
    fontWeight: "800",
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 4,
    borderRadius: 5,
    overflow: "hidden",
  },
});