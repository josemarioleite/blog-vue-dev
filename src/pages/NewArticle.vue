<template lang="pug">
.container
  .text-center
    span.col-12 Criar novo artigo

  .container-inputs.column.items-center.col-12
    q-input.components.col-xs-12(v-model="title" ref="title" :rules="[ val => val.length >= 5 || 'Não pode estar vazio, no mínimo 5 caracteres']" square outlined standout bottom-slots placeholder="Digite aqui o título do artigo" label="Título")
      template(v-slot:append)
        q-icon(name="close" @click="title = ''" class="cursor-pointer")
      template(v-slot:prepend)
        q-avatar
          img(src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-title-job-search-flaticons-lineal-color-flat-icons-2.png")

    q-input.components.col-xs-12.q-mt-sm(v-model="notion_id" ref="notionId" :rules="[ val => val.length === 32 || 'ID incorreto']" square outlined standout bottom-slots placeholder="Digite aqui o ID da página do Notion" label="Notion ID")
      template(v-slot:append)
        q-icon(name="close" @click="notion_id = ''" class="cursor-pointer")
      template(v-slot:prepend)
        q-avatar
          img(src="https://img.icons8.com/nolan/64/notion.png")

    q-select.components.col-xs-12.q-mt-sm(
      standout
      outlined
      bottom-slots
      multiple
      use-chips
      stack-label
      v-model="technologiesSelected"
      :rules="[ val => val.length >= 1 || 'Escolha no mínimo um']"
      :options="technologies"
      ref="technology"
      option-value="id"
      option-label="name"
      label="Linguagem ou Tecnologia"
    )
      template(v-slot:prepend)
        q-avatar
          img(src="https://img.icons8.com/color/48/000000/workstation.png")

    q-btn(@click="newArticle" color="green" label="Salvar")

  q-inner-loading(
    :showing="isLoading"
    label="Espere um momento"
    label-class="text-black"
    label-style="font-size: 1.7em"
  )
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'
import { ArticlePost } from 'src/models/ArticleModel'
import { alert } from 'src/utils/dialog'
import { notify } from 'src/utils/notify'
import { API } from 'src/utils/services'

export default defineComponent({
  name: 'New-Article',
  data () {
    return {
      title: '',
      notion_id: '',
      technologiesSelected: [],
      articlePost: new ArticlePost()
    }
  },
  computed: {
    ...mapState(['technologies', 'isLoading', 'isTokenActived'])
  },
  methods: {
    ...mapMutations(['hideMain', 'showMain']),
    async newArticle () {
      if (!this.isTokenActived) {
        alert('Você não está logado', false)
      }
      const isValid = Boolean(this.$refs.title.validate() && this.$refs.technology.validate() && this.$refs.notionId.validate())
      if (isValid) {
        this.articlePost.title = this.title
        this.articlePost.notion_id = this.notion_id
        this.articlePost.technologies = this.technologiesSelected

        try {
          this.$store.commit('isLoading', true)

          alert('Deseja realmente criar este Artigo ?', true, true).onOk(async () => {
            const { data, status } = await API.article.post(this.articlePost)

            if (status === 200) {
              notify(data.message, true)
              this.$router.push({ name: 'Home' })
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
  beforeRouteLeave () {
    this.showMain()
  },
  created () {
    this.hideMain()
  }
})
</script>

<style lang="scss" scoped>
.text-center {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 4rem;
}

.container {
  height: 650px;
}

.components {
  width: 600px;
}

.container-inputs {
  position: absolute;
  top: 35%;
  width: 100%;
}

@media only screen and (max-width: 499px) {
  .container {
    height: 100%;
  }

  .text-center {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 3rem;
  }

  .container-inputs {
    position: relative;
  }

  .components {
    padding: 10px;
    width: 100%;
  }
}
</style>