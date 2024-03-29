import { useRootNavigationState } from 'expo-router'

// From: https://github.com/expo/router/issues/740#issuecomment-1950294395
export function useIsNavigationReady() {
  const rootNavigationState = useRootNavigationState()
  return rootNavigationState?.key != null
}