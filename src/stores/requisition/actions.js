import state from "./state"

const addItemInRequisition = (payload) => {
  state.requisitionItems.push(payload)
}

export default {
  addItemInRequisition,
}
