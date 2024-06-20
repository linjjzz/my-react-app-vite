import { ResDataType, http } from "./http";

export async function getQuestionListService(opt: Partial<searchOption>): Promise<questionData> {
  const data = await http.get<questionData>(`/api/question`, { params: opt })
  return data
}

export async function getQuestionService(id: string): Promise<ResDataType> {
  const data = await http.get<ResDataType>(`/api/question/${id}`)
  return data
}

export async function createQuestionService(): Promise<ResDataType> {
  const data = await http.post<ResDataType>(`/api/question`)
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