import { DrawerHeaderProps } from "@react-navigation/drawer";
import { getHeaderTitle } from '@react-navigation/elements'
import { Appbar, IconButton } from "react-native-paper";

function AppbarDefaultDrawer(props: DrawerHeaderProps) {
  const title = getHeaderTitle(props.options, props.route.name);

  return (
    <Appbar.Header>
      <IconButton icon="menu" size={20} onPress={props.navigation.toggleDrawer} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  )
}

export {
  AppbarDefaultDrawer
}