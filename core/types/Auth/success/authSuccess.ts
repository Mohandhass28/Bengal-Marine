export interface BaseResponse {
  success: boolean;
  message: string;
}
export interface SuccessResponse<T> extends BaseResponse {
  success: boolean;
  data: T;
  message: string;
}
