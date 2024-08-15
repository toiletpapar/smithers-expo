interface ICondensedMangaResult {
  name: string,
  url: string,
  adapter: string
}

class CondensedMangaResult {
  public data: ICondensedMangaResult

  constructor(data: ICondensedMangaResult) {
    this.data = data
  }

  static fromResponse (data: any) {
    return new CondensedMangaResult({
      name: data.name,
      url: data.url,
      adapter: data.adapter
    })
  }
}

export {
  CondensedMangaResult,
  ICondensedMangaResult
}