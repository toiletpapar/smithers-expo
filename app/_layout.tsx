import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Drawer as NavDrawer } from 'expo-router/drawer'
import { Drawer } from '@/components/Drawer'
import { PaperProvider, MD3DarkTheme, Icon } from 'react-native-paper'
import { AppbarDefault } from "@/components/AppbarDefault"
import { AppbarManga } from "@/components/AppbarManga"

const theme = {
  ...MD3DarkTheme
}

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavDrawer screenOptions={{header: (props) => (<AppbarDefault {...props} />)}} drawerContent={(props) => (<Drawer {...props} />)}>
          <NavDrawer.Screen
            name="index"
            options={{
              drawerLabel: 'Home',
              title: "Home",
              drawerIcon: (props) => <Icon size={props.size} source="home" />,
            }}
          />
          <NavDrawer.Screen
            name="manga"
            options={{
              drawerLabel: 'Manga',
              title: "Manga",
              drawerIcon: (props) => <Icon size={props.size} source="book" />,
              header: (props) => <AppbarManga {...props} />
            }}
          />
          <NavDrawer.Screen
            name="test"
            options={{
              drawerLabel: 'Test',
              title: "Test",
              drawerIcon: (props) => <Icon size={props.size} source="beaker" />
            }}
          />
        </NavDrawer>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
