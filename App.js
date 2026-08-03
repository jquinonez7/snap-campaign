// App.js
import React from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import HomeScreen from "./HomeScreen";

export default function App() {
  const appContent = (
    <SafeAreaView style={styles.app}>
      <HomeScreen />
    </SafeAreaView>
  );

  // Only add the phone frame on the website
  if (Platform.OS === "web") {
    return (
      <View style={styles.desktopBackground}>
        <View style={styles.phoneFrame}>{appContent}</View>
      </View>
    );
  }

  return appContent;
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000",
  },

  desktopBackground: {
    flex: 1,
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#181818",
    padding: 20,
  },

  phoneFrame: {
    width: "100%",
    maxWidth: 390,
    height: 844,
    maxHeight: "calc(100vh - 40px)",
    backgroundColor: "#000",
    overflow: "hidden",
    borderRadius: 36,

    // These are for the web preview
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.55)",
  },
});
