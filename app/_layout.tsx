import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Drawer as NavDrawer } from 'expo-router/drawer'
import { Drawer } from '@/components/nav/Drawer'
import { PaperProvider, MD3DarkTheme, Icon } from 'react-native-paper'
import { AppbarDefaultDrawer } from "@/components/nav/AppbarDefaultDrawer"
import { AppbarManga } from "@/components/nav/AppbarManga"
import { User } from "@/models/User"
import { useEffect, useState } from "react"
import { SessionService, SessionContext } from "@/hooks/useSession"
import { Session as SessionData } from "@/models/Session"
import { Slot, SplashScreen, Stack } from "expo-router"
import { Splash } from "@/components/Splash"
import * as SecureStore from 'expo-secure-store'
import { LoginOptions, SessionClientRepository } from "@/repositories/SessionClientRepository"

const theme = {
  ...MD3DarkTheme
}

export default function RootLayout() {
  const [session, setSession] = useState<SessionData | null>(null)
  const [isInitializing, setIsInitializing] = useState<boolean>(false)
  const [hasAuthError, setHasAuthError] = useState<boolean>(false)

  const sessionService = {
    session: session,
    initialize: async () => {
      setIsInitializing(true)
      const session = await SessionClientRepository.initializeSession()

      if (session) {
        setSession(session)
      }

      setIsInitializing(false)
    },
    login: async (options: LoginOptions) => {
      try {
        const session = await SessionClientRepository.login(options)
        setSession(session)
        setHasAuthError(false)
      } catch (err) {
        setHasAuthError(true)

        throw err
      }
    },
    logout: async () => {
      try {
        await SessionClientRepository.logout()
        setSession(null)
        setHasAuthError(false)
      } catch (err) {
        setHasAuthError(true)

        throw err
      }
    },
    isInitializing,
    hasError: hasAuthError
  }

  useEffect(() => {
    const fn = async () => {
      await sessionService?.initialize()
    }

    fn()
  }, [])

  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SessionContext.Provider value={sessionService}>
          <Slot />
        </SessionContext.Provider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
