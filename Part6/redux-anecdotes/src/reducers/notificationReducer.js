import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotifications: (state, action) => action.payload,
    removeNotification: (state) => "",
  },
})

export const setNotification = (text, time) => {
  return (dispatch) => {
    clearTimeout(window.notificationTimeout)
    dispatch(setNotifications(text))
    window.notificationTimeout = setTimeout(() => {
      dispatch(removeNotification())
    }, time)
  }
}

export const { setNotifications, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer