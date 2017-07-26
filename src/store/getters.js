const getters = {
  // sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  clientNumId: state => state.user.clientNumId,
  name: state => state.user.name
  // roles: state => state.user.roles
  // permission_routers: state => state.permission.routers,
  // addRouters: state => state.permission.addRouters
}
export default getters
