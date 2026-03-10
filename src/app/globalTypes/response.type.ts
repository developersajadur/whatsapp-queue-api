export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage?: number;
};

export type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: TMeta;
};
