import { Card, Text, Button, useTheme, Portal, Snackbar } from "react-native-paper"
import { FlashList } from "@shopify/flash-list"
import { MangaCard } from "./MangaCard"
import { Manga } from "@/models/Manga"
import { useEffect, useState } from "react"
import { MangaClientRepository } from "@/repositories/MangaClientRepository"
import { openURL } from "expo-linking"
import { useFocusEffect } from "expo-router"

interface MangaListProps {

}

function MangaList(props: MangaListProps) {
  const [manga, setManga] = useState<Manga[]>([])
  const [portalSnackbarMessage, setPortalSnackbarMessage] = useState<string | null>(null)
  
  const getMangaList = async () => {
    try {
      const manga = await MangaClientRepository.list({onlyLatest: true})

      setManga(manga)
    } catch (err) {
      console.error(err)
    }
  }

  useFocusEffect(() => {
    const fn = async () => {
      getMangaList()
    }

    fn()
  })

  const dismissSnackbar = () => setPortalSnackbarMessage(null)

  return (
    <>
      <FlashList
        data={manga}
        renderItem={({ item }) => {
          const latestChapter = item.getLatestChapter()
          const sync = async (crawlTargetId: number, mangaName: string) => {
            try {
              await MangaClientRepository.sync(crawlTargetId)
              await getMangaList()
              setPortalSnackbarMessage(`${mangaName} synced successfully`)
            } catch (err) {
              setPortalSnackbarMessage(`${mangaName} failed to sync`)
            }
          }
          const setFavourite = async (crawlTargetId: number, favourite: boolean, mangaName: string) => {
            try {
              await MangaClientRepository.updateFavourite(crawlTargetId, favourite)
              await getMangaList()
            } catch (err) {
              setPortalSnackbarMessage(`${mangaName} failed to update favourite`)
            }
          }

          return (
            <MangaCard
              manga={item}
              onSync={sync}
              onFavouritePress={setFavourite}
              onMangaPress={() => latestChapter && openURL(latestChapter.data.readAt)}
            />
          )
        }}
        estimatedItemSize={200}
      />
      <Portal>
        <Snackbar
          visible={!!portalSnackbarMessage}
          onDismiss={dismissSnackbar}
          onIconPress={dismissSnackbar}
        >
          {portalSnackbarMessage}
        </Snackbar>
      </Portal>
    </>
  )
}

export {
  MangaList,
  MangaListProps
}