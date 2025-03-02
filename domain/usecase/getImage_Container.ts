import { AuthEntity } from "../entity/Auth_entity";
import { ContainerEntity } from "../entity/ContainerImage";
import { ImageReopsitery } from "../repository/Image_Repositery";

export class GetAllContainer {
  repositery: ImageReopsitery;
  constructor(repositery: ImageReopsitery) {
    this.repositery = repositery;
  }

  async getFromLocal(): Promise<ContainerEntity[]> {
    return await this.repositery.getImagesFromLocal();
  }

  async saveToLocal(container: ContainerEntity): Promise<Boolean> {
    const status = await this.repositery.saveImagesToLocal(container);
    return status;
  }

  async saveToServer(
    containerNumber: string,
    userDetails: AuthEntity
  ): Promise<ImageSaveType> {
    if (userDetails.userID === null || userDetails.yardID == null) {
      return {
        message: "unable to save the image to server",
        status: 0,
      };
    }
    const value = await this.repositery.saveImagesToServer(
      containerNumber,
      userDetails
    );
    return value;
  }

  async getFromServer(
    date: string,
    userId: string
  ): Promise<ContainerEntity[]> {
    return await this.repositery.getImageFromServer(date, userId);
  }
}
