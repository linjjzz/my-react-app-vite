import { type ComponentPropsType } from '@/components/questionComponents'
import { nanoid } from 'nanoid'
import { create } from 'zustand'
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
  chnageComponentHidden: (isNext?: boolean) => void
  chnageComponentLocked: () => void
  copyComponent: () => void
  pasteComponent: () => void
  selectPreComponent: () => void
  selectNextComponent: () => void
  editComponentTitle: (title: string) => void
}

export const useComponentInfoStore = create<ComponentStateType>((set) => ({
  componentList: [],
  selectedId: '',
  copiedComponent: null,
  changeSelectedId: (id: string) => set(() => ({ selectedId: id })),
  resetComponentInfo: (props: ComponentInfoType[]) =>
    set(() => {
      const selectedId = props?.[0]?.fe_id || ''
      return { componentList: props, selectedId: selectedId }
    }),
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
      const newSelectedId = getNextSelectedId(selectedId, componentList)
      return { componentList: newComponentList, selectedId: newSelectedId }
    }),
  chnageComponentHidden: (isNext = true) =>
    set((state) => {
      const { componentList, selectedId } = state
      const newComponentList = componentList.map((c) => {
        if (c.fe_id !== selectedId) return c
        return {
          ...c,
          isHidden: !c.isHidden,
        }
      })
      const newSelectedId = isNext
        ? getNextSelectedId(selectedId, componentList)
        : selectedId
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
  copyComponent: () =>
    set((state) => {
      const { componentList, selectedId } = state
      if (selectedId === '') return {}
      const copiedComponent = componentList.find(
        (c) => c.fe_id === selectedId,
      ) as ComponentInfoType
      return { copiedComponent: copiedComponent }
    }),
  pasteComponent: () =>
    set((state) => {
      const { copiedComponent, addComponent } = state
      if (copiedComponent == null) return {}
      let newCopiedComponent = { ...copiedComponent, fe_id: nanoid() }

      addComponent(newCopiedComponent)
      return { selectedId: newCopiedComponent.fe_id }
    }),
  selectPreComponent: () =>
    set((state) => {
      const { selectedId, componentList } = state
      const newComponentList = componentList.filter((c) => !c.isHidden)
      const index = newComponentList.findIndex((c) => c.fe_id === selectedId)
      if (index <= 0) return {}
      return { selectedId: newComponentList[index - 1].fe_id }
    }),
  selectNextComponent: () =>
    set((state) => {
      const { selectedId, componentList } = state
      const newComponentList = componentList.filter((c) => !c.isHidden)
      const index = newComponentList.findIndex((c) => c.fe_id === selectedId)
      if (index < 0 || index === newComponentList.length - 1) return {}
      return { selectedId: newComponentList[index + 1].fe_id }
    }),
  editComponentTitle: (title: string) =>
    set((state) => {
      const { componentList, selectedId } = state
      let newComponentList = componentList.map((c) => {
        if (c.fe_id !== selectedId) return c
        return {
          ...c,
          title: title,
        }
      })
      return { componentList: newComponentList }
    }),
}))
