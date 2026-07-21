// FeatureCards.js
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FeatureCards({ features, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {features.map((f) => (
        <TouchableOpacity
          key={f.id}
          style={[
            styles.card,
            { borderColor: f.color, backgroundColor: f.color + "26" },
          ]}
          activeOpacity={0.7}
          onPress={() => onSelect(f)}
          accessibilityRole="button"
          accessibilityLabel={`${f.name}, ${f.tag}`}
          accessibilityHint={f.description}
        >
          <View style={[styles.iconWrap, { backgroundColor: f.color }]}>
            <Text style={styles.icon}>{f.icon}</Text>
          </View>
          <Text style={styles.title}>{f.name}</Text>
          <Text style={styles.tag}>{f.tag}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const CARD_WIDTH = 132;

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 24,
    gap: 12,
    paddingVertical: 4,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 14,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  icon: {
    fontSize: 18,
  },
  title: {
    color: "#000000",
    fontWeight: "800",
    fontSize: 14,
    marginBottom: 3,
  },
  tag: {
    color: "#6c6262",
    fontSize: 11,
    fontWeight: "600",
  },
});