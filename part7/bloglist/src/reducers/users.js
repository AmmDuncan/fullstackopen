import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userService from '../services/user'

const fetchAll = createAsyncThunk(
  'users/fetchALl',
  () => userService.getAll()
)

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchAll.fulfilled,
      (state, action) => action.payload
    )
  }
})

export const actions = {
  ...usersSlice.actions,
  fetchAll
}
export default usersSlice.reducer;
