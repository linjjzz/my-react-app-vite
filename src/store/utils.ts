import { ComponentInfoType } from './useComponentInfoStore'

export const getNextSelectedId = (
  fe_id: string,
  componentList: ComponentInfoType[],
) => {
  let newComponentList = componentList.filter((c) => !c.isHidden)
  const index = newComponentList.findIndex((c) => c.fe_id == fe_id)
  if (index < 0) return ''
  let newSelectedId = ''
  if (newComponentList.length <= 1) {
    newSelectedId = ''
  } else {
    if (index + 1 === newComponentList.length) {
      newSelectedId = newComponentList[index - 1].fe_id
    } else {
      newSelectedId = newComponentList[index + 1].fe_id
    }
  }
  return newSelectedId
}
