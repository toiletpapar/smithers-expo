import { Manga } from "@/models/Manga"
import { User } from "@/models/User"
import axios from "axios"

namespace UserClientRepository {
  export const get = async (userId: string): Promise<User> => {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/user/${userId}`)

    return User.fromResponse(response.data)
  }
}

export {
  UserClientRepository
}