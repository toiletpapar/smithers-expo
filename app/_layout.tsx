import { Stack } from "expo-router";
import { Text } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from 'expo-router/drawer'
import { PaperProvider, MD3DarkTheme, Appbar } from 'react-native-paper'
import { getHeaderTitle } from '@react-navigation/elements'

const theme = {
  ...MD3DarkTheme
}

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer screenOptions={{header: (props) => {
          console.log(props)

          const title = getHeaderTitle(props.options, props.route.name);

          return (
            <Appbar.Header>
              <Appbar.Content title={title} />
            </Appbar.Header>
          )
        }}}>
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Home',
              title: "Home",
            }}
          />
          <Drawer.Screen
            name="manga/index"
            options={{
              drawerLabel: 'Manga',
              title: "Manga",
            }}
          />
          <Drawer.Screen
            name="test"
            options={{
              drawerLabel: 'Test',
              title: "Test"
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
