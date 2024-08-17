import { MangaList } from "@/components/manga/MangaList"
import { Surface } from "react-native-paper"

export default function MangaHome() {
  return (
    <Surface style={{flex: 1}}>
      <MangaList />
    </Surface>
  )
}
