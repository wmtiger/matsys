import { login } from '@/api/user'
import { getMyMenu } from '@/api/menu'
import { setToken, removeToken, setUserName, setUserPwd } from '@/common/auth'

const user = {
  state: {
    token: '',
    name: '',
    clientNumId: '',
    menus: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_CLIENT_NUM_ID: (state, clientNumId) => {
      state.clientNumId = clientNumId
    }
  },

  actions: {
    // 登录
    Login ({ commit }, data) {
      console.log('Login', data)
      return new Promise((resolve, reject) => {
        login(data.user, data.pwd).then(resp => {
          let msg = resp.data
          if (msg.phase === 2) {
            setToken(msg.token)
            commit('SET_TOKEN', msg.token)
            commit('SET_CLIENT_NUM_ID', msg.clientNumId)
            setUserName(data.user)
            setUserPwd(data.pwd)
            console.log('login success')
            resolve()
          }
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    GetMenu ({commit}, data) {
      console.log('GetMenu', data)
      return new Promise((resolve, reject) => {
        getMyMenu().then(resp => {
          let msg = resp.data
          if (msg.phase === 2) {
            console.log('GetMenu success')
            resolve()
          }
        }).catch(function (error) {
          reject(error)
        })
      })
    },

    // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(response => {
    //       const data = response.data
    //       commit('SET_ROLES', data.role)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout().then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
