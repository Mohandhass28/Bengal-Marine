import { create } from "zustand";
import { AxiosInstance } from "@/api";
import { ImageRepositoryImpl } from "@/data/repository/Images_Reopsitory_Impl";
import { LocalStorageImpl } from "@/data/source/local/local_storage";
import { Api, ApiImpl } from "@/data/source/network/api";
import { ContainerEntity } from "@/domain/entity/ContainerImage";
import { ImageReopsitery } from "@/domain/repository/Image_Repositery";
import { GetAllContainer } from "@/domain/usecase/getImage_Container";
import { supabase } from "@/lib/supabase";

interface ImagesContainerUsecasesType {
  containerUsecase: GetAllContainer;
  isLoadign: boolean;

  getImagesFromServer: (
    date: string,
    userId: string
  ) => Promise<ContainerEntity[]>;
}

const initialState: ImagesContainerUsecasesType = {
  containerUsecase: new GetAllContainer(
    new ImageRepositoryImpl(new LocalStorageImpl(), new ApiImpl(AxiosInstance))
  ),
  isLoadign: false,
  getImagesFromServer: function (
    date: string,
    userId: string
  ): Promise<ContainerEntity[]> {
    throw new Error("Function not implemented.");
  },
};

export const useImagesContainerUsecases = create<ImagesContainerUsecasesType>()(
  (set, get) => ({
    ...initialState,

    getImagesFromServer: async (date: string, userId: string) => {
      set((state) => ({ ...state, isLoadign: true }));
      const containerUsecase = get().containerUsecase;
      const data = await containerUsecase.getFromServer(date, userId);
      set((state) => ({ ...state, isLoadign: false }));
      return data;
    },
  })
);
