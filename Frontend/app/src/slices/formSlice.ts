import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

interface FormType {
  name: string;
  id?: string;
  type: string;
  label: string;
}

type State = FormType[];
const initialState: State = [];

const slice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    intitFormField(state: State, action: PayloadAction<FormType>) {
      action.payload.id = action.payload.id || v4();
      state.push(action.payload);
    },

    removeFormField(state: State, action: PayloadAction<string>) {
      state.filter((field) => field.id !== action.payload);
    },
  },
});

export default slice.reducer;

export const { intitFormField, removeFormField } = slice.actions;
