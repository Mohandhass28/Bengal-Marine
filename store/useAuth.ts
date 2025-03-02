import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { create } from "zustand";
import { AuthEntity } from "../domain/entity/Auth_entity";
import { AxiosInstance } from "@/api";
import { SuccessResponse, userDetails } from "@/core/types";
import { AuthRepositeryImpl } from "@/data/repository/Auth_Repositery_Impl";
import { LocalStorageImpl } from "@/data/source/local/local_storage";
import { ApiImpl } from "@/data/source/network/api";
import { Authusecase } from "@/domain/usecase/AuthUsecase";

type initType = {
  authusecase: Authusecase;
  user?: AuthEntity;
  status?: boolean;
  error: string;
  Authlogin?: (userData: userDetails) => Promise<string>;
  AuthCheck?: () => Promise<boolean>;
  AuthLogout: () => Promise<void>;
};

const initialState: initType = {
  authusecase: new Authusecase(
    new AuthRepositeryImpl(new ApiImpl(AxiosInstance), new LocalStorageImpl())
  ),
  error: "",
  AuthLogout: async (): Promise<void> => {},
};

export const useAuthStore = create<initType>()((set, get) => ({
  ...initialState,
  Authlogin: async (userData: userDetails): Promise<string> => {
    const authusecase = get().authusecase;
    const loginState = await authusecase.login(userData);
    if (!loginState.success) {
      // set((state) => {
      //   return {
      //     ...state,
      //     error: loginState.message,
      //   };
      // });
      return loginState.message;
    }
    set((state) => {
      return {
        ...state,
        user: (loginState as SuccessResponse<AuthEntity>).data,
        status: loginState.success,
      };
    });
    return loginState.message;
  },
  AuthCheck: async () => {
    const authusecase = get().authusecase;

    const data = await authusecase.authCheck();

    if (!data.success) {
      set((state) => {
        return {
          ...state,
          error: data.message,
          status: data.success,
        };
      });
      return false;
    }

    set((state) => {
      return {
        ...state,
        user: (data as SuccessResponse<AuthEntity>).data,
        status: data.success,
      };
    });
    return true;
  },
  AuthLogout: async (): Promise<void> => {
    await AsyncStorage.removeItem("login");
    set((state) => {
      return { ...state, status: false, user: undefined };
    });
    router.dismissAll();
    router.replace("/auth");
  },
}));
