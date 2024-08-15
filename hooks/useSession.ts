import { Session as SessionData } from '@/models/Session'
import { LoginOptions, SessionClientRepository } from '@/repositories/SessionClientRepository'
import { createContext, SetStateAction, useContext, useState } from 'react'

interface SessionService {
  session: SessionData | null,
  initialize: () => Promise<void>,
  login: (options: LoginOptions) => Promise<void>,
  logout: () => Promise<void>,
  isLoading: boolean,
}

const SessionContext = createContext<SessionService | null>(null)

const useSession = () => {
  const session = useContext(SessionContext)

  return session
}

export {
  SessionContext,
  useSession,
  SessionService
}