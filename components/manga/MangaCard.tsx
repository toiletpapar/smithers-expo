import { Manga } from "@/models/Manga"
import { Card, Text, Button, useTheme, IconButton, Menu, Portal, Snackbar, Icon } from "react-native-paper"
import { Image } from "react-native"
import { useState } from "react"
import { DateTime } from "luxon"
import { MangaClientRepository } from "@/repositories/MangaClientRepository"
import { openURL } from "expo-linking"

interface MangaCardProps {
  manga: Manga
  onSync: (crawlTargetId: number, mangaName: string) => Promise<void>
  onFavouritePress: (crawlTargetId: number, favourite: boolean, mangaName: string) => Promise<void>
  onMangaPress: (url: string) => void
}

function MangaCard(props: MangaCardProps) {
  const theme = useTheme()

  const latestChapter = props.manga.getLatestChapter()
  const title = props.manga.data.manga.name
  const chapterName = `Chapter ${props.manga.data.mangaUpdates[0].chapter}`

  return (
    <Card style={{marginTop: 10, marginBottom: 10, marginHorizontal: 5, backgroundColor: theme.colors.elevation.level2}} elevation={2}>
      <Card.Title
        title={`${title}, ${chapterName}`}
        subtitle={latestChapter && DateTime.fromJSDate(latestChapter.data.dateCreated).toFormat('ccc, MMM dd, yyyy')}
        left={({size}) => <Image style={{width: size, height: size}} source={{uri: `${process.env.EXPO_PUBLIC_API_URL}/api/v1/crawl-targets/${props.manga.data.manga.crawlTargetId}/cover`}} />}
      />
      <Card.Actions>
        <IconButton icon="delete" />
        <IconButton icon="sync" onPress={() => props.onSync(props.manga.data.manga.crawlTargetId, props.manga.data.manga.name)} />
        <IconButton icon="book-edit" />
        <IconButton
          icon={props.manga.data.manga.favourite ? "heart" : "heart-outline"}
          onPress={() => props.onFavouritePress(props.manga.data.manga.crawlTargetId, !props.manga.data.manga.favourite, props.manga.data.manga.name)}
        />
        {
          latestChapter && (
            <IconButton icon="book-arrow-right" onPress={() => props.onMangaPress(latestChapter.data.readAt)} />
          )
        }
      </Card.Actions>
    </Card>
  )
}

export {
  MangaCard,
  MangaCardProps
}