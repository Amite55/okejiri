import tw from "@/src/lib/tailwind";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import WebView from "react-native-webview";

// ============== type interface ================
interface WebViewProps {
  html: string;
  onMessage?: (data: any) => void;
}

// ============== main component ================
const PaymentWebview = ({ html, onMessage }: WebViewProps) => {
  return (
    <View style={{ height: 800, width: "100%" }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: html }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        style={tw`flex-1`}
        onMessage={(event) => {
          const message = JSON.parse(event.nativeEvent.data);
          onMessage?.(message);
        }}
        renderLoading={() => (
          <ActivityIndicator size="large" style={{ flex: 1 }} />
        )}
      />
    </View>
  );
};

export default PaymentWebview;
