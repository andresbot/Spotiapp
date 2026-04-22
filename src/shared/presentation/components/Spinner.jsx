import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { Colors } from "../../theme/tokens";

export default function Spinner({ padding = 40 }) {
  const bars = [
    useRef(new Animated.Value(0.5)).current,
    useRef(new Animated.Value(0.8)).current,
    useRef(new Animated.Value(0.6)).current,
  ];

  useEffect(() => {
    const animations = bars.map((bar, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 120),
          Animated.timing(bar, {
            toValue: 1,
            duration: 380,
            useNativeDriver: true,
          }),
          Animated.timing(bar, {
            toValue: 0.4,
            duration: 380,
            useNativeDriver: true,
          }),
        ]),
      ),
    );

    animations.forEach((animation) => animation.start());

    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, [bars]);

  return (
    <View style={[styles.container, { paddingVertical: padding }]}>
      <View style={styles.equalizer}>
        {bars.map((bar, index) => (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              {
                transform: [{ scaleY: bar }],
                backgroundColor: index === 1 ? Colors.sun : Colors.green,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  equalizer: {
    height: 34,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  bar: {
    width: 8,
    height: 34,
    borderRadius: 999,
  },
});
