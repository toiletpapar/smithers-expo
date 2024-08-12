import { AppbarDefaultStack } from "@/components/nav/AppbarDefaultStack";
import { AppbarManga } from "@/components/nav/AppbarManga";
import { Stack } from "expo-router";

export default function MangaLayout() {
  return (
    <Stack screenOptions={{header: (props) => <AppbarDefaultStack {...props} />}}>
      <Stack.Screen name="index" options={{ header: (props) => <AppbarManga {...props} /> }} />
      <Stack.Screen name="add" />
      <Stack.Screen name="search" />
    </Stack>
  );
}
