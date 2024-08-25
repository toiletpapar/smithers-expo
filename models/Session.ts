import { object, ObjectSchema, string } from "yup"
import { Base64 } from "js-base64"
import { Platform } from "react-native"

interface ISession {
  userId: string
  username: string
  sessionId?: string
}

class Session {
  public data: ISession
  public static scheme: ObjectSchema<ISession> = object({
    userId: string().required(),
    username: string().required(),
    sessionId: Platform.OS === 'android' || Platform.OS === 'ios' ? string().required() : string().optional()
  }).required()

  constructor(data: ISession) {
    this.data = data
  }

  static async validate(data: any): Promise<ISession> {
    const result = await Session.scheme.validate(data)

    return result
  }

  static async fromResponse (data: any, cookies: string[]): Promise<Session> {
    const cookieKV = cookies.reduce((acc: {key: string, value: string}[], cookie) => {
      return [
        ...acc,
        ...cookie.split(';').map((keyValue) => {
          const [key, value] = keyValue.split('=')
  
          return {
            key,
            value
          }
        })
      ]
    }, [])
    const session = cookieKV.find((keyValue) => keyValue.key === 'connect.sid')
    const result = await Session.validate({
      username: data.username,
      userId: data.userId,
      sessionId: session?.value
    })

    return new Session(result)
  }

  serialize(): string {
    return Base64.encode(JSON.stringify(this.data), true)
  }

  static deserialize(data: string): Session {
    return new Session(JSON.parse(Base64.decode(data)))
  }
}

export {
  Session,
  ISession
}