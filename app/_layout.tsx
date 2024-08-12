import { Stack } from "expo-router";
import { Text } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer as NavDrawer } from 'expo-router/drawer'
import { Drawer } from '@/components/Drawer'
import { PaperProvider, MD3DarkTheme, Appbar, Icon } from 'react-native-paper'
import { getHeaderTitle } from '@react-navigation/elements'
import { AppBarDrawer } from "@/components/AppbarDrawer";

const theme = {
  ...MD3DarkTheme
}

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavDrawer screenOptions={{header: (props) => (<AppBarDrawer {...props} />)}} drawerContent={(props) => (<Drawer {...props} />)}>
          <NavDrawer.Screen
            name="index"
            options={{
              drawerLabel: 'Home',
              title: "Home",
              drawerIcon: (props) => <Icon size={props.size} source="home" />
            }}
          />
          <NavDrawer.Screen
            name="manga/index"
            options={{
              drawerLabel: 'Manga',
              title: "Manga",
              drawerIcon: (props) => <Icon size={props.size} source="book" />
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
