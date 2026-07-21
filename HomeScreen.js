// HomeScreen.js
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import FeatureCards from "./FeatureCards";
import DomeBadge from "./DomeBadge";
import AlexBadge from "./AlexBadge";
import JessBadge from "./JessBadge";
import Hotspot from "./Hotspot";
import InfoCard from "./InfoCard";
import { DOME, FEATURES, FRIENDS, SNAP_MAP_INFO } from "./Locations";

export default function HomeScreen() {
  const [selected, setSelected] = useState(null);

  const openSnapchat = async () => {
    const snapchatUrl = "snapchat://";
    const fallbackUrl = "https://www.snapchat.com/";

    try {
      const supported = await Linking.canOpenURL(snapchatUrl);

      if (supported) {
        await Linking.openURL(snapchatUrl);
      } else {
        await Linking.openURL(fallbackUrl);
      }
    } catch (error) {
      console.error("Could not open Snapchat:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.heroText}>
          <Image
            source={require("./assets/snappedlogo.png")}
            style={styles.titleImage}
            resizeMode="contain"
            accessibilityLabel="Snapped at EDC"
          />

        
        </View>

        {/* Interactive map */}
        <View style={styles.mapSection}>
          <View style={styles.mapContainer}>
            <ImageBackground
              source={require("./assets/edc-map.png")}
              style={styles.map}
              imageStyle={styles.mapImage}
              resizeMode="cover"
            >
              {FRIENDS.filter(
                (friend) => !["alex", "jess"].includes(friend.id)
              ).map((friend) => (
                <Hotspot
                  key={friend.id}
                  location={friend}
                  isActive={selected?.id === "snap-map"}
                  onPress={() => setSelected(SNAP_MAP_INFO)}
                />
              ))}

              <AlexBadge
                location={FRIENDS.find((friend) => friend.id === "alex")}
                isActive={selected?.id === "snap-map"}
                onPress={() => setSelected(SNAP_MAP_INFO)}
              />

              <JessBadge
                location={FRIENDS.find((friend) => friend.id === "jess")}
                isActive={selected?.id === "snap-map"}
                onPress={() => setSelected(SNAP_MAP_INFO)}
              />

              <DomeBadge
                location={DOME}
                isActive={selected?.id === "dome"}
                onPress={setSelected}
              />
            </ImageBackground>
          </View>

          <Text style={styles.helperText}>
            Tap the map to find your crew, discover promoted places, retrace
            your footsteps, and get home safely.
          </Text>
        </View>

        {/* Additional features */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresLabel}>MORE ON SNAPCHAT</Text>

          <FeatureCards features={FEATURES} onSelect={setSelected} />
        </View>

        {/* Primary CTA */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={openSnapchat}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Open Snapchat"
          >
            <Text style={styles.primaryButtonText}>Open Snapchat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <InfoCard
        location={selected}
        onClose={() => setSelected(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  scrollContent: {
    paddingBottom: 24,
  },

  heroText: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
  },

titleImage: {
  width: 140,
  height: 65,
  alignSelf: "flex-start",
  marginLeft: -8,
},
headline: {
  color: "#313131",
  fontSize: 10,
  fontFamily: "Avenir Next",
  fontWeight: "600",
  marginTop: 4,
  textAlign: "center",
},

  subhead: {
    color: "#7e7979",
    fontSize: 14,
    fontFamily: "Avenir Next",
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 8,
  },

  mapSection: {
    paddingHorizontal: 16,
  },

  mapContainer: {
    width: "100%",
    aspectRatio: 1050 / 1061,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#868687",
  },

  map: {
    flex: 1,
  },

  mapImage: {
    borderRadius: 24,
  },

  helperText: {
    textAlign: "center",
    color: "#7e7979",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 10,
    paddingHorizontal: 12,
  },

  featuresSection: {
    marginTop: 24,
  },

  featuresLabel: {
    color: "#666666",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    paddingHorizontal: 24,
    marginBottom: 10,
  },

  ctaContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  primaryButton: {
    backgroundColor: "#FFFC00",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#111111",
    fontWeight: "900",
    fontSize: 16,
  },
});