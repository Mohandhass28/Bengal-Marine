import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { ContainerModle } from "@/data/model/Container_Image_Model";
import { ContainerEntity, photoList } from "@/domain/entity/ContainerImage";

export interface LocalStorage {
  loaclstorage: typeof AsyncStorage;

  saveImagesContainer(container: ContainerEntity): Promise<boolean>;

  loadImageContainer(): Promise<ContainerEntity[]>;

  saveAuthValueToLocal(value: string): Promise<void>;
  getAuthValueToLocal(name: string): Promise<string | null>;

  saveStringContainerImage(containerImages: string): Promise<boolean>;

  getContainerImages(): Promise<string>;
}

export class LocalStorageImpl implements LocalStorage {
  loaclstorage: typeof AsyncStorage;

  constructor() {
    this.loaclstorage = AsyncStorage;
  }

  async saveImagesContainer(container: ContainerEntity): Promise<boolean> {
    try {
      let DataContainer: ContainerEntity[] = [];
      const previceContainer = await this.loaclstorage.getItem("container");
      if (container.containerNumber === "") {
        Alert.alert("Faild", "Please Enter Container Number");
        return false;
      }
      if (container.imageList.length === 0) {
        // Alert.alert("Faild", "Please Enter Container Number");
        return false;
      }
      if (previceContainer !== null && previceContainer.length > 0) {
        const previceContainerdata = JSON.parse(previceContainer);
        let containerIdAlreadyThere = false;
        previceContainerdata.map((prvObject: ContainerEntity) => {
          if (prvObject.containerNumber === container.containerNumber) {
            containerIdAlreadyThere = true;
            return false;
          }
          DataContainer.push(prvObject);
        });
        if (containerIdAlreadyThere) {
          Alert.alert("Failed", "Container ID has already exists");
          return false;
        }
      }

      DataContainer = [
        ...DataContainer,
        {
          containerNumber: container.containerNumber,
          type: container.type,
          imageList: container.imageList,
          dateAndTime: new Date(),
        },
      ];

      const StringifyData = JSON.stringify(DataContainer);

      await this.loaclstorage.setItem("container", StringifyData);
      return true;
    } catch (error) {
      Alert.alert("Failed", "Unable to save in Local Storage");
      return false;
    }
  }

  async loadImageContainer(): Promise<ContainerEntity[]> {
    try {
      let localData: ContainerEntity[] = [];
      let stringStoredData = await this.loaclstorage.getItem("container");

      if (stringStoredData != null) {
        let objectStoredData = JSON.parse(stringStoredData);
        objectStoredData.map((data: ContainerEntity) => {
          localData.push(
            new ContainerModle(
              data.containerNumber,
              data.imageList,
              data.type,
              data.dateAndTime
            )
          );
        });
      }
      return localData;
    } catch (error) {
      return [];
    }
  }
  static async RemoveAllImageContainer(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      return false;
    }
  }

  async saveAuthValueToLocal(value: string): Promise<void> {
    await this.loaclstorage.setItem("login", value);
  }
  async getAuthValueToLocal(name: string): Promise<string | null> {
    return await this.loaclstorage.getItem(name);
  }

  async saveStringContainerImage(containerImages: string): Promise<boolean> {
    if (containerImages.length === 0) {
      return false;
    }
    await this.loaclstorage.setItem("container", containerImages);
    return true;
  }
  async getContainerImages(): Promise<string> {
    let stringStoredData = await this.loaclstorage.getItem("container");
    if (stringStoredData === null) {
      return "";
    }
    return stringStoredData;
  }
}
