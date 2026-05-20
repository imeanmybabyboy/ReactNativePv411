import { Animated, Pressable, ScrollView, Text, View } from 'react-native';
import AnimStyle from './ui/AnimStyle';
import { useRef } from 'react';

let animValue = new Animated.Value(1);

export default function Anim() {
  const fadePressed = () => {
    Animated.timing(animValue, {
      toValue: 0.1,
      useNativeDriver: true,
      duration: 1000,
    }).start();
  };

  const blinkValue = useRef(new Animated.Value(1)).current;
  const blinkPressed = () => {
    Animated.sequence([
      Animated.timing(blinkValue, {
        toValue: 0.1,
        useNativeDriver: true,
        duration: 500,
      }),
      Animated.timing(blinkValue, {
        toValue: 0.5,
        useNativeDriver: true,
        duration: 500,
      }),
    ]).start();
  };

  const swingValue = useRef(new Animated.Value(0)).current;
  const swingPressed = () => {
    Animated.sequence([
      Animated.timing(swingValue, {
        toValue: 90,
        useNativeDriver: true,
        duration: 250,
      }),
      Animated.timing(swingValue, {
        toValue: -90,
        useNativeDriver: true,
        duration: 500,
      }),
      Animated.timing(swingValue, {
        toValue: 0,
        useNativeDriver: true,
        duration: 250,
      }),
    ]).start();
  };

  const transValue = useRef(new Animated.Value(1)).current;
  const transPressed = () => {
    Animated.sequence([
      Animated.timing(transValue, {
        toValue: 50,
        useNativeDriver: true,
        duration: 250,
      }),
      Animated.timing(transValue, {
        toValue: -50,
        useNativeDriver: true,
        duration: 500,
      }),
      Animated.timing(transValue, {
        toValue: 0,
        useNativeDriver: true,
        duration: 250,
      }),
    ]).start();
  };

  const scaleValue = useRef(new Animated.Value(1)).current;
  const scalePressed = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.25,
        useNativeDriver: true,
        duration: 250,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        duration: 250,
      }),
    ]).start();
  };

  const combo1Value = useRef(new Animated.Value(1)).current;
  const combo2Value = useRef(new Animated.Value(0)).current;
  const comboPressed = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(combo1Value, {
          toValue: 1.25,
          useNativeDriver: true,
          duration: 250,
        }),
        Animated.timing(combo1Value, {
          toValue: 1,
          useNativeDriver: true,
          duration: 250,
        }),
      ]),
      Animated.sequence([
        Animated.timing(combo2Value, {
          toValue: -50,
          useNativeDriver: true,
          duration: 250,
        }),
        Animated.timing(combo2Value, {
          toValue: 0,
          useNativeDriver: true,
          duration: 250,
          delay: 0.0,
        }),
      ]),
    ]).start();
  };

  return (
    <ScrollView>
      <View style={AnimStyle.container}>
        <Pressable onPress={fadePressed}>
          <Animated.View style={[AnimStyle.block, { opacity: animValue }]}>
            <View style={AnimStyle.square}></View>
            <Text style={AnimStyle.title}>Fade Out</Text>
          </Animated.View>
        </Pressable>

        <Pressable onPress={blinkPressed}>
          <Animated.View style={[AnimStyle.block, { opacity: blinkValue }]}>
            <View style={AnimStyle.square}></View>
            <Text style={AnimStyle.title}>Blink</Text>
          </Animated.View>
        </Pressable>

        <Pressable onPress={swingPressed}>
          <Animated.View
            style={[
              AnimStyle.block,
              {
                transform: [
                  {
                    rotate: swingValue.interpolate({
                      inputRange: [-90, 90],
                      outputRange: ['-90deg', '90deg'],
                    }),
                  },
                  {
                    translateX: swingValue.interpolate({
                      inputRange: [-90, 90],
                      outputRange: [50, -50],
                    }),
                  },
                  {
                    translateY: swingValue.interpolate({
                      inputRange: [-90, 0, 90],
                      outputRange: [50, 0, 50],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={AnimStyle.square}></View>
            <Text style={AnimStyle.title}>Swing (bell)</Text>
          </Animated.View>
        </Pressable>

        <Pressable onPress={transPressed}>
          <Animated.View
            style={[
              AnimStyle.block,
              {
                transform: [{ translateX: transValue }],
              },
            ]}
          >
            <View style={AnimStyle.square}></View>
            <Text style={AnimStyle.title}>Swing (trans)</Text>
          </Animated.View>
        </Pressable>

        <Pressable onPress={scalePressed}>
          <Animated.View
            style={[
              AnimStyle.block,
              {
                transform: [{ scale: scaleValue }],
              },
            ]}
          >
            <View style={AnimStyle.square}></View>
            <Text style={AnimStyle.title}>Pulse (scale)</Text>
          </Animated.View>
        </Pressable>

        <Pressable onPress={comboPressed}>
          <Animated.View
            style={[
              AnimStyle.block,
              {
                transform: [
                  { scale: combo1Value },
                  { translateX: combo2Value },
                ],
              },
            ]}
          >
            <View style={AnimStyle.square}></View>
            <Text style={AnimStyle.title}>Perspective</Text>
          </Animated.View>
        </Pressable>
      </View>
    </ScrollView>
  );
}
