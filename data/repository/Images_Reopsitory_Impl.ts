import { ContainerModle } from "../model/Container_Image_Model";
import { LocalStorage } from "../source/local/local_storage";
import { Api } from "../source/network/api";
import { AuthEntity } from "@/domain/entity/Auth_entity";
import { ContainerEntity } from "@/domain/entity/ContainerImage";
import { ImageReopsitery } from "@/domain/repository/Image_Repositery";

export class ImageRepositoryImpl implements ImageReopsitery {
  api: Api;
  localStorage: LocalStorage;
  constructor(localStorage: LocalStorage, api: Api) {
    this.localStorage = localStorage;
    this.api = api;
  }
  async getImageFromServer(
    date: string,
    userId: string
  ): Promise<ContainerEntity[]> {
    const response = await this.api.getImageContainer<
      ContainerEntity[],
      { date: string; user_id: string }
    >("/auth/userwise_container_image_list", { date, user_id: userId });
    let containers: ContainerModle[] = [];
    if (response.success) {
      const container = response as { data: any[] };
      containers = container.data.map((container) => {
        return ContainerModle.fromMap({
          containerNumber: container.cont_no,
          imageList:
            Array(container.container_info_image).length > 0
              ? container.container_info_image
              : [],
          dateAndTime: new Date(),
          type:
            Array(container.container_info_image).length > 0
              ? container.container_info_image[0].image_type
              : "",
        });
      });
    }
    return containers;
  }

  async getImagesFromLocal(): Promise<ContainerEntity[]> {
    return await this.localStorage.loadImageContainer();
  }

  async saveImagesToLocal(container: ContainerEntity): Promise<boolean> {
    const status = await this.localStorage.saveImagesContainer(container);
    return status;
  }

  async saveImagesToServer(
    containerNumber: string,
    userDetails: AuthEntity
  ): Promise<ImageSaveType> {
    let serverContainer: ContainerEntity | null = null;
    const containerLocalString = await this.localStorage.getContainerImages();
    if (containerLocalString.length === 0) {
      return {
        message: "unable to save the image to server",
        status: 0,
      };
    }

    let containers: ContainerEntity[] = JSON.parse(containerLocalString);

    containers = containers.filter((container) => {
      const containerObj = ContainerModle.fromMap(container);
      if (containerObj.containerNumber === containerNumber) {
        serverContainer = containerObj;
        return false;
      }
      return true;
    });
    if (serverContainer === null) {
      return {
        message: "unable to save the image to server",
        status: 0,
      };
    }

    const val = await this.api.saveImagesContainer(
      serverContainer,
      userDetails
    );

    if (val.status === 1) {
      const status = this.localStorage.saveStringContainerImage(
        JSON.stringify(containers)
      );

      if (!status) return status;
    }
    return val;
  }
}
