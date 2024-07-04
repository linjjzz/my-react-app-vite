import { FC } from 'react'
import QuestionCheckboxConf, {
  QuestionCheckboxPropsType,
} from './questionCheckbox'
import QuestionInfoConf, { QuestionInfoPropsType } from './questionInfo'
import QuestionInputConf, { QuestionInputPropsType } from './questionInput'
import QuestionParagraphConf, {
  QuestionParagraphPropsType,
} from './questionParagraph'
import QuestionRadioConf, { QuestionRadioPropsType } from './questionRadio'
import QuestionTextAreaConf, {
  QuestionTextAreaPropsType,
} from './questionTextArea'
import QuestionTitleConf, { QuestionTitlePropsType } from './questionTitle'

export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextAreaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType

export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropsComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部的组件配置列表
export const componentConfList: ComponentConfType[] = [
  QuestionInfoConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInputConf,
  QuestionTextAreaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
]

// 组件分组
export const componentConfGroup = [
  {
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextAreaConf],
  },
  {
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
]

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type)
}
