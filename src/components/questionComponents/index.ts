import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './questionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './questionTitle'

export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropsComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部的组件配置列表
export const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
]

// 组件分组
export const componentConfGroup = [
  {
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
]

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type)
}
