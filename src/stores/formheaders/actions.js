import state from "./state"

const getFormHeaderValues = (payload) => {
  return state[payload]
}

export default {
  getFormHeaderValues
}
