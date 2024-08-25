import { Session } from "@/models/Session"
import { User } from "@/models/User"
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios"
import * as SecureStore from 'expo-secure-store'
import { UserClientRepository } from "./UserClientRepository"
import { Platform } from "react-native"

interface LoginOptions {
  username: string
  password: string
}

namespace SessionClientRepository {
  let interceptorId: number | undefined

  const _setupInterceptor = (session: Session) => {
    // Setup all requests to forward the session id
    if (interceptorId !== undefined) {
      axios.interceptors.request.eject(interceptorId)
    }
    interceptorId = axios.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
      if (Platform.OS === 'web') {
        return {
          ...config,
          withCredentials: true
        }
      } else if (Platform.OS === 'android' || Platform.OS === 'ios') {
        config.headers.set('connect.sid', session.data.sessionId)
      }

      return config
    })
  }

  export const initializeSession = async (): Promise<Session | null> => {
    try {
      // Retrieve user from device (on web, stored in cookie store)
      const encodedSession = Platform.OS === 'android' || Platform.OS === 'ios' ? await SecureStore.getItemAsync('session') : null
      
      if (encodedSession) {
        const session = Session.deserialize(encodedSession)

        // Test that the session works by retrieving the user
        const user = await UserClientRepository.get(session.data.userId)

        // Setup automatic forwarding
        _setupInterceptor(session)

        return session
      }

      return null
    } catch (err) {
      return null
    }
  }

  export const login = async (options: LoginOptions): Promise<Session> => {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/v1/login`, {
      username: options.username,
      password: options.password,
    })

    const cookies = response.headers["set-cookie"]
    const session = await Session.fromResponse(response.data, cookies || [])

    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      // Store session on device
      await SecureStore.setItemAsync('session', session.serialize())
    }

    // Setup automatic forwarding
    _setupInterceptor(session)

    return session
  }

  export const logout = async (): Promise<void> => {
    const response = await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/auth/v1/logout`)

    // Remove the automatic forwarding of session
    if (interceptorId !== undefined) {
      axios.interceptors.request.eject(interceptorId)
      interceptorId = undefined
    }

    return
  }
}

export {
  LoginOptions,
  SessionClientRepository
}