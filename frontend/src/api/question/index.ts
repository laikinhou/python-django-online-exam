/* eslint-disable arrow-body-style */
import http from '@/utils/http/index';
import {
  PageList,
  QuestionList,
  SearchPageSize,
  QuestionCategory,
  QuestionLevel,
  QuestionType,
  QuestionOption,
} from '@/types/common';

/**
 * 获取题目列表
 */

const getQuestionListApi = async (pageParam: SearchPageSize): Promise<PageList<QuestionList>> => {
  return http.get<PageList<QuestionList>>({ url: '/api/question/question/', params: pageParam });
};

/**
 * 获取题目分类
 */
const getQuestionCategoryApi = async (): Promise<QuestionCategory[]> => {
  return http.get<QuestionCategory[]>({ url: '/api/question/category/' });
};

/**
 * 获取题目难度
 */
const getQuestionLevelApi = async (): Promise<QuestionLevel[]> => {
  return http.get<QuestionLevel[]>({ url: '/api/question/level/' });
};

/**
 * 获取题目类型
 */
const getQuestionTypeApi = async (): Promise<QuestionType[]> => {
  return http.get<QuestionType[]>({ url: '/api/question/type/' });
};

/**
 * 获取选项列表
 */
const getOptionListApi = async (pageParam: SearchPageSize): Promise<PageList<QuestionOption>> => {
  return http.get<PageList<QuestionOption>>({ url: '/api/question/option/', params: pageParam });
};

/**
 * 删除题目
 */
const deleteQuestionApi = async (id: number): Promise<void> => {
  return http.delete<void>({ url: `/api/question/question/${id}/` });
};

/**
 * 更新题目
 */
const updateQuestionApi = async (id: number, data: QuestionList): Promise<void> => {
  return http.patch<void>({ url: `/api/question/question/${id}/`, data });
};

/**
 * 新增题目
 */
const createQuestionApi = async (data: QuestionList): Promise<void> => {
  return http.post<void>({ url: '/api/question/question/', data });
};

export {
  getQuestionListApi,
  getQuestionCategoryApi,
  getQuestionLevelApi,
  getQuestionTypeApi,
  deleteQuestionApi,
  updateQuestionApi,
  createQuestionApi,
  getOptionListApi,
};
