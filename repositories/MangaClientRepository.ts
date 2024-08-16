import { Manga } from "@/models/Manga"
import { CondensedMangaResult } from "@/models/CondensedMangaResult"
import axios from "axios"

interface MangaListOptions {
  onlyLatest: boolean
}

namespace MangaClientRepository {
  export const get = async (crawlTargetId: string) => {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/crawl-targets/${crawlTargetId}`, {
      params: {
        projectImage: false
      }
    })
    const crawler = CondensedMangaResult.fromResponse(response.data)
    return crawler
  }

  export const search = async (query: string, userId: number, page: number, source: string) => {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/crawl-targets/search`, {
      params: {
        query,
        userId,
        page,
        source
      }
    })
    const searchResults = (response.data as any[]).map((data: any) => CondensedMangaResult.fromResponse(data))
    return searchResults
  }

  export const list = async (options: MangaListOptions): Promise<Manga[]> => {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/manga`)
    const manga = (response.data as any[]).map((data: any) => Manga.fromResponse(data))
    return manga
  }

  export const create = async (crawler: CondensedMangaResult): Promise<void> => {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/crawl-targets`, {
      name: crawler.data.name,
      adapter: crawler.data.adapter,
      url: crawler.data.url
    })
    
    return
  }

  export const update = async (crawlTargetId: number, crawler: CondensedMangaResult): Promise<void> => {
    const response = await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/crawl-targets/${crawlTargetId}`, {
      data: {
        name: crawler.data.name,
        adapter: crawler.data.adapter,
        url: crawler.data.url
      },
      properties: ['name', 'adapter', 'url']
    })
    
    return
  }

  export const updateFavourite = async (crawlTargetId: number, favourite: boolean): Promise<void> => {
    const response = await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/crawl-targets/${crawlTargetId}/favourite`, {
      data: {
        favourite
      },
      properties: ['favourite']
    })
    
    return
  }

  export const sync = async(crawlTargetId: number): Promise<void> => {
    await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/manga/${crawlTargetId}`)

    return
  }
}

export {
  MangaListOptions,
  MangaClientRepository
}