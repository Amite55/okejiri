import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotificationsAsync";
import { EventSubscription as Subscription } from "expo-modules-core";
import * as Notifications from "expo-notifications";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface DeviceDetails {
  fcm_token: string;
  device_id: string;
  device_type: string;
  device_name: string;
}

interface NotificationContextType {
  expoPushToken: string | null;
  deviceDetails: DeviceDetails | null;
  notification: Notifications.Notification | null;
  error: Error | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotification = () => {
  const contextInfo = useContext(NotificationContext);
  if (contextInfo === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return contextInfo;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [deviceDetails, setDeviceDetails] = useState<DeviceDetails | null>(
    null,
  );
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((data) => {
        if (data) {
          setExpoPushToken(data.fcm_token);
          setDeviceDetails(data);
        }
      })
      .catch((err) => setError(err));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("🔔 Notification Received: ", notification);
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("🔔 Notification Response Received");
      });

    return () => {
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{ expoPushToken, deviceDetails, notification, error }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
