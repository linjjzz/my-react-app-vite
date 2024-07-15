import React from 'react'
import { ResDataType, http } from './http'

// 问卷
// 列表
export async function getQuestionListService(
  opt: Partial<searchOption>,
): Promise<questionData> {
  const data = await http.get<questionData>(`/api/question`, { params: opt })
  return data
}

// 详情
export async function getQuestionService(id: string): Promise<ResDataType> {
  const data = await http.get<ResDataType>(`/api/question/${id}`)
  return data
}

// 创建
export async function createQuestionService(): Promise<ResDataType> {
  const data = await http.post<ResDataType>(`/api/question`)
  return data
}

// 修改
export async function editQuestionService(
  id: string,
  opt: ResDataType,
): Promise<ResDataType> {
  const data = await http.patch<ResDataType>(`/api/question/${id}`, opt)
  return data
}

// 批量恢复
export async function recoverQuestionService(
  ids: React.Key[],
): Promise<ResDataType> {
  const data = await http.patch<ResDataType>(`/api/question`, ids)
  return data
}

// 批量删除
export async function deleteQuestionService(
  ids: React.Key[],
): Promise<ResDataType> {
  const data = await http.delete<ResDataType>(`/api/question`, { data: ids })
  return data
}

// 复制
export async function duplicateQuestionService(
  id: string,
): Promise<ResDataType> {
  const data = await http.post<ResDataType>(`/api/question/duplicate/${id}`)
  return data
}

// 用户
// 用户信息
// 复制
export async function getUserInfoService(): Promise<ResDataType> {
  const data = await http.get<ResDataType>(`/api/user/info`)
  return data
}

// 登录
export async function loginService(body: loginInfo): Promise<ResDataType> {
  const data = await http.post<ResDataType>(`/api/user/login`, body)
  return data
}

// 注册
export async function registService(body: registInfo): Promise<ResDataType> {
  const data = await http.post<ResDataType>(`/api/user/register`, body)
  return data
}

// 统计
//
export async function getQuestionStatListService(
  questionId: string,
  opt: { page: number; pageSize: number },
): Promise<ResDataType> {
  const data = await http.get<ResDataType>(`/api/stat/${questionId}`, {
    params: opt,
  })
  return data
}

export async function getComponentStatService(
  questionId: string,
  componentId: string,
): Promise<ResDataType> {
  const data = await http.get<ResDataType>(
    `/api/stat/${questionId}/${componentId}`,
  )
  return data
}

// type
export type searchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

export type questionData = {
  list: ListType[]
  total: number
}

export type ListType = {
  id: string
  title: string
  isPublished: boolean
  isStar?: boolean
  answerCount: number
  createAt: string
}

export type loginInfo = {
  username: string
  password: string
}

export type registInfo = {
  username: string
  password: string
  nickname: string
}
