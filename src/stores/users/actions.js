import { axiosInstance } from "boot/axios";

const getAllUsers = (state) => {
  axiosInstance.get('users/').then(response => {
    state.users = response.data
  }).catch(() => {
    // pass error
  })
}

export {
  getAllUsers
}
