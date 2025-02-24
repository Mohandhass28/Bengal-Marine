import { AuthEntity } from "../entity/Auth_entity";
import { AuthRepositery } from "../repository/Auth_Reopsitery";
import { ErrorResponse, SuccessResponse, userDetails } from "@/core/types";

export class Authusecase {
  private _repositrey: AuthRepositery;

  constructor(repositrey: AuthRepositery) {
    this._repositrey = repositrey;
  }

  async login(
    userData: userDetails
  ): Promise<SuccessResponse<AuthEntity> | ErrorResponse> {
    return await this._repositrey.loginUser(userData);
  }

  async authCheck(): Promise<SuccessResponse<AuthEntity> | ErrorResponse> {
    return await this._repositrey.authCheckUser();
  }
}
