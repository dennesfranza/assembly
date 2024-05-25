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
      state.login.is_superuser = response.data.user.is_superuser
      state.login.token = response.data.token
      state.login.refresh_token = response.data.refresh_token
      LocalStorage.set('user', state.login)
      LocalStorage.set('isloggedin', true)
      state.router.push('/Dashboard')
    }
  })
}

const actionLogout = (state) => {
  LocalStorage.set('user', null)
  LocalStorage.set('isloggedin', false)
  state.router.push('Login')
}

export {
  actionLogin,
  actionLogout
}
