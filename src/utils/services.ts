import config from './config'
import axios from 'axios'
import { Pagination } from 'src/models/PaginationModel'
import { ArticlePost, ArticlePut } from 'src/models/ArticleModel'
import { UserAuth } from 'src/models/UserModel'
import { Technology, TechnologyPost } from 'src/models/TechnologyModel'

const ApiUrl = config.apiURL

export const API = {
  article: {
    async get (pagination: Pagination) {
      return await axios.get(ApiUrl + 'article?' +
        `pageIndex=${pagination.pageIndex}` +
        `&pageSize=${pagination.pageSize}` +
        `&onlyQuery=${pagination.onlyQuery}` +
        `&onlyRowCount=${pagination.onlyRowCount}` +
        `&id=${pagination.id}` +
        `&filter=${pagination.filter}` +
        `&hasParam=${pagination.hasParam}`
      )
    },
    async post (article: ArticlePost, token: string) {
      return await axios.post(ApiUrl + 'article', article, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    },
    async put (id: string, article: ArticlePut, token: string) {
      return await axios.put(ApiUrl + `article/hidden/${id}`, article, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    }
  },
  technology: {
    async get () {
      return await axios.get(ApiUrl + 'technology')
    },
    async post (tech: TechnologyPost, token: string) {
      return await axios.post(ApiUrl + 'technology', tech, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    },
    async put (id: string, tech: Technology, token: string) {
      return await axios.post(ApiUrl + `hidden/${id}`, tech, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    },
  },
  authentication: {
    async post (userAuth: UserAuth) {
      return await axios.post(ApiUrl + 'auth/login', userAuth)
    },
    async get (token: string) {
      return await axios.get(ApiUrl + 'auth/token', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    }
  },
  user: {
    async get (token: string) {
      return await axios.get(ApiUrl + 'user', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    }
  }
}