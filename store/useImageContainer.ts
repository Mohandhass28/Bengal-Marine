import { create } from "zustand";
import { AxiosInstance } from "@/api";
import { ImageRepositoryImpl } from "@/data/repository/Images_Reopsitory_Impl";
import { LocalStorageImpl } from "@/data/source/local/local_storage";
import { Api, ApiImpl } from "@/data/source/network/api";
import { ImageReopsitery } from "@/domain/repository/Image_Repositery";
import { GetAllContainer } from "@/domain/usecase/getImage_Container";
import { supabase } from "@/lib/supabase";

interface ImagesContainerUsecasesType {
  containerUsecase: GetAllContainer;
}

const initialState: ImagesContainerUsecasesType = {
  containerUsecase: new GetAllContainer(
    new ImageRepositoryImpl(new LocalStorageImpl(), new ApiImpl(AxiosInstance))
  ),
};

export const useImagesContainerUsecases = create<ImagesContainerUsecasesType>()(
  (set, get) => ({
    ...initialState,
  })
);
