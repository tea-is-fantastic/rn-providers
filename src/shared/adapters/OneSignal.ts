import OneSignal from 'react-native-onesignal';
import type { NavigationProp } from '@react-navigation/native';

export const setupOneSignal = (navigation: NavigationProp<any>) => {
  try {
    // Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
        navigation.navigate('OneSignalScreen', { screen: 'AboutScreen' });
      },
    );

    // Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler((notification) => {
      navigation.navigate('OneSignalScreen', { screen: 'FAQScreen' });
      console.log('OneSignal: notification opened:', notification);
    });
  } catch (e) {
    console.log(e);
  }
};
