import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { Surface, Drawer as PaperDrawer } from 'react-native-paper'
import { SafeAreaView } from "react-native-safe-area-context"
import { Text } from "react-native-paper"

function Drawer(props: DrawerContentComponentProps) {
  const routes = props.state.routes.filter((route) => {
    // Filter out expo default routes
    return route.name !== '_sitemap' && route.name !== '+not-found'
  })

  return (
    <Surface style={{flex: 1}}>
      <SafeAreaView>
        {
          routes.map((route) => {
            const options = props.descriptors[route.key].options

            return (
              <PaperDrawer.Item
                key={route.key}
                label={options.title as string}
                onPress={() => props.navigation.navigate(props.descriptors[route.key].route.name)}
                icon={(props) => {
                  return options.drawerIcon && <options.drawerIcon focused={false} {...props} />
                }}
              />
            )
          })
        }
      </SafeAreaView>
    </Surface>
  )
}

export {
  Drawer
}