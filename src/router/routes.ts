import Home from '../pages/Home.vue'
import ArticleDetail from '../components/article/ArticleDetail.vue'
import NewArticle from '../pages/NewArticle.vue'
import Technologies from '../pages/Technologies.vue'
import Login from '../pages/Login.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/article-detail/:id/:notion_id', name: 'article-detail', component: ArticleDetail },
  { path: '/new-article', name: 'new-article', component: NewArticle, meta: {requiresAuth: true} },
  { path: '/technologies', name: 'technologies', component: Technologies, meta: {requiresAuth: true} },
  { path: '/login', name: 'login', component: Login }
]

export default routes