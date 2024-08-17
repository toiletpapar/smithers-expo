import { Manga } from "@/models/Manga"
import { Card, Text, Button, useTheme, IconButton, Menu, Portal, Snackbar, Icon } from "react-native-paper"
import { Image } from "react-native"
import { useState } from "react"
import { DateTime } from "luxon"
import { MangaClientRepository } from "@/repositories/MangaClientRepository"
import { openURL } from "expo-linking"
import { Link, router, useNavigation } from "expo-router"
import { CondensedMangaResult } from "@/models/CondensedMangaResult"

interface MangaSearchResultProps {
  crawler: CondensedMangaResult
  isAlreadyInUserList: boolean
  onCrawlerSave: (crawler: CondensedMangaResult) => Promise<void>
}

function MangaSearchResult(props: MangaSearchResultProps) {
  const theme = useTheme()
  const [imageLoadError, setImageLoadError] = useState<boolean>(false)

  const getImage = (crawler: CondensedMangaResult): string => {
    switch (crawler.data.adapter) {
      case 'webtoon':
        return "https://external-preview.redd.it/0eoxXcvC5Yc0PeKc6FAcPFqXuhHA4cKRyNqHh9PuvQQ.jpg?auto=webp&s=e8d3639d93616a53087352d921606f77f8340f8a"
      case 'mangadex':
        return "https://avatars.githubusercontent.com/u/100574686?s=200&amp;v=4"
      default:
        return ""
    }
  }

  return (
    <Card style={{marginTop: 10, marginBottom: 10, marginHorizontal: 5, backgroundColor: theme.colors.elevation.level2}} elevation={2}>
      <Card.Title
        title={props.crawler.data.name}
        subtitle={props.crawler.data.url}
        left={
          !imageLoadError ? (
            ({size}) => {
              return (
                <Image
                  onError={(err) => {
                    setImageLoadError(true)
                  }}
                  style={{width: size, height: size}}
                  source={{uri: getImage(props.crawler)}}
                />
              )
            }
          ) : undefined
        }
      />
      <Card.Actions>
        {
          props.isAlreadyInUserList ? (
            <IconButton icon="book-arrow-right" onPress={() => openURL(props.crawler.data.url)} />
          ) : (
            <IconButton icon="plus" onPress={() => props.onCrawlerSave(props.crawler)} />
          )
        }
      </Card.Actions>
    </Card>
  )
}

export {
  MangaSearchResult,
  MangaSearchResultProps
}