import { ContainerEntity, photoList } from "@/domain/entity/ContainerImage";

export class ContainerModle implements ContainerEntity {
  containerNumber: string;
  imageList: photoList[];
  type: string;
  dateAndTime: Date;

  constructor(
    containerNumber: string = "",
    images: photoList[] = [],
    type: string = "",
    dateAndTime: Date = new Date()
  ) {
    this.containerNumber = containerNumber;
    this.imageList = images;
    this.type = type;
    this.dateAndTime = dateAndTime;
  }

  static fromJson(jsonstr: string): ContainerEntity {
    return ContainerModle.fromMap(JSON.parse(jsonstr));
  }

  static fromMap(modelobj: ContainerEntity) {
    return new ContainerModle(
      modelobj.containerNumber,
      modelobj.imageList,
      modelobj.type,
      modelobj.dateAndTime
    );
  }

  toJson(): string {
    return JSON.stringify(this.toMap());
  }
  toMap(): Record<string, any> {
    return {
      containerNumber: this.containerNumber,
      imageList: this.imageList,
      type: this.type,
      dateAndTime: this.dateAndTime,
    };
  }

  get getcontainerNumber(): string {
    return this.containerNumber;
  }
  get getimageList(): photoList[] {
    return this.imageList;
  }
}
