import { createSlice } from "@reduxjs/toolkit";

const filterReducer = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter: (state, action) => action.payload || "",
  },
});

export const { actions } = filterReducer;
export default filterReducer.reducer;
