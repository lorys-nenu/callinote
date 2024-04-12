import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/stores/auth";
import Text from "../components/Text";

export default function AppLayout() {
  const { status } = useAuth();

  if (status === "unlogged") {
    return <Redirect href="/login" />;
  }

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack />
  );
}