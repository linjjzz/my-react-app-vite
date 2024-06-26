import {
  ComponentConfType,
  componentConfGroup,
} from '@/components/questionComponents'
import { useComponentInfoStore } from '@/store/useComponentInfoStore'
import { Typography } from 'antd'
import { nanoid } from 'nanoid'
import React from 'react'

const { Title } = Typography

const ComponentLib = () => {
  const { addComponent } = useComponentInfoStore()

  const genComponent = (c: ComponentConfType) => {
    const { title, type, Component, defaultProps } = c

    const handleClick = () => {
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    }

    return (
      <div
        key={type}
        className="mb-[12px] cursor-pointer rounded border border-white bg-white p-[12px] hover:border-[#d9d9d9]"
        onClick={handleClick}
      >
        <div className=" pointer-events-none">
          <Component />
        </div>
      </div>
    )
  }
  return (
    <>
      {componentConfGroup.map((item, index) => {
        const { groupName, components } = item
        return (
          <div key={index}>
            <Title
              level={3}
              style={{ fontSize: '16px', marginTop: index ? '20px' : '0' }}
            >
              {groupName}
            </Title>
            <div>{components.map((c) => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
