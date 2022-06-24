<template lang="pug">
q-page-sticky(v-if="tokenActived" position="bottom-right" :offset="[18, 18]")
  q-fab(v-model="fab1" external-label color="primary" icon="keyboard_arrow_left" direction="left")
    q-fab-action.q-ml-lg(@click="hide" :disable="disabled" label-position="top" color="black" icon="visibility")
      q-tooltip(transition-show="rotate" class="bg-amber" transition-hide="rotate" style="font-size: 14px; color: black;") Ocultar artigo
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: 'Button',
  props: {
    idArticle: { type: String, required: true },
    notionId: { type: String, required: true },
    hideArticle: { type: Function, required: true },
    disabled: { type: Boolean, default: false }
  },
  data () {
    return {
      fab1: false
    }
  },
  computed: {
    tokenActived () {
      return this.$store.state.isTokenActived
    }
  },
  methods: {
    hide () {
      return this.hideArticle()
    }
  }
})
</script>