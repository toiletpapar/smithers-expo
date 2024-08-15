import { MangaList } from "@/components/manga/MangaList";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Surface, useTheme } from "react-native-paper"

export default function MangaHome() {
  const theme = useTheme()

  return (
    <Surface style={{flex: 1}}>
      <MangaList />
    </Surface>
  )
}
