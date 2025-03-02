import { AxiosInstance } from "axios";
import { ErrorResponse, SuccessResponse, userDetails } from "@/core/types";
import { AuthEntity } from "@/domain/entity/Auth_entity";
import { ContainerEntity } from "@/domain/entity/ContainerImage";
import { UserEntity } from "@/domain/entity/User_entity";

interface GetImageReturn<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface Api {
  _api: AxiosInstance;
  saveImagesContainer(
    container: ContainerEntity,
    userDetails: AuthEntity
  ): Promise<ImageSaveType>;

  loginWithEmailAndPasswordUser(
    userData: UserEntity
  ): Promise<SuccessResponse<AuthEntity> | ErrorResponse>;

  getImageContainer<T, P>(
    endpoint: string,
    param: P
  ): Promise<GetImageReturn<T>>;
}

export class ApiImpl implements Api {
  _api: AxiosInstance;

  constructor(axiosinstance: AxiosInstance) {
    this._api = axiosinstance;
  }

  async loginWithEmailAndPasswordUser(
    userData: userDetails
  ): Promise<SuccessResponse<AuthEntity> | ErrorResponse> {
    const Responce = await this._api
      .post(
        "/auth/yard_user_login",
        {
          email: userData.email,
          password: userData.password,
        },
        {
          headers: {
            "X-Powered-By": "Express",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        if (data.data.status === 0) {
          return {
            success: false,
            message: data.data.msg,
          };
        }
        return {
          success: true,
          data: {
            userID: data?.data?.user_data?.id ?? null,
            yardID: data?.data?.user_data?.yard_id ?? null,
          },
          message: data?.data?.msg ?? "No message",
        };
      })
      .catch((error) => {
        return { success: false, message: error.msg };
      });
    return Responce;
  }

  async saveImagesContainer(
    container: ContainerEntity,
    userDetails: AuthEntity
  ): Promise<ImageSaveType> {
    const formData = new FormData();
    formData.append("user_id", userDetails.userID);
    formData.append("container_no", container.containerNumber);
    formData.append("yard_id", userDetails.yardID);
    formData.append(
      "container_image_type",
      (container.type === "Pre"
        ? 1
        : container.type === "Post"
        ? 2
        : 3
      ).toString()
    );

    container.imageList.forEach(({ image }, index) => {
      formData.append(`file[${index}]`, {
        uri: image,
        type: "image/jpeg", // MIME type (e.g., image/jpeg, image/png)
        name: `image_${index}.jpg`,
      });
    });

    const response = await this._api
      .post("/auth/upload_container_image", formData, {
        headers: {
          "X-Powered-By": "Express",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((val) => {
        console.log(val.data);
        return {
          status: val.data.status,
          message: val.data.msg,
        };
      })
      .catch((error) => {
        console.log(error);
        return {
          status: error.data.status,
          message: error.data.msg,
        };
      });

    return response;
  }

  async getImageContainer<T, P>(
    endpoint: string,
    param: P
  ): Promise<GetImageReturn<T>> {
    const response = await this._api
      .post(endpoint, param, {
        headers: {
          "X-Powered-By": "Express",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        return {
          success: true,
          message: "Success",
          data: data.data.data,
        };
      })
      .catch((error) => {
        console.log(error);
        return {
          success: false,
          message: error.msg,
          data: null,
        };
      });

    return response;
  }
}
