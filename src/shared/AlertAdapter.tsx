import {MessageOptions, showMessage} from 'react-native-flash-message';
import React from 'react';
import { View } from "react-native";
import Svg, { Path } from 'react-native-svg';

const WIDTH = 35;
const SIZE = 25;

const success = 'M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z';
const error = 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 464c-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216zm94.8-285.3L281.5 256l69.3 69.3c4.7 4.7 4.7 12.3 0 17l-8.5 8.5c-4.7 4.7-12.3 4.7-17 0L256 281.5l-69.3 69.3c-4.7 4.7-12.3 4.7-17 0l-8.5-8.5c-4.7-4.7-4.7-12.3 0-17l69.3-69.3-69.3-69.3c-4.7-4.7-4.7-12.3 0-17l8.5-8.5c4.7-4.7 12.3-4.7 17 0l69.3 69.3 69.3-69.3c4.7-4.7 12.3-4.7 17 0l8.5 8.5c4.6 4.7 4.6 12.3 0 17z';
const info = 'M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-36 344h12V232h-12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h48c6.627 0 12 5.373 12 12v140h12c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12h-72c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12zm36-240c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z';
const warning = 'M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z';

const render =
  (icon: string, color: string): MessageOptions['renderFlashMessageIcon'] => () => {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: '100%',
          marginLeft: -5,
          width: WIDTH,
        }}>
        <Svg
          id="bottom-bar"
          x="0px"
          y="0px"
          width={SIZE}
          height={SIZE}
          preserveAspectRatio="none"
          viewBox="0 0 512 512">
          <Path
            fill={color}
            stroke={color}
            strokeWidth={2}
            d={icon}
          />
        </Svg>
      </View>
    );
  };

export class AlertAdapter {
  static success = (message?: string, title = 'Success'): void => {
    return showMessage({
      type: 'success',
      message: title,
      description: message || 'Mission Accomplished!',
      icon: {
        icon: 'success',
        position: 'left',
        props: {},
      },
      style: {
        borderColor: '#009688',
        borderLeftWidth: 5,
        backgroundColor: '#303030',
      },
      renderFlashMessageIcon: render(success, '#009688'),
    });
  };

  static error = (message?: string, title = 'Error'): void => {
    return showMessage({
      type: 'danger',
      message: title,
      description: message || 'An unknown error has occurred :(',
      icon: {
        icon: 'danger',
        position: 'left',
        props: {},
      },
      style: {
        borderColor: '#e57373',
        borderLeftWidth: 5,
        backgroundColor: '#303030',
      },
      renderFlashMessageIcon: render(error, '#e57373'),
    });
  };

  static info = (message?: string, title = 'Info'): void => {
    return showMessage({
      type: 'info',
      message: title,
      description: message || 'For your kind information!',
      icon: {
        icon: 'info',
        position: 'left',
        props: {},
      },
      style: {
        borderColor: '#4dd0e1',
        borderLeftWidth: 5,
        backgroundColor: '#303030',
      },
      renderFlashMessageIcon: render(info, '#4dd0e1'),
    });
  };

  static warn = (message?: string, title = 'Warn'): void => {
    return showMessage({
      type: 'warning',
      message: title,
      description: message || 'You have been warned!',
      icon: {
        icon: 'warning',
        position: 'left',
        props: {},
      },
      style: {
        borderColor: '#FFCA28',
        borderLeftWidth: 5,
        backgroundColor: '#303030',
      },
      renderFlashMessageIcon: render(warning, '#FFCA28'),
    });
  };
}
