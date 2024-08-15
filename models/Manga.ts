interface IMangaUpdate {
  chapter: number,
  chapterName: string | null,
  isRead: boolean,
  readAt: string,
  dateCreated: Date
}

interface IManga {
  manga: {
    coverImage: Blob | null,
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

  static fromResponse (data: any) {
    return new Manga({
      manga: {
        name: data.crawler.name,
        favourite: data.crawler.favourite,
        url: data.crawler.url,
        adapter: data.crawler.adapter,
        crawlSuccess: data.crawler.crawlSuccess,
        coverImage: null,
        coverFormat: data.crawler.coverFormat
      },
      mangaUpdates: data.mangaUpdates.map((update: any) => {
        return {
          chapter: update.chapter,
          chapterName: update.chapterName,
          isRead: update.isRead,
          readAt: update.readAt,
          dateCreated: new Date(update.dateCreated)
        }
      })
    })
  }

  getLatestChapter() {
    
  }
}

export {
  Manga,
  IManga
}