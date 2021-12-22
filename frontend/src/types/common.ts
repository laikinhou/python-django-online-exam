export interface ExamList {
  id: number;
  name: string;
  avatar: string;
  description: string;
  score: number;
  limit_time: number;
  start_date?: string;
  end_date?: string;
}
