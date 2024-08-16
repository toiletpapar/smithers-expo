import { MangaForm } from "@/components/manga/MangaForm";
import { AppbarDefaultStack } from "@/components/nav/AppbarDefaultStack";
import { Splash } from "@/components/Splash";
import { getAdapterOption } from "@/models/AdapterOption";
import { CondensedMangaResult } from "@/models/CondensedMangaResult";
import { MangaClientRepository } from "@/repositories/MangaClientRepository";
import { AxiosError } from "axios";
import { router, useGlobalSearchParams, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Appbar, IconButton, List, Menu, Surface, TextInput, Text, Card, Button, HelperText } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Edit() {
  const localParams = useLocalSearchParams()
  const navigation = useNavigation()

  useEffect(() => {
    const fn = async () => {
      try {
        const crawler = await MangaClientRepository.get(localParams.crawlTargetId as string)
        setInitialCrawler(crawler)
      } catch (err) {
        console.error(err)
        router.back()
      }
    }

    fn()
  }, [])

  const [initialCrawler, setInitialCrawler] = useState<CondensedMangaResult | null>(null)
  const [nameError, setNameError] = useState<string | undefined>(undefined)
  const [urlError, setUrlError] = useState<string | undefined>(undefined)
  const [adapterError, setAdapterError] = useState<string | undefined>(undefined)

  const saveCralwer = async (crawler: CondensedMangaResult) => {
    try {
      await MangaClientRepository.update(parseInt(localParams.crawlTargetId as string), crawler)
      navigation.goBack()
    } catch (err: any) {
      if (err.response?.data?.errors) {
        err.response?.data?.errors.forEach((error: any) => {
          switch (error.path) {
            case 'name':
              setNameError(error.message)
              break
            case 'url':
              setUrlError(error.message)
              break
            case 'adapter':
              setAdapterError(error.message)
              break
          }
        })
      } else {
        console.error(err)
      }
    }
  }

  if (initialCrawler === null) {
    return (
      <Splash />
    )
  } else {
    return (
      <MangaForm
        initialName={initialCrawler.data.name}
        initialUrl={initialCrawler.data.url}
        initialAdapterOption={getAdapterOption(initialCrawler.data.adapter) || null}
        nameErrorMessage={nameError}
        urlErrorMessage={urlError}
        adapterErrorMessage={adapterError}
        onCrawlerSave={saveCralwer}
      />
    )
  }
}