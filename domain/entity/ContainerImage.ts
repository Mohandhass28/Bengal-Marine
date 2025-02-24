export type photoList = {
  id: number;
  image: string;
};

export interface ContainerEntity {
  containerNumber: string;
  imageList: photoList[];
  type: string;
  dateAndTime: Date;
}
