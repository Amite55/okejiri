import {
  IconChatsGray,
  IconChatsWhiteSelected,
  IconHomeGray,
  IconHomeWhiteSelected,
  IconOrderGray,
  IconOrderSelected,
  IconProfileGray,
  IconProfileSelected,
} from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";
import {
  Keyboard,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";

// Props type for MyTabBar
type MyTabBarProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: any;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

function MyTabBar({ state, descriptors, navigation }: MyTabBarProps) {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <>
      {!isKeyboardVisible && (
        <View
          style={[
            tw`absolute bottom-0 justify-center items-center w-full flex-1  `,
          ]}
        >
          <View
            style={tw` bg-black justify-between  h-24 w-full flex-row items-center flex-1`}
          >
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: "tabLongPress",
                  target: route.key,
                });
              };

              // Get the icon based on route name
              const getIcon = () => {
                switch (route.name) {
                  case "home":
                    return isFocused ? IconHomeWhiteSelected : IconHomeGray;
                  case "order":
                    return isFocused ? IconOrderSelected : IconOrderGray;
                  case "chats":
                    return isFocused ? IconChatsWhiteSelected : IconChatsGray;

                  case "account":
                    return isFocused ? IconProfileSelected : IconProfileGray;
                }
              };

              // Dynamically get label====================
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;
              return (
                <AnimatedTouchableOpacity
                  layout={LinearTransition.springify().mass(0.1)}
                  key={route.key}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={tw`flex-1 w-full p-2  items-center justify-between`}
                >
                  <View
                    style={[
                      tw`items-center justify-center  py-3 rounded-full `,
                    ]}
                  >
                    <Animated.View
                      entering={
                        isFocused ? FadeIn.duration(1000) : FadeIn.duration(0)
                      }
                      exiting={FadeOut.duration(500)}
                      style={[
                        tw` ${
                          isFocused
                            ? "  bg-primary rounded-full -mt-12 h-14 w-14 justify-center items-center"
                            : "bg-transparent"
                        }`,
                      ]}
                    >
                      <SvgXml
                        xml={getIcon() || ``}
                        width={26}
                        height={26}
                        style={[tw`mb-1`]}
                      />
                    </Animated.View>
                    <View>
                      <Text
                        style={[
                          tw` text-xs mt-2`,
                          isFocused ? tw`text-white` : tw` text-gray-300`,
                        ]}
                      >
                        {label}
                      </Text>
                    </View>
                  </View>
                </AnimatedTouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </>
  );
}
const Individual_Service_Provider_Layout = () => {
  return (
    <View style={tw`flex-1`}>
      <StatusBar barStyle={"dark-content"} />
      <Tabs
        screenOptions={{
          headerShown: false,
          // tabBarHideOnKeyboard: true,
        }}
        tabBar={(props: any) => <MyTabBar {...props} />}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="order" />
        <Tabs.Screen name="chats" />
        <Tabs.Screen name="account" />
      </Tabs>
    </View>
  );
};

export default Individual_Service_Provider_Layout;
