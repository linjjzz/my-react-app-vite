import { type ComponentPropsType } from '@/components/questionComponents'
import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { getNextSelectedId } from './utils'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden: boolean
  isLocked: boolean
  props: ComponentPropsType
}

export type ComponentStateType = {
  componentList: ComponentInfoType[]
  selectedId: string
  copiedComponent: ComponentInfoType | null
  resetComponentInfo: (props: ComponentInfoType[]) => void
  changeSelectedId: (id: string) => void
  addComponent: (newComponent: ComponentInfoType) => void
  editComponent: (newComponent: ComponentPropsType) => void
  removeComponent: () => void
  chnageComponentHidden: () => void
  chnageComponentLocked: () => void
  copyComponent: () => void
  pasteComponent: () => void
}

export const useComponentInfoStore = create<ComponentStateType>((set) => ({
  componentList: [],
  selectedId: '',
  copiedComponent: null,
  resetComponentInfo: (props: ComponentInfoType[]) =>
    set(() => {
      const selectedId = props?.[0]?.fe_id || ''
      return { componentList: props, selectedId: selectedId }
    }),
  changeSelectedId: (id: string) => set(() => ({ selectedId: id })),
  addComponent: (newComponent: ComponentInfoType) =>
    set((state) => {
      const { selectedId, componentList } = state
      const index = componentList.findIndex((c) => c.fe_id === selectedId)
      let newComponentList: ComponentInfoType[] = []
      if (index === -1) {
        // 未选中组件
        newComponentList = [...componentList, newComponent]
      } else {
        newComponentList = [
          ...componentList.slice(0, index + 1),
          newComponent,
          ...componentList.slice(index + 1),
        ]
      }

      return { componentList: newComponentList, selectedId: newComponent.fe_id }
    }),
  editComponent: (newProps: ComponentPropsType) =>
    set((state) => {
      const { componentList, selectedId } = state
      let newComponentList = componentList.map((c) => {
        if (c.fe_id !== selectedId) return c
        return {
          ...c,
          props: {
            ...c.props,
            ...newProps,
          },
        }
      })

      return { componentList: newComponentList }
    }),
  removeComponent: () =>
    set((state) => {
      const { componentList, selectedId } = state
      const newComponentList = componentList.filter(
        (c) => c.fe_id !== selectedId,
      )
      const newSelectedId = getNextSelectedId(
        selectedId,
        componentList,
      )
      return { componentList: newComponentList, selectedId: newSelectedId }
    }),
  chnageComponentHidden: () =>
    set((state) => {
      const { componentList, selectedId } = state
      const newComponentList = componentList.map((c) => {
        if (c.fe_id !== selectedId) return c
        return {
          ...c,
          isHidden: !c.isHidden,
        }
      })
      const newSelectedId = getNextSelectedId(
        selectedId,
        componentList,
      )
      return { componentList: newComponentList, selectedId: newSelectedId }
    }),
  chnageComponentLocked: () =>
    set((state) => {
      const { componentList, selectedId } = state
      const newComponentList = componentList.map((c) => {
        if (c.fe_id !== selectedId) return c
        return {
          ...c,
          isLocked: !c.isLocked,
        }
      })
      return { componentList: newComponentList }
    }),
  copyComponent: () => set((state) => {
    const { componentList, selectedId } = state
    if (selectedId === '') return state
    const copiedComponent = componentList.find((c) => c.fe_id === selectedId) as ComponentInfoType
    return { copiedComponent: copiedComponent }
  }),
  pasteComponent: () => set((state) => {
    const { copiedComponent, addComponent } = state
    if (copiedComponent == null) return state
    let newCopiedComponent = { ...copiedComponent, fe_id: nanoid() }

    addComponent(newCopiedComponent)
    return { selectedId: newCopiedComponent.fe_id }
  })
}))
