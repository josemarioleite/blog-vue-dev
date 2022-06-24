<template lang="pug">
q-drawer(
  behavior="mobile"
  ref="drawer"
  side="right"
  show-if-above
  :width="250"
  :breakpoint="500"
  bordered
  class="bg-grey-3"
)
  q-scroll-area(style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd")
    q-list(padding)
      template(v-for="(menuItem, index) in menuList" :key="index")
        q-item(clickable v-ripple @click="mains(menuItem.id)")
          q-item-section(avatar)
            q-icon(:name="menuItem.icon")
          q-item-section {{ menuItem.label }}
        q-separator(:key="'sep' + index"  v-if="menuItem.separator")

  q-img.absolute-top(src="../../assets/drawer.png" style="height: 155px")
    div(class="absolute-bottom bg-transparent")
      q-avatar(size="56px" class="q-mb-sm bg-black")
        .text.white {{ user.name.substr(0,1) }}

      .text-subtitle2.ellipsis.q-mt-md {{ user.name }}
      .text-subtitle2.q-mb-xs @{{ user.nickname }}

  .q-mb-md.column.text-center.absolute-bottom
    div Versão {{ versionApp }}
    div Data {{ dateVersion }}
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Drawer',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      versionApp: '',
      dateVersion: '',
      menuList: [
        { id: 1, icon: 'home', label: 'Home' },
        { id: 2, icon: 'article', label: 'Novo artigo' },
        { id: 3, icon: 'code', label: 'Tecnologias' },
        { id: 4, icon: 'exit_to_app', label: 'Sair' }
      ]
    }
  },
  methods: {
    ...mapActions(['getUser']),
    ...mapMutations(['goToLogout']),
    goToLogoutPage () {
      this.goToLogout()
      this.goToHome()
    },
    goToHome () {
      this.$router.push({ name: 'Home' })
    },
    goToNewArticle () {
      this.$router.push({ name: 'new-article' })
    },
    goToPageTech () {
      this.$router.push({ name: 'technologies' })
    },
    mains (id) {
      const value = Number(id)

      switch (value) {
        case 1:
          this.goToHome()
          break;
        case 2:
          this.goToNewArticle()
          break;
        case 3:
          this.goToPageTech()
          break;
        case 4:
          this.goToLogoutPage()
          break;
        default:
          console.log('Método não alocado')
      }

      this.$refs.drawer.hide()
    }
  },
  created () {
    this.getUser()
    this.versionApp = '1.0.0'
    this.dateVersion = '01/06/2022'
  }
}
</script>