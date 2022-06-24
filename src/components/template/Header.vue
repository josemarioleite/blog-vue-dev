<template lang="pug">
div
  q-header.header-template.bg-primary(elevated)
    q-toolbar
      q-toolbar-title.toolbar-title(@click="goToHome") Blog do DEV
      template(v-if="tokenActived")
        q-btn(flat @click="drawer = !drawer" round dense icon="menu" side="right")

      template(v-else)
        q-btn(v-if="isPageLogin" @click="goToLoginPage" label="Log-in" class="float-right" icon="login" size="13px" style="background: transparent")
  Drawer(v-if="tokenActived" v-model="drawer")
</template>

<script>
import { defineComponent } from 'vue'
import Drawer from './Drawer.vue'

export default defineComponent({
  name: 'Header',
  components: { Drawer },
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    isPageLogin () {
      return this.$route.name === 'login' ? false : true
    },
    tokenActived () {
      return this.$store.state.isTokenActived
    }
  },
  methods: {
    goToHome () {
      this.$router.push({ name: 'Home' })
    },
    goToLoginPage () {
      this.$router.push({ name: 'login' })
    }
  }
})
</script>

<style lang="scss" scoped>
div {
  background: $night;
}

.toolbar-title:hover {
  cursor: pointer;
}

.header-template {
  font-family: 'Roboto Condensed', sans-serif;
}
</style>
