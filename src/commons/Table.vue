<template lang="pug">
.container
  q-table(
    title="Tecnologias"
    :rows="Rows"
    :columns="Columns"
    row-key="id"
    separator="horizontal"
  )
    template(v-slot:top-right)
      q-btn.q-mb-md(@click="showDialogAdd" icon="add" color="green")
        q-tooltip(transition-show="rotate" class="bg-amber" transition-hide="rotate" style="font-size: 14px; color: black;") Novo menu

    template(v-slot:body-cell-actions="props")
      q-td(key="actions" :props="props")
        q-btn.q-ml-sm(@click="showTech(props.row)" padding="xs" color="black" icon="visibility")
          q-tooltip(class="bg-accent") Visualizar

  q-dialog(ref="dialogRef" v-model="showDialog" persistent)
    .layout-dialog.items-center.col-12
      .font-text.text-dark Cadastrar novo menu
      q-input(v-model="nameTech" ref="nameTech" label="Descrição" placeholder="Descrição da tecnologia" :rules="[ val => val.length >= 5 || 'Preencha a descrição corretamente']")
      q-input(v-model="urlTech" ref="urlTech" label="URL" placeholder="URL da imagem da tecnologia" :rules="[ val => val.length >= 5 || 'Preencha a URL corretamente']")

      .row.justify-center.col-12(style="margin-top: 30px")
        q-btn(color="red" label="Cancel" @click="showDialog = !showDialog")
        q-btn.q-ml-xs(color="green" label="Salvar" @click="saveTech" :loading="isLoading")
</template>

<script>
import { TechnologyPost } from 'src/models/TechnologyModel'
import { defineComponent } from 'vue'
import { API } from 'src/utils/services'
import { notify } from 'src/utils/notify'

export default defineComponent({
  name: 'Table',
  props: {
    Columns: { type: Array, required: true },
    Rows: { type: Array, required: true }
  },
  data () {
    return {
      showDialog: false,
      nameTech: '',
      urlTech: ''
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  methods: {
    showTech (tech) {
      this.$emit('rowTech', tech)
    },
    showDialogAdd () {
      this.showDialog = !this.showDialog
    },
    async saveTech () {
      const nameIsValid = this.$refs.nameTech.validate()
      const urlIsValid = this.$refs.urlTech.validate()

      if (nameIsValid && urlIsValid) {
        const tech = new TechnologyPost()
        tech.name = this.nameTech
        tech.url_image = this.urlTech

        try {
          this.$store.commit('isLoading', true)

          const { status, data } = await API.technology.post(tech, this.$store.state.token)

          if (status === 200) {
            notify(data.message, true)
            this.showDialogAdd()
            this.$store.dispatch('getTechnologies')
          } else {
            notify(data.message, false)
          }
        } catch (ex) {
          notify(data.message, true)
        } finally {
          this.$store.commit('isLoading', false)
          this.cleanFields()
        }
      }
    },
    cleanFields () {
      this.nameTech = ''
      this.urlTech = ''
    }
  }
})
</script>

<style lang="scss" scoped>
.font-text {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.8rem;
}

.layout-dialog {
  padding: 10px;
  background: #fff;
  width: 500px;
  height: 285px;
}
</style>