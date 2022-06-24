import { Technology } from './TechnologyModel'

export class Article {
  id: string = ''
  title: string = ''
  notion_id: string = ''
  isVisible: boolean = true
  datePublication: string = ''
  technologies: Array<Technology> = []
}

export class ArticlePut {
  id: string = ''
  isVisible: boolean = true
}

export class ArticlePost {
  title: string = ''
  notion_id: string = ''
  isVisible: boolean = true
  technologies: Array<Technology> = []
}