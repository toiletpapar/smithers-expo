import { DrawerHeaderProps } from "@react-navigation/drawer"
import { getHeaderTitle } from '@react-navigation/elements'
import { useState } from "react";
import { Appbar, Icon, IconButton } from 'react-native-paper'

function AppBarDrawer(props: DrawerHeaderProps) {
  const title = getHeaderTitle(props.options, props.route.name);

  return (
    <Appbar.Header>
      <IconButton icon="menu" size={20} onPress={props.navigation.toggleDrawer} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  )
}

export {
  AppBarDrawer
}