import { photosAndType } from "../containerImageSlice";

export const addImage = (
  state: photosAndType,
  action: {
    payload: {
      image: string;
    };
  }
) => {
  state.Images = [
    ...state.Images,
    { id: state.Images.length + 1, image: action.payload.image },
  ];
};

export const removeImage = (
  state: photosAndType,
  action: {
    payload: {
      id: number;
    };
  }
) => {
  state.Images = state.Images.filter((image) => image.id !== action.payload.id);
};

export const restAll = (state: photosAndType) => {
  state.Images = [];
  state.type = "";
};

export const setType = (
  state: photosAndType,
  action: { payload: { type: string } }
) => {
  state.type = action.payload.type;
};

export const reducers = { addImage, removeImage, restAll, setType };
