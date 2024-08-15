import { object, ObjectSchema, string } from "yup"
import { Base64 } from "js-base64"

interface IUser {
  userId: string
  username: string
}

class User {
  public data: IUser
  public static scheme: ObjectSchema<IUser> = object({
    userId: string().required(),
    username: string().required(),
  }).required()

  constructor(data: IUser) {
    this.data = data
  }

  static async validate(data: any): Promise<IUser> {
    const result = await User.scheme.validate(data)

    return result
  }

  static async fromResponse (data: any): Promise<User> {
    const result = await User.validate({
      userId: data.userId,
      username: data.username,
    })

    return new User(result)
  }

  serialize(): string {
    return Base64.encode(JSON.stringify(this.data), true)
  }

  static deserialize(data: string): User {
    return new User(JSON.parse(Base64.decode(data)))
  }
}

export {
  User,
  IUser
}