<template lang="pug">
q-footer(style="border-top: 1px solid #ccc;")
  .size-footer-container.row.col-12
    .col-md-6.col-xs-12(style="background-color: #fff;")
      .row.justify-center.q-pa-md
        q-img.img-footer-me(src="../../assets/me-photo-2.jpg")
      .row.justify-center
        .column.justify-center.footer-infos.items-center
          .row.items-center
            span.text-black(style="font-size: 1.15rem;") José Mário -
            span.text-black.text-justify.q-ml-xs(style="font-size: .9rem; margin-top: 1px;") Analista e Desenvolvedor de Sistemas
          span.text-black.text-center(style="font-size: 1.05rem;") Apaixonado pela profissão, busco sempre estar por dentro das novas tecnologias para poder ensinar a você que tem vontade de seguir na área e que esteja começando

    //- Contato          
    .col-md-6.col-xs-12(style="background-color: #313382;")
      .column.q-pa-md.text-white
        span.mobile-style(style="font-size: 1.5rem;") Contato ou Sugestões
        
        .row.mobile-style
          q-img(@click="redirectEmail" src="../../assets/gmail.png" style="height: 20px; width: 20px; cursor: pointer;")
            q-tooltip(anchor="top middle" self="center middle" style="font-size: 12px;") Enviar E-mail
          span.q-ml-sm.q-mr-sm(ref="refEmail") {{ email }}
          q-img(@click="copyEmail" src="../../assets/copy.png" style="height: 18px; width: 18px; cursor: pointer;")
            q-tooltip(anchor="top middle" self="center middle" style="font-size: 12px;") Copiar E-mail

      //- Imagem das Redes sociais
      span.q-pa-md.text-images-socials(style="font-size: 1.5rem") Fique por dentro nas redes
      .row.justify-center.items-center.col-12.q-pa-md
        .line-footer.col-4
        .images-center.row.justify-evenly.col-4
          q-img.img-footer(@click="goToFacebook" src="../../assets/facebook.png")
            q-tooltip(anchor="top middle" self="center middle" style="font-size: 12px;") Visitar Facebook
          //- q-img.img-footer(src="../../assets/instagram.png")
          //-   q-tooltip(anchor="top middle" self="center middle" style="font-size: 12px;") Visitar Instagram
          //- q-img.img-footer(src="../../assets/youtube.png")
          //-   q-tooltip(anchor="top middle" self="center middle" style="font-size: 12px;") Visitar Canal do Youtube
          q-img.img-footer(src="../../assets/github.png" @click="goToGithub")
            q-tooltip(anchor="top middle" self="center middle" style="font-size: 12px;") Visitar Github
          q-img.img-footer(src="../../assets/linkedin.png" @click="goToLinkedinPage")
            q-tooltip(anchor="top middle" self="center middle" style="font-size: 12px;") Visitar Linkedin
        .line-footer.col-4

  .row.justify-center.col-12.q-pa-sm.bg-grey-8.items-center
    span.q-mr-xs(style="font-size: 16px;") @2022 - Blog do Dev
    q-img(src="../../assets/developer.png" style="width: 24px; height: 24px;")
    span.q-ml-sm(style="font-size: 16px;") | Todos os direitos reservados
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { copyToClipboard, Dialog, DialogChainObject } from 'quasar'

export default defineComponent({
  name: 'Footer',
  data () {
    return {
      email: 'blog.dev.jm@gmail.com'
    }
  },
  methods: {
    newGuide (address: string) {
      var win = window.open(address, '_blank')
      return win?.focus()
    },
    copyEmail () {
      copyToClipboard(this.email)
        .then(() => {
          this.$q.notify({
            color: 'green',
            timeout: 250,
            position: 'bottom-right',
            message: 'Copiado'
          })
        }).catch(() => {
          this.$q.notify({
            color: 'green',
            timeout: 350,
            position: 'bottom-right',
            message: 'Não foi possível copiar'
          })
        })
    },
    redirectEmail () {
      return this.confirmAction().onOk(() => {
        this.newGuide(`https://mail.google.com/mail/?view=cm&fs=1&to=${this.email}&su=BLOG DEV - ASSUNTO:`)
      })
    },
    confirmAction (): DialogChainObject {
      return Dialog.create({
        persistent: true,
        cancel: true,
        title: 'Atenção',
        message: 'Deseja realmente abrir este link ?',
        color: 'dark'
      })
    },
    goToLinkedinPage () {
      return this.confirmAction().onOk(() => {
        this.newGuide('https://www.linkedin.com/in/m%C3%A1rio-leite-043133162/')
      })
    },
    goToGithub () {
      return this.confirmAction().onOk(() => {
        this.newGuide('https://github.com/josemarioleite')
      })
    },
    goToFacebook () {
      return this.confirmAction().onOk(() => {
        this.newGuide('https://www.facebook.com/jose.mario.357/')
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.footer-infos {
  width: 560px;
  line-height: 25px;
  margin: 0 0 5px 10px;
}

span {
  font-family: 'Roboto Condensed', sans-serif;
}

.line-footer {
  height: 1px;
  background: #fff;
}

.img-footer-me {
  height: 68px;
  width: 72px;
  border-radius: 15px;
}

.img-footer {
  height: 42px;
  width: 42px;
}

.img-footer:hover {
  cursor: pointer;
}

@media only screen and (max-width: 599px) {
  .images-center {
    width: 205px;
  }

  .footer-infos {
    width: 328px;
    margin-bottom: 10px;
  }

  .img-footer {
    height: 38px;
    width: 38px;
  }

  .line-footer {
    width: 60px;
  }

  .mobile-style {
    text-align: center;
    justify-content: center;
  }

  .text-images-socials {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>