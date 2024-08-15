import { MangaUpdate } from "@/models/MangaUpdate"
import axios from "axios"

namespace MangaUpdateClientRepository {
  export const list = async (): Promise<MangaUpdate[]> => {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/manga-update`)
    const mangaUpdates = (response.data as any[]).map((data: any) => MangaUpdate.fromResponse(data))
    return mangaUpdates
  }

  export const updateIsRead = async (mangaUpdateId: number, isRead: boolean): Promise<MangaUpdate> => {
    const response = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/manga-update/${mangaUpdateId}/isRead`, {
      data: {
        isRead
      },
      properties: [
        'isRead'
      ]
    })
    const mangaUpdate = MangaUpdate.fromResponse(response.data)
    return mangaUpdate
  }
}

export {
  MangaUpdateClientRepository
}