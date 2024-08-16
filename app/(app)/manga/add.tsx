import { MangaForm } from "@/components/manga/MangaForm";
import { AppbarDefaultStack } from "@/components/nav/AppbarDefaultStack";
import { CondensedMangaResult } from "@/models/CondensedMangaResult";
import { MangaClientRepository } from "@/repositories/MangaClientRepository";
import { AxiosError } from "axios";
import { useGlobalSearchParams, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Appbar, IconButton, List, Menu, Surface, TextInput, Text, Card, Button, HelperText } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Add() {
  const navigation = useNavigation()

  const [nameError, setNameError] = useState<string | undefined>(undefined)
  const [urlError, setUrlError] = useState<string | undefined>(undefined)
  const [adapterError, setAdapterError] = useState<string | undefined>(undefined)

  const saveCralwer = async (crawler: CondensedMangaResult) => {
    try {
      await MangaClientRepository.create(crawler)
      navigation.goBack()
    } catch (err: any) {
      console.log(err.response?.data?.errors)
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

  return (
    <MangaForm
      initialName=""
      initialUrl=""
      initialAdapterOption={null}
      nameErrorMessage={nameError}
      urlErrorMessage={urlError}
      adapterErrorMessage={adapterError}
      onCrawlerSave={saveCralwer}
    />
  )
}