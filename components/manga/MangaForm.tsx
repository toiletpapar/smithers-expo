import { AppbarDefaultStack } from "@/components/nav/AppbarDefaultStack";
import { CondensedMangaResult } from "@/models/CondensedMangaResult";
import { useGlobalSearchParams, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Appbar, IconButton, List, Menu, Surface, TextInput, Text, Card, Button, HelperText } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AdapterOption, adapterOptions } from '@/models/AdapterOption'

interface MangaFormProps {
  initialName: string
  initialUrl: string
  initialAdapterOption: AdapterOption | null
  nameErrorMessage?: string
  urlErrorMessage?: string
  adapterErrorMessage?: string
  onCrawlerSave: (crawler: CondensedMangaResult) => void
}

function MangaForm(props: MangaFormProps) {
  const navigation = useNavigation()

  const [name, setName] = useState<string>(props.initialName)
  const [url, setUrl] = useState<string>(props.initialUrl)
  const [adapter, setAdapter] = useState<AdapterOption | null>(props.initialAdapterOption)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const onMenuItemSelectFactory = (adapter: AdapterOption) => () => {
    setAdapter(adapter)
    setIsDropdownOpen(false)
  }

  const saveCralwer = () => {
    props.onCrawlerSave(new CondensedMangaResult({
      name,
      url,
      adapter: adapter?.value || ''
    }))
  }

  return (
    <>
      <Appbar.Header>
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Manga" />
        <Appbar.Action icon="check" onPress={saveCralwer} />
      </Appbar.Header>
      <Surface style={{flex: 1}}>
        <TextInput
          label="Name"
          onChangeText={setName}
          value={name}
          error={!!props.nameErrorMessage}
          autoFocus
        />
        {
          props.nameErrorMessage && (
            <HelperText type="error">{props.nameErrorMessage}</HelperText>
          )
        }
        <TextInput
          label="URL"
          onChangeText={setUrl}
          value={url}
          error={!!props.urlErrorMessage}
        />
        {
          props.urlErrorMessage && (
            <HelperText type="error">{props.urlErrorMessage}</HelperText>
          )
        }
        <Menu
          visible={isDropdownOpen}
          onDismiss={() => setIsDropdownOpen(false)}
          anchorPosition="bottom"
          style={{width: '100%', marginTop: 50}}
          anchor={(
            <Surface elevation={5}>
              <Button
                style={{borderRadius: 0}}
                contentStyle={{flexDirection: 'row-reverse', justifyContent: 'space-between', height: 60}}
                onPress={() => setIsDropdownOpen(true)}
                icon="chevron-down"
              >
                {adapter ? adapter.label : 'Select an adapter...'}
              </Button>
            </Surface>
          )}
        >
          {
            adapterOptions.map((adapterOption) => {
              return (
                <Menu.Item key={adapterOption.value} style={{width: '100%', maxWidth: null}} onPress={onMenuItemSelectFactory(adapterOption)} title={adapterOption.label} />
              )
            })
          }
        </Menu>
        {
          props.adapterErrorMessage && (
            <HelperText type="error">{props.adapterErrorMessage}</HelperText>
          )
        }
      </Surface>
    </>
  )
}

export {
  MangaForm,
  MangaFormProps,
  AdapterOption
}