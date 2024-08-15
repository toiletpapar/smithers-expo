import { IMangaUpdate, MangaUpdate } from "./MangaUpdate"

interface IManga {
  manga: {
    crawlTargetId: number,
    coverFormat: string | null,
    name: string,
    favourite: boolean,
    url: string,
    adapter: string,
    crawlSuccess: boolean | null
  }
  mangaUpdates: IMangaUpdate[]
}

class Manga {
  public data: IManga

  constructor(data: IManga) {
    this.data = data
  }

  static fromResponse (data: any): Manga {
    return new Manga({
      manga: {
        crawlTargetId: data.crawler.crawlTargetId,
        name: data.crawler.name,
        favourite: data.crawler.favourite,
        url: data.crawler.url,
        adapter: data.crawler.adapter,
        crawlSuccess: data.crawler.crawlSuccess,
        coverFormat: data.crawler.coverFormat
      },
      mangaUpdates: data.mangaUpdates.map((update: any) => {
        return MangaUpdate.fromResponse(update).data
      })
    })
  }

  getLatestChapter(): MangaUpdate | null {
    const mangaUpdate = this.data.mangaUpdates.slice().sort((a, b) => {
      if (a.dateCreated.valueOf() < b.dateCreated.valueOf()) {
        return 1
      } else if (a.dateCreated.valueOf() > b.dateCreated.valueOf()) {
        return -1
      } else {
        return 0
      }
    })[0]

    return mangaUpdate ? new MangaUpdate(mangaUpdate) : null
  }
}

export {
  Manga,
  IManga
}