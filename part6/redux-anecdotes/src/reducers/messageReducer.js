import { createSlice } from "@reduxjs/toolkit";

const messageReducer = createSlice({
  name: "message",
  initialState: "",
  reducers: {
    setMessage(state, action) {
      return action.payload.message || "";
    },
    clearMessage() {
      return "";
    },
  },
});

const setNotification = (message, timeout = 5000) => {
  return (dispatch, getState) => {
    dispatch(messageReducer.actions.setMessage({ message }));
    clearTimeout(window.timeout);
    window.timeout = setTimeout(() => {
      dispatch(messageReducer.actions.clearMessage());
    }, timeout);
  };
};

export const actions = { ...messageReducer.actions, setNotification };
export default messageReducer.reducer;
