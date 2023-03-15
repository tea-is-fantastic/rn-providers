import {MessageOptions, showMessage} from 'react-native-flash-message';
import React from 'react';
import { View } from "react-native";
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';

const WIDTH = 35;
const SIZE = 25;

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
        <FontAwesome5Pro name={icon} size={SIZE} color={color} light />
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
      renderFlashMessageIcon: render('check-circle', '#009688'),
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
      renderFlashMessageIcon: render('times-circle', '#e57373'),
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
      renderFlashMessageIcon: render('info-circle', '#4dd0e1'),
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
      renderFlashMessageIcon: render('exclamation-circle', '#FFCA28'),
    });
  };
}
