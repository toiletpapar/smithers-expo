import { Manga } from "@/models/Manga"
import axios from "axios"

interface MangaListOptions {
  onlyLatest: boolean
}

namespace MangaClientRepository {
  export const list = async (options: MangaListOptions): Promise<Manga[]> => {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/manga`)

    return response.data.map((data: any) => Manga.fromResponse(data))
  }
}

export {
  MangaListOptions,
  MangaClientRepository
}