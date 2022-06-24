import { MainActived } from "src/models/MainActived"
import { Pagination } from "src/models/PaginationModel"
import { User } from 'src/models/UserModel'

export interface RootState {
  articles: Array<any>
  technologies: Array<any>
  user: User
  mainVisible: Boolean
  isLoading: Boolean
  isMainActived: MainActived
  isTokenActived: Boolean
  totalRow: Number
  pagination: Pagination
  lengthArticles: Number
  token: string
}