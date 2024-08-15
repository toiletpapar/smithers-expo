import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { Surface, Drawer as PaperDrawer, Button } from 'react-native-paper'
import { SafeAreaView } from "react-native-safe-area-context"
import { Text } from "react-native-paper"

interface DrawerProps extends DrawerContentComponentProps {
  onLogout: () => Promise<void>
}

function Drawer(props: DrawerProps) {
  const routes = props.state.routes.filter((route) => {
    // Filter out expo default routes
    return route.name !== '_sitemap' && route.name !== '+not-found'
  })

  return (
    <Surface style={{flex: 1, justifyContent: 'space-between', paddingBottom: 24}}>
      <SafeAreaView>
        {
          routes.map((route) => {
            const options = props.descriptors[route.key].options

            return (
              <PaperDrawer.Item
                key={route.key}
                label={options.title as string}
                onPress={() => props.navigation.navigate(props.descriptors[route.key].route.name)}
                icon={(iconProps) => {
                  return options.drawerIcon && <options.drawerIcon focused={false} {...iconProps} />
                }}
              />
            )
          })
        }
      </SafeAreaView>
      <Button mode="outlined" style={{marginHorizontal: 24}} onPress={props.onLogout}>Logout</Button>
    </Surface>
  )
}

export {
  Drawer
}