import { create } from 'zustand'

export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
}

export type PageStateType = {
  pageInfo: PageInfoType
  resetPageInfo: (props: PageInfoType) => void
}

export const usePageInfoStore = create<PageStateType>((set) => ({
  pageInfo: {
    title: '',
    desc: '',
    js: '',
    css: '',
    isPublished: false,
  },
  resetPageInfo: (props: PageInfoType) =>
    set(() => {
      return { pageInfo: props }
    }),
}))
