import { type ComponentPropsType } from '@/components/questionComponents'
import { create } from 'zustand'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentStateType = {
  componentList: ComponentInfoType[]
  selectedId: string
  resetComponentInfo: (props: ComponentInfoType[]) => void
  changeSelectedId: (id: string) => void
  addComponent: (newComponent: ComponentInfoType) => void
  editComponent: (newComponent: ComponentPropsType) => void
}

export const useComponentInfoStore = create<ComponentStateType>((set) => ({
  componentList: [],
  selectedId: '',
  resetComponentInfo: (props: ComponentInfoType[]) =>
    set(() => ({ componentList: props })),
  changeSelectedId: (id: string) => set(() => ({ selectedId: id })),
  addComponent: (newComponent: ComponentInfoType) =>
    set((state) => {
      const { selectedId } = state
      const index = state.componentList.findIndex((c) => c.fe_id === selectedId)
      let newComponentList: ComponentInfoType[] = []
      if (index === -1) {
        // 未选中组件
        newComponentList = [...state.componentList, newComponent]
      } else {
        newComponentList = [
          ...state.componentList.slice(0, index + 1),
          newComponent,
          ...state.componentList.slice(index + 1),
        ]
      }

      return { componentList: newComponentList, selectedId: newComponent.fe_id }
    }),
  editComponent: (newProps: ComponentPropsType) =>
    set((state) => {
      const { componentList, selectedId } = state
      let newComponentList = componentList.map((c) => {
        if (c.fe_id === selectedId) {
          return {
            ...c,
            props: {
              ...c.props,
              ...newProps,
            },
          }
        } else {
          return { ...c }
        }
      })

      return { componentList: newComponentList }
    }),
}))
