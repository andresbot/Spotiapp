import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { Colors } from "../../theme/tokens";

export default function AmbientBackdrop() {
  const drift = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const driftLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(drift, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: true,
        }),
      ]),
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 6000,
          useNativeDriver: true,
        }),
      ]),
    );

    driftLoop.start();
    pulseLoop.start();

    return () => {
      driftLoop.stop();
      pulseLoop.stop();
    };
  }, [drift, pulse]);

  const topOrbStyle = {
    transform: [
      {
        translateX: drift.interpolate({
          inputRange: [0, 1],
          outputRange: [-18, 24],
        }),
      },
      {
        translateY: pulse.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        }),
      },
      {
        scale: pulse.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.12],
        }),
      },
    ],
  };

  const midOrbStyle = {
    transform: [
      {
        translateX: drift.interpolate({
          inputRange: [0, 1],
          outputRange: [12, -20],
        }),
      },
      {
        translateY: drift.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 22],
        }),
      },
    ],
  };

  const lowOrbStyle = {
    transform: [
      {
        translateX: pulse.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 18],
        }),
      },
      {
        translateY: pulse.interpolate({
          inputRange: [0, 1],
          outputRange: [12, -12],
        }),
      },
    ],
  };

  return (
    <View pointerEvents="none" style={styles.container}>
      <Animated.View style={[styles.orb, styles.orbTop, topOrbStyle]} />
      <Animated.View style={[styles.orb, styles.orbMid, midOrbStyle]} />
      <Animated.View style={[styles.orb, styles.orbLow, lowOrbStyle]} />
      <View style={styles.mesh} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  orb: {
    position: "absolute",
    borderRadius: 999,
  },
  orbTop: {
    width: 240,
    height: 240,
    top: -50,
    right: -70,
    backgroundColor: `${Colors.green}22`,
  },
  orbMid: {
    width: 220,
    height: 220,
    top: "28%",
    left: -120,
    backgroundColor: `${Colors.sun}1E`,
  },
  orbLow: {
    width: 200,
    height: 200,
    bottom: -70,
    right: -60,
    backgroundColor: `${Colors.cyan}18`,
  },
  mesh: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.015)",
  },
});
