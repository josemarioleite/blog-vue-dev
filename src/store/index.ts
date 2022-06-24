import { createApp } from 'vue'
import { RootState } from './types'
import { API } from 'src/utils/services'
import { Pagination } from 'src/models/PaginationModel'
import { alert } from 'src/utils/dialog'
import { notify } from 'src/utils/notify'
import { MainActived } from 'src/models/MainActived'
import { User, UserAuth } from 'src/models/UserModel'
import { Technology, TechnologyPost } from 'src/models/TechnologyModel'

import Vuex, { StoreOptions } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

createApp(Vuex)

const state = {
  articles: [],
  technologies: [],
  token: '',
  isLoading: false,
  mainVisible: true,
  isTokenActived: false,
  totalRow: 0,
  lengthArticles: 0,
  user: new User(),
  isMainActived: new MainActived(),
  pagination: new Pagination()
}

const getDefaultState = () => {
  return {
    token: '',
    isTokenActived: false,
    user: new User()
  }
}

const store: StoreOptions<RootState> = {
  state,
  mutations: {
    hideMain (state) {
      return state.mainVisible = false
    },
    showMain (state) {
      return state.mainVisible = true
    },
    isLoading (state, isLoading: Boolean) {
      return state.isLoading = isLoading
    },
    articles (state, articles: Array<any>) {
      return state.articles = articles
    },
    technologies (state, tech: Array<any>) {
      return state.technologies = tech
    },
    totalRow (state, totalRow: Number) {
      return state.totalRow = totalRow
    },
    lengthArticles (state, lengthData: Number) {
      return state.lengthArticles = lengthData
    },
    changeStateMainActived (state, isMain: boolean) {
      state.isMainActived.isActived = isMain
    },
    changeStateMainSelected (state, tech: Technology) {
      state.isMainActived.technologySelected = tech
    },
    pagination (state, pag: Pagination) {
      return state.pagination = pag
    },
    token (state, tk: string) {
      return state.token = tk
    },
    user (state, data: User) {
      state.user = data
    },
    goToLogout (state) {
      Object.assign(state, getDefaultState())
    },
    isTokenActived (state, isActived: boolean) {
      return state.isTokenActived = isActived
    }
  },
  actions: {
    async getArticles ({ commit }, pagination: Pagination) {
      try {
        commit('isLoading', true)
        const { data, status } = await API.article.get(pagination)

        if (status === 200) {
          commit('articles', data.article)
          commit('lengthArticles', data.article.length)
          commit('totalRow', data.rowCount)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          alert('Requisição completada sem sucesso')
        }
      } catch (ex) {
        alert('Não foi possível obter os artigos\n' + ex)
        console.log(ex)
      } finally {
        commit('isLoading', false)
      }
    },
    async getTechnologies ({ commit }) {
      try {
        commit('isLoading', true)
        const { data, status } = await API.technology.get()

        if (status === 200) {
          commit('technologies', data)
        } else {
          alert('Requisição completada sem sucesso')
        }
      } catch (ex) {
        alert('Não foi possível obter os menus\n' + ex)
        console.log(ex)
      } finally {
        commit('isLoading', false)
      }
    },
    async authenticateLogin ({ commit }, userAuth: UserAuth) {
      var result: boolean = false
      try {
        commit('isLoading', true)
        const { data } = await API.authentication.post(userAuth)

        if (data.code === 200) {
          commit('token', data.token)
          notify(data.msg, true)
          result = true
        } else {
          alert('Credenciais inválidas, tente novamente mais tarde.')
        }
      } catch (ex) {
        alert('Erro ao fazer requisição de autenticação:\n' + ex)
        console.log(ex)
      } finally {
        commit('isLoading', false)
      }
      return result
    },
    async getUser ({ commit, state }) {
      if (state.isTokenActived) {
        try {
          commit('isLoading', true)
          const { data, status } = await API.user.get(state.token)

          if (status === 200) {
            commit('user', data)
          } else {
            alert('Não foi possível obter os dados do usuário')
          }
        } catch (ex) {
          console.log(ex)
        } finally {
          commit('isLoading', false)
        }
      }
    },
    async isLogin ({ commit, state }) {
      try {
        commit('isLoading', true)
        const { status } = await API.authentication.get(state.token)

        if (status === 200) {
          commit('isTokenActived', true)
        }
      } catch (ex) {
        commit('isTokenActived', false)
      } finally {
        commit('isLoading', false)
      }
    },
    resetPagination ({ commit }) {
      commit('isLoading', true)
      commit('pagination', new Pagination())
      commit('isLoading', false)
    }
  },
  plugins: [createPersistedState()]
}

export default new Vuex.Store<RootState>(store)