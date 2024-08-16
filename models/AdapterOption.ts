interface AdapterOption {
  label: string
  value: string
}

const adapterOptions: AdapterOption[] = [
  {
    label: 'Webtoon',
    value: 'webtoon'
  },
  {
    label: 'Mangadex',
    value: 'mangadex'
  }
]

const getAdapterOption = (value: string): AdapterOption | undefined => {
  return adapterOptions.find((option) => option.value === value)
}

export {
  AdapterOption,
  adapterOptions,
  getAdapterOption
}