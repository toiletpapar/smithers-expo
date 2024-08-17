import { Manga } from "@/models/Manga"
import { Card, Text, Button, useTheme, IconButton, Menu, Portal, Snackbar, Icon } from "react-native-paper"
import { Image } from "react-native"
import { useState } from "react"
import { DateTime } from "luxon"
import { MangaClientRepository } from "@/repositories/MangaClientRepository"
import { openURL } from "expo-linking"
import { Link, router, useNavigation } from "expo-router"

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
  const [imageLoadError, setImageLoadError] = useState<number>(0) // 0 - no error, 1 - error on cover image, 2 - error on fallback image

  const getFallbackImage = (manga: Manga): string => {
    switch (manga.data.manga.adapter) {
      case 'webtoon':
        return "https://external-preview.redd.it/0eoxXcvC5Yc0PeKc6FAcPFqXuhHA4cKRyNqHh9PuvQQ.jpg?auto=webp&s=e8d3639d93616a53087352d921606f77f8340f8a"
      case 'mangadex':
        return "https://avatars.githubusercontent.com/u/100574686?s=200&amp;v=4"
      default:
        return ""
    }
  }

  const navigateToEdit = () => {
    router.navigate({
      pathname: '/(app)/manga/edit/[crawlTargetId]',
      params: { crawlTargetId: props.manga.data.manga.crawlTargetId }
    })
  }

  return (
    <Card style={{marginTop: 10, marginBottom: 10, marginHorizontal: 5, backgroundColor: theme.colors.elevation.level2}} elevation={2}>
      <Card.Title
        title={latestChapter ? `${title}, Chapter ${latestChapter.data.chapter}` : title}
        subtitle={latestChapter && DateTime.fromJSDate(latestChapter.data.dateCreated).toFormat('ccc, MMM dd, yyyy')}
        left={
          imageLoadError < 2 ? (
            ({size}) => {
              return (
                <Image
                  onError={(err) => {
                    setImageLoadError(imageLoadError+1)
                  }}
                  style={{width: size, height: size}}
                  source={{uri: imageLoadError === 1 ? getFallbackImage(props.manga) : `${process.env.EXPO_PUBLIC_API_URL}/api/v1/crawl-targets/${props.manga.data.manga.crawlTargetId}/cover`}}
                />
              )
            }
          ) : undefined
        }
      />
      <Card.Actions>
        {/* <IconButton icon="delete" /> */}
        <IconButton icon="sync" onPress={() => props.onSync(props.manga.data.manga.crawlTargetId, props.manga.data.manga.name)} />
        <IconButton icon="book-edit" onPress={navigateToEdit} />
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