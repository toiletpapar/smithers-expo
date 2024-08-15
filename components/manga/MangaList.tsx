import { Card, Text, Button, useTheme } from "react-native-paper"
import { FlashList } from "@shopify/flash-list"
import { MangaCard } from "./MangaCard"
import { Manga } from "@/models/Manga"
import { useEffect, useState } from "react"
import { MangaClientRepository } from "@/repositories/MangaClientRepository"

interface MangaListProps {

}

function MangaList(props: MangaListProps) {
  const [manga, setManga] = useState<Manga[]>([])

  useEffect(() => {
    const fn = async () => {
      try {
        const manga = await MangaClientRepository.list({onlyLatest: true})

        setManga(manga)
      } catch (err) {
        console.error(err)
      }
    }

    fn()
  }, [])

  return (
    <FlashList
      data={manga}
      renderItem={({ item }) => (<MangaCard manga={item} />)}
      estimatedItemSize={200}
    />
  )
}

export {
  MangaList,
  MangaListProps
}