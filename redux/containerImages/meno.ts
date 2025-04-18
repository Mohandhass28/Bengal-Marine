import { createSelector } from "@reduxjs/toolkit";
import { Rootstate } from "../store";

const selectphotosandType = (state: Rootstate) => state.photos;

export const selectphotos = createSelector(
  [selectphotosandType],
  (photosandType) => photosandType.Images
);

export const selectType = createSelector(
  [selectphotosandType],
  (photosandType) => photosandType.type
);
