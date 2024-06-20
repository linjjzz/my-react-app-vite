import React from "react";
import { ResDataType, http } from "./http";

// 列表
export async function getQuestionListService(opt: Partial<searchOption>): Promise<questionData> {
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
export async function editQuestionService(id: string, opt: ResDataType): Promise<ResDataType> {
  const data = await http.patch<ResDataType>(`/api/question/${id}`, opt)
  return data
}

// 批量恢复
export async function recoverQuestionService(ids: React.Key[]): Promise<ResDataType> {
  const data = await http.patch<ResDataType>(`/api/question`, ids)
  return data
}

// 批量删除
export async function deleteQuestionService(ids: React.Key[]): Promise<ResDataType> {
  const data = await http.delete<ResDataType>(`/api/question`, { data: ids })
  return data
}

// 复制
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const data = await http.post<ResDataType>(`/api/question/duplicate/${id}`)
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
  id: string;
  title: string;
  isPublished: boolean;
  isStar?: boolean;
  answerCount: number;
  createAt: string;
};