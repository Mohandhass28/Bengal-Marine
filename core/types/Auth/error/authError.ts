import { BaseResponse } from "../success/authSuccess";

export interface ErrorResponse extends BaseResponse {
  success: boolean;
  message: string;
}
