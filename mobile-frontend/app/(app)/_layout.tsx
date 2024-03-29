import { Redirect, Stack } from "expo-router";
import { useUser } from "@/stores/user";

export default function AppLayout() {
  const user = useUser().user;

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack />
  );
}