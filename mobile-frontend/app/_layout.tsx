import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Slot, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient();

import { useUser } from '@/stores/user';
import { useIsNavigationReady } from '@/hooks/useIsNavigationReady';
import { useMMKVString } from 'react-native-mmkv';
import { useAuth } from '@/stores/auth';
import useGetProfile from '@/hooks/useGetProfile';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <QueryClientProvider client={queryClient}>
    <RootLayoutNav />
    </QueryClientProvider>;
}

function RootLayoutNav() {
  const {user: userProfile} = useGetProfile();
  const [token] = useMMKVString('token');
  const {signIn} = useAuth()
  const user = useUser().user
  const isReady = useIsNavigationReady()
  
  useEffect(() => {
    if (!isReady) return
    if (!user && !token) {
      router.navigate('login')
    }

    if (!user && token) {
      signIn(token)
    }

    if (!user && userProfile) {
      useUser().setUser(userProfile)
    }
  }, [isReady, user])

  return (
    <Slot />
  );
}
