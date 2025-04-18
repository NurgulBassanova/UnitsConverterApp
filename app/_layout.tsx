// _layout.tsx
import { Stack } from "expo-router";
import React from "react";
import { ThemeProvider, useTheme } from "./theme/theme";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutWithTheme />
    </ThemeProvider>
  );
}

// Separate layout using theme
function LayoutWithTheme() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    />
  );
}
