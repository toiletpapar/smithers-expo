interface IMangaUpdate {
  chapter: number,
  chapterName: string | null,
  isRead: boolean,
  readAt: string,
  dateCreated: Date
}

class MangaUpdate {
  public data: IMangaUpdate

  constructor(data: IMangaUpdate) {
    this.data = data
  }

  static fromResponse (data: any) {
    return new MangaUpdate({
      chapter: data.chapter,
      chapterName: data.chapterName,
      isRead: data.isRead,
      readAt: data.readAt,
      dateCreated: new Date(data.dateCreated)
    })
  }
}

export {
  MangaUpdate,
  IMangaUpdate
}