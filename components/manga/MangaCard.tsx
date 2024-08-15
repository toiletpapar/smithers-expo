import { Manga } from "@/models/Manga"
import { Card, Text, Button, useTheme } from "react-native-paper"

interface MangaCardProps {
  manga: Manga
}

function MangaCard(props: MangaCardProps) {
  const theme = useTheme()

  return (
    <Card style={{marginTop: 10, marginBottom: 10, marginHorizontal: 5, backgroundColor: theme.colors.elevation.level2}} elevation={2}>
      <Card.Content>
        <Text variant="titleLarge">{props.manga.data.manga.name}</Text>
        <Text variant="bodyMedium">{props.manga.data.mangaUpdates[0].chapterName || `Chapter ${props.manga.data.mangaUpdates[0].chapter}`}</Text>
        <Text variant="bodySmall">{props.manga.data.mangaUpdates[0].dateCreated.toString()}</Text>
      </Card.Content>
    </Card>
  )
}

export {
  MangaCard,
  MangaCardProps
}