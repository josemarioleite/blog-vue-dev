<template lang="pug">
div.container-detail.col-12
  Button.button-sticky(:hideArticle="hideArticle" :disabled="isLoading" :idArticle="idArticle" :notionId="notion_id")
  NotionRenderer(:blockMap="Object(blockMap)" fullPage)
  q-inner-loading(
    :showing="isLoading"
    label="Espere um momento"
    label-class="text-black"
    label-style="font-size: 1.7em"
  )
</template>

<script>
import { NotionRenderer, getPageBlocks } from 'vue3-notion'
import { defineComponent } from 'vue'
import { API } from 'src/utils/services'
import { ArticlePut } from 'src/models/ArticleModel'
import { alert } from 'src/utils/dialog'
import { notify } from 'src/utils/notify'
import Button from 'src/commons/Button.vue'

export default defineComponent({
  name: 'Detail',
  components: { NotionRenderer, Button },
  data () {
    return {
      idArticle: '',
      notion_id: '',
      blockMap: '',
      isLoading: false,
      article: new ArticlePut()
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  methods: {
    async hideArticle () {
      if (this.$store.state.isTokenActived) {
        try {
          this.$store.commit('isLoading', true)

          alert('Deseja ocultar este Artigo ?', true, true).onOk(async () => {
            this.article.id = this.idArticle
            this.article.isVisible = false
            const result = await API.article.put(this.idArticle, this.article, this.$store.state.token)

            if (result.status === 200) {
              if (result.data.status === false) {
                notify(result.data.message, false)
              } else {
                notify(result.data.message, true)
                this.$router.push({ name: 'Home' })
              }
            } else {
              alert('Requisição completada sem sucesso')
            }
          })
        } catch (ex) {
          alert('Erro Inesperado, verifique se todos os campos estão preenchidos corretamente')
          console.log(ex)
        } finally {
          this.$store.commit('isLoading', false)
        }
      }
    }
  },
  async created () {
    this.$store.dispatch('isLogin')
    this.idArticle = this.$route.params.id
    this.notion_id = this.$route.params.notion_id
    this.blockMap = await getPageBlocks(this.notion_id)
  }
})
</script>

<style lang="scss">
@import "../../css/notion-pages.scss";
@import "prismjs/themes/prism.css";
@import "katex/dist/katex.min.css";


.container-detail {
  min-height: 1220px;
}

@media only screen and (max-width: 499px) {
  .container-detail {
    min-height: 900px;
  }

  .button-sticky {
    display: none;
  }
}
</style>