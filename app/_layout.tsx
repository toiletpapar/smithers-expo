import { Stack } from "expo-router";
import { Text } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from 'expo-router/drawer'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: "Home",
            drawerIcon: (props) => <FontAwesomeIcon icon={faMugSaucer} {...props} />
          }}
        />
        <Drawer.Screen
          name="manga/index"
          options={{
            drawerLabel: 'Manga',
            title: "Manga"
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
  );
}
