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
  ): Promise<boolean> {
    let serverContainer: ContainerEntity | null = null;
    const containerLocalString = await this.localStorage.getContainerImages();
    if (containerLocalString.length === 0) {
      return false;
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
      return false;
    }

    const val = await this.api.saveImagesContainer(
      serverContainer,
      userDetails
    );

    if (val) {
      const status = this.localStorage.saveStringContainerImage(
        JSON.stringify(containers)
      );

      if (!status) return status;
    }
    return val;
  }
}
