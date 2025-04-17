import { Stack } from "expo-router";
import React from "react";
import { getCurrentTheme } from "./theme/theme";

export default function RootLayout() {
  const theme = getCurrentTheme();
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background }
      }}
    />
  );
}