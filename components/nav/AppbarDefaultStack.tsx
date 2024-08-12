import { DrawerHeaderProps } from "@react-navigation/drawer";
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { getHeaderTitle } from '@react-navigation/elements'
import { Appbar, IconButton } from "react-native-paper";
import { DrawerActions } from "@react-navigation/native";

function AppbarDefaultStack(props: NativeStackHeaderProps) {
  const title = getHeaderTitle(props.options, props.route.name);

  return (
    <Appbar.Header>
      {props.back && (
        <IconButton icon="arrow-left" onPress={() => props.navigation.goBack()} />
      )}
      <Appbar.Content title={title} />
    </Appbar.Header>
  )
}

export {
  AppbarDefaultStack
}