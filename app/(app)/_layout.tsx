import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Drawer as NavDrawer } from 'expo-router/drawer'
import { Drawer } from '@/components/nav/Drawer'
import { PaperProvider, MD3DarkTheme, Icon, Button } from 'react-native-paper'
import { AppbarDefaultDrawer } from "@/components/nav/AppbarDefaultDrawer"
import { AppbarManga } from "@/components/nav/AppbarManga"
import { User } from "@/models/User"
import { useEffect, useState } from "react"
import { Redirect, Slot, SplashScreen, Stack } from "expo-router"
import { Splash } from "@/components/Splash"
import * as SecureStore from 'expo-secure-store'
import { useSession } from "@/hooks/useSession"
import { LoginOptions } from "@/repositories/SessionClientRepository"

export default function AppLayout() {
  const sessionService = useSession()

  if (!sessionService || sessionService.isInitializing) {
    return (
      <Splash />
    )
  } else if (!sessionService.session) {
    return (
      <Redirect href="/login" />
    )
  } else {
    return (
      <NavDrawer screenOptions={{header: (props) => (<AppbarDefaultDrawer {...props} />)}} drawerContent={(props) => (<Drawer onLogout={sessionService.logout} {...props} />)}>
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
            headerShown: false
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
    )
  }
}