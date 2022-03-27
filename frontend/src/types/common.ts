export interface QuestionList {
  id?: number;
  content: string;
  description: string;
  level_tag: string;
  type_tag: string;
  category_tag: string;
  update_time?: string;
  creator?: string;
  option_ids?: number[];
  anser_ids?: number[];
}

export interface QuestionCategory {
  id: number;
  name: string;
  tag: string;
  description: string;
}

export interface QuestionLevel {
  id: number;
  name: string;
  tag: string;
  description: string;
}

export interface QuestionType {
  id: number;
  name: string;
  tag: string;
  description: string;
}

export interface QuestionOption {
  id: number;
  content: string;
  description: string;
}

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

export interface PageList<T> {
  cout: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface UserInfo {
  username: string;
  email: string;
  nickname: string;
  avatar: string;
  description: string;
  telephone: string;
}

export interface SearchPageSize {
  pageNo: number;
  pageSize: number;
  search?: string;
  ordering?: string;
  [key: string]: string | number | undefined;
}

export interface RuleInfo {
  required: boolean;
  message: string;
  trigger: string;
}

export interface FormRule {
  [key: string]: RuleInfo[];
}

export interface SelectOption {
  value: string;
  label: string;
}
