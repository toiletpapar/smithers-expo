import { AppbarDefaultStack } from "@/components/nav/AppbarDefaultStack";
import { AppbarManga } from "@/components/nav/AppbarManga";
import { Stack } from "expo-router";

export default function MangaLayout() {
  return (
    <Stack screenOptions={{header: (props) => <AppbarDefaultStack {...props} />}}>
      <Stack.Screen name="index" options={{ header: (props) => <AppbarManga {...props} />, title: "Manga" }} />
      <Stack.Screen name="add" options={{title: 'Add Manga'}} />
      <Stack.Screen name="search" options={{title: 'Search Manga'}} />
    </Stack>
  );
}
