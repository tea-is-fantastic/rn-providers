import { Animated, Dimensions, Platform, StyleSheet, View } from 'react-native';
import React, { ComponentProps, useState } from 'react';

import {
  CodeField,
  Cursor,
  RenderCellOptions,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AnimatedValue = Animated.AnimatedValue;

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;

const size = (Dimensions.get('window').width - 96) / CELL_COUNT;

const CELL_SIZE = size;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = '#fff';
const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const animationsColor: AnimatedValue[] = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale: AnimatedValue[] = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ index, isFocused }: { hasValue: boolean; index: number; isFocused: boolean }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index] || new Value(0), {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
  ]).start();
};

export const OtpFourInput = () => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({ index, symbol, isFocused }: RenderCellOptions) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle: ComponentProps<typeof AnimatedText>["style"] = {
      backgroundColor: hasValue
        ? (animationsScale[index] || new Value(1)).interpolate({
          inputRange: [0, 1],
          outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        })
        : (animationsScale[index] || new Value(0)).interpolate({
          inputRange: [0, 1],
          outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        }),
      borderRadius: (animationsScale[index] || new Value(1)).interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: (animationsScale[index] || new Value(1)).interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <View style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        autoFocus
        keyboardType='number-pad'
        autoComplete='sms-otp'
        textContentType='oneTimeCode'
        renderCell={renderCell}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    // marginTop: 30,
    // paddingHorizontal: 10,
    aspectRatio: 4,
    justifyContent: 'center',
  },
  cell: {
    margin: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: 120 / CELL_COUNT,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#3759b8',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

  root: {
    padding: 20,
  },
  title: {
    paddingTop: 50,
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 40,
  },
  subTitle: {
    paddingTop: 30,
    color: '#000',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: '#3557b7',
    justifyContent: 'center',
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
});
