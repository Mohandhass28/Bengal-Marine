import { AuthEntity } from "../entity/Auth_entity";
import { ContainerEntity } from "../entity/ContainerImage";
import { LocalStorage } from "@/data/source/local/local_storage";
import { Api } from "@/data/source/network/api";

export interface ImageReopsitery {
  api: Api;
  localStorage: LocalStorage;
  getImagesFromLocal(): Promise<ContainerEntity[]>;

  saveImagesToLocal(container: ContainerEntity): Promise<boolean>;

  saveImagesToServer(
    containerNumber: string,
    userDetails: AuthEntity
  ): Promise<ImageSaveType>;

  getImageFromServer(date: string, userId: string): Promise<ContainerEntity[]>;
}
