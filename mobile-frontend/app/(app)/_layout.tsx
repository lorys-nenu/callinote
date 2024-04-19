import { Redirect, Slot } from "expo-router";
import { useAuth } from "@/stores/auth";
import Text from "../components/Text";
import AudioPlayer from "../components/AudioPlayer";

export default function AppLayout() {
  const { status } = useAuth();

  if (status === "unlogged") {
    return <Redirect href="/login" />;
  }

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Slot />
      <AudioPlayer src="https://docs.google.com/uc?export=open&id=1LO_HZL5Zc1HVxexCmfCvNePLUlbZt1d8" />
    </>
  );
}