import { AuthModel } from "../model/auth_model";
import { LocalStorage } from "../source/local/local_storage";
import { Api } from "../source/network/api";
import { ErrorResponse, SuccessResponse, userDetails } from "@/core/types";
import { AuthEntity } from "@/domain/entity/Auth_entity";
import { AuthRepositery } from "@/domain/repository/Auth_Reopsitery";

export class AuthRepositeryImpl implements AuthRepositery {
  api: Api;
  localStorage: LocalStorage;

  constructor(api: Api, localStorage: LocalStorage) {
    this.api = api;
    this.localStorage = localStorage;
  }

  async loginUser(
    userData: userDetails
  ): Promise<SuccessResponse<AuthEntity> | ErrorResponse> {
    const Data = await this.api.loginWithEmailAndPasswordUser(userData);

    if (!Data.success) {
      return {
        message: Data.message,
        success: Data.success,
      };
    }

    const Model = new AuthModel(
      (Data as SuccessResponse<AuthEntity>).data.userID,
      (Data as SuccessResponse<AuthEntity>).data.yardID
    );
    await this.localStorage.saveAuthValueToLocal(Model.toJson());

    return {
      data: Model,
      message: "Login Success",
      success: true,
    };
  }

  async authCheckUser(): Promise<SuccessResponse<AuthEntity> | ErrorResponse> {
    const userDataFromLocal = await this.localStorage.getAuthValueToLocal(
      "login"
    );
    if (userDataFromLocal === null || userDataFromLocal.length === 0) {
      return {
        success: false,
        message: "",
      };
    }

    const Model = AuthModel.fromJson(userDataFromLocal);

    return {
      data: Model,
      success: true,
      message: "",
    };
  }
}
