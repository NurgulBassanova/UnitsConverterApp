// hooks/useResponsiveLayout.ts
import { useWindowDimensions } from 'react-native';

export default function useResponsiveLayout() {
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;
  const isLandscape = !isPortrait;

  let sizeCategory: 'small' | 'medium' | 'large';

  if (width < 360) sizeCategory = 'small';
  else if (width < 768) sizeCategory = 'medium';
  else sizeCategory = 'large';

  return {
    isPortrait,
    isLandscape,
    sizeCategory,
    width,
    height,
  };
}
