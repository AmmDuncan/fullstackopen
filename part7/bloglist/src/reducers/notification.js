import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {body: '', error: false},
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearMessage() {
      return {body: '', error: false}
    }
  }
})

const setNotification = (message, timeout = 5000) => {
  return dispatch => {
    dispatch(notificationSlice.actions.setMessage(message))
    clearTimeout(window.timeout)
    window.timeout = setTimeout(() => {
      dispatch(notificationSlice.actions.clearMessage())
    }, timeout)
  }
}

export const actions = {
  ...notificationSlice.actions,
  setNotification
}

export default notificationSlice.reducer;
