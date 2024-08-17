import { MangaSearchResult } from "@/components/manga/MangaSearchResult";
import { CondensedMangaResult } from "@/models/CondensedMangaResult";
import { MangaClientRepository } from "@/repositories/MangaClientRepository";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect, useNavigation } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Appbar, IconButton, Portal, Searchbar, Snackbar, Surface, Text, TextInput, useTheme } from "react-native-paper";

export default function Search() {
  const theme = useTheme()
  const navigation = useNavigation()

  const [portalSnackbarMessage, setPortalSnackbarMessage] = useState<string | null>(null)
  const dismissSnackbar = () => setPortalSnackbarMessage(null)

  const [mangaList, setMangaList] = useState<CondensedMangaResult[]>([])
  useFocusEffect(() => {
    const fn = async () => {
      const userMangas = await MangaClientRepository.listCondensed()
      setMangaList(userMangas)
    }
    
    fn()
  })

  const [searchText, setSearchText] = useState<string>("")
  const [searchResults, setSearchResults] = useState<CondensedMangaResult[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [hasSearched, setHasSearched] = useState<boolean>(false)

  const search = async (searchText: string) => {
    try {
      if (searchText) {
        setIsSearching(true)
        setHasSearched(true)

        const r1 = await MangaClientRepository.search(searchText, 1, 'webtoon')
        const r2 = await MangaClientRepository.search(searchText, 1, 'mangadex')

        setSearchResults([...r1, ...r2].sort((a, b) => {
          if (a.data.name < b.data.name) {
            return -1
          } else if (a.data.name > b.data.name) {
            return 1
          } else {
            return 0
          }
        }))
        setIsSearching(false)
      }
    } catch (err) {
      setPortalSnackbarMessage("Failed to search for results")
    }
  }

  const searchbar = (
    <Searchbar
      style={{backgroundColor: theme.colors.elevation.level0}}
      mode="view"
      icon="arrow-left"
      onIconPress={() => navigation.goBack()}
      onChangeText={setSearchText}
      onClearIconPress={() => setSearchText('')}
      value={searchText}
      showDivider={false}
      elevation={0}
      onSubmitEditing={(e) => {
        search(searchText)
      }}
      placeholder="Name of manga..."
    />
  )

  const saveCrawler = async (crawler: CondensedMangaResult) => {
    try {
      await MangaClientRepository.create(crawler)
      const userMangas = await MangaClientRepository.listCondensed()
      setMangaList(userMangas)
    } catch (err) {
      setPortalSnackbarMessage("Failed to add manga to your list")
    }
  }

  const shouldCenterItem = isSearching || hasSearched && searchResults.length === 0
  return (
    <>
      <Appbar.Header>
        {searchbar}
      </Appbar.Header>
      <Surface style={{flex: 1, justifyContent: shouldCenterItem ? 'center' : undefined, alignItems: shouldCenterItem ? 'center' : undefined}}>
        {
          isSearching ? (
            <ActivityIndicator animating={true} />
          ) : hasSearched && searchResults.length === 0 ? (
            <Text>No results found...</Text>
          ) : searchResults.length > 0 && (
            <FlashList
              data={searchResults}
              renderItem={({ item }) => {
                return (
                  <MangaSearchResult
                    crawler={item}
                    isAlreadyInUserList={!!mangaList.find((v) => v.data.name === item.data.name)}
                    onCrawlerSave={saveCrawler}
                  />
                )
              }}
              estimatedItemSize={200}
            />
          )
        }
      </Surface>
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
