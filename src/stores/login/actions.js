import { axiosLogin } from "boot/axios";
import { LocalStorage } from "quasar";

const actionLogin = (state, payload) => {
  axiosLogin.post(`api/user/login/`, payload).then(response => {
    if (response.status === 200) {
      state.isloggedin = true
      state.login.id = response.data.user.id
      state.login.username = response.data.user.username
      state.login.name = response.data.user.name
      state.login.email = response.data.user.email
      state.login.is_staff = response.data.user.is_staff
      state.login.is_approver = response.data.user.is_approver
      state.login.is_superuser = response.data.user.is_superuser
      state.login.token = response.data.token
      state.login.refresh_token = response.data.refresh_token
      state.credentials.username = null
      state.credentials.password = null
      state.router.push('/Dashboard')
    }
  })
}

const actionLogout = (state) => {
  state.login = {
    id: null,
    username: null,
    name: null,
    email: null,
    is_staff: null,
    is_approver: null,
    is_superuser: null,
    token: null,
    refresh_token: null
  }
  state.router.push('Login')
}

const actionRefreshToken = (state) => {
  let data = {
    refresh: state.login.refresh_token
  }
  axiosLogin.post(`api/user/refresh-token/`, data).then(response => {
    if (response.status === 200) {
      state.login.token = response.data.token
    }
  })
}

export {
  actionLogin,
  actionLogout,
  actionRefreshToken
}
