import http from '@/utils/http/index';
import { ExamList } from '@/types/common';

/**
 * 登录
 */

const getExamListApi = async (): Promise<ExamList[]> => http.get<ExamList[]>({ url: '/api/exam/exam/' });

export default getExamListApi;
