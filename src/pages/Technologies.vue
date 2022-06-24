<template lang="pug">
.container.col-12.q-pa-md
  Table.table-tech(@rowTech="rowTech" :Columns="columns" :Rows="techs" dense)
  .row.justify-center.col-12.q-mt-md
    .row.col-md-9.col-xs-12
      q-input.col-xs-12.col-md-2.padding-default(ref="inputId" v-model="technology.id" filled label="ID" placeholder="ID" readonly)
      q-input.col-xs-12.col-md-7.padding-default(v-model="technology.name" filled label="Descrição" placeholder="Descrição" readonly)
      q-select.col-xs-12.col-md-3.padding-default(v-model="isVisible" :options="options" filled label="Visível" placeholder="Está visível ?")
      q-input.col-12.padding-default.q-mt-md(v-model="technology.url_image" filled label="URL da imagem" placeholder="URL" readonly)
    .row.justify-center.col-md-3.col-xs-12
       q-img(:src="technology.url_image" spinner-color="red" style="height: 150px; max-width: 150px")

  .q-mt-md.row.justify-center
    q-btn(@click="hideTech" :loading="isLoading" :disable="isLoading" color="black" icon="visibility" label="Ocultar" style="margin: 5px;")
    q-btn(color="green" icon="visibility" label="Alterar" style="margin: 5px;")
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'
import { Technology } from 'src/models/TechnologyModel'
import { API } from 'src/utils/services'
import { alert } from 'src/utils/dialog'
import { notify } from 'src/utils/notify'
import Table from 'src/commons/Table.vue'

export default defineComponent({
  name: 'Technology',
  components: { Table },
  data () {
    return {
      isVisible: false,
      technology: new Technology(),
      options: [
        { value: true, label: true },
        { value: false, label: false },
      ],
      columns: [
        { name: 'id', headerClasses: 'bg-dark text-white', required: true, label: 'ID', align: 'right', field: 'id', style: 'min-width: 20px', sortable: true },
        { name: 'name', label: 'Descrição', align: 'left', field: 'name', sortable: true },
        { name: 'url_image', align: 'left', label: 'URL', field: 'url_image', sortable: true, style: 'max-width: 180px; overflow: hidden;' },
        { name: 'isVisible', label: 'Is Visible?', align: 'center', field: 'isVisible', sortable: true },
        { name: 'actions', label: 'Ações', align: 'center', headerClasses: 'bg-dark text-white', style: 'width: 30px' }
      ]
    }
  },
  computed: {
    ...mapState(['technologies']),
    isLoading () {
      return this.$store.state.isLoading
    },
    techs () {
      return this.technologies
    }
  },
  methods: {
    ...mapMutations(['hideMain', 'showMain']),
    rowTech (tech) {
      if (tech !== null) {
        this.technology.id = tech.id
        this.technology.name = tech.name
        this.technology.url_image = tech.url_image
        this.isVisible = tech.isVisible
      }
    },
    async hideTech () {
      if (this.technology.id.length < 1) {
        return alert('ID é obrigatório, por favor, escolha uma tecnologia', false)
      } else {
        if (this.$store.state.isTokenActived) {        
          try {
            this.$store.commit('isLoading', true)
            alert('Deseja ocultar esta Tecnologia ?', true, true).onOk(async () => {
              if (typeof this.isVisible === 'object') {
                this.technology.isVisible = this.isVisible.value
              } else {
                this.technology.isVisible = this.isVisible
              }

              console.log(this.technology.isVisible)
              
              const result = await API.article.put(this.technology.id, this.technology, this.$store.state.token)

              if (result.status === 200) {
                if (result.data.status === false) {
                  notify(result.data.message, false)
                } else {
                  notify(result.data.message, true)
                  await this.$store.dispatch('getTechnologies')
                }
              } else {
                alert('Requisição completada sem sucesso')
              }
            })
          } catch (ex) {
            alert('Erro Inesperado, verifique se todos os campos obrigatórioss estão preenchidos corretamente')
            console.log(ex)
          } finally {
            this.$store.commit('isLoading', false)
          }
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
.container {
  height: 100%;
}

.padding-default {
  padding: 5px;
}

.table-tech {
  // width: 850px;
}
</style>