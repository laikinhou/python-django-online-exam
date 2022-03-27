/* eslint-disable arrow-body-style */
import http from '@/utils/http/index';
import { PageList, ExamList, SearchPageSize } from '@/types/common';

/**
 * 登录
 */

const getExamListApi = async (pageParam: SearchPageSize): Promise<PageList<ExamList>> => {
  return http.get<PageList<ExamList>>({ url: '/api/exam/exam/', params: pageParam });
};

export default getExamListApi;
