// utils/networkStatus.ts
import * as Network from 'expo-network';

export const checkOnlineStatus = async () => {
  const status = await Network.getNetworkStateAsync();
  return status.isInternetReachable;
};
