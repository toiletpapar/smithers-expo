import { DrawerHeaderProps } from "@react-navigation/drawer";
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { getHeaderTitle } from '@react-navigation/elements'
import { Appbar, IconButton } from "react-native-paper";
import { DrawerActions } from "@react-navigation/native";

function AppbarManga(props: NativeStackHeaderProps) {
  const title = getHeaderTitle(props.options, props.route.name);

  return (
    <Appbar.Header>
      <IconButton icon="menu" size={20} onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} />
      <Appbar.Content title={title} />
      <Appbar.Action icon="magnify" onPress={() => props.navigation.navigate('search')} />
      <Appbar.Action icon="plus" onPress={() => props.navigation.navigate('add')} />
    </Appbar.Header>
  )
}

export {
  AppbarManga
}