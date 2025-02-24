import { LocalStorage } from "../../data/source/local/local_storage";
import { AuthEntity } from "../entity/Auth_entity";
import { ErrorResponse, SuccessResponse, userDetails } from "@/core/types";
import { Api } from "@/data/source/network/api";

export interface AuthRepositery {
  api: Api;
  localStorage: LocalStorage;

  loginUser(
    userData: userDetails
  ): Promise<SuccessResponse<AuthEntity> | ErrorResponse>;

  authCheckUser(): Promise<SuccessResponse<AuthEntity> | ErrorResponse>;
}
