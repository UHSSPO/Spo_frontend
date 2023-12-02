<template>
  <v-app>
    <div id="heeader">
      <v-btn>test</v-btn>
    </div>
    <!-- src/page -->
    <Nuxt />
    <div id="footer">
      <div class="footer-con">
        test© test
      </div>
    </div>
    <s-dialog v-for="(dialog, index) in dialogs" :key="index" :dialog="dialog" @close="onCloseDialog" />
  </v-app>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import _ from 'lodash'
import { DIALOG_TYPE, IDialog, IDialogResult } from '../types/common'
import { commonStore } from '../util/store-accessor'
import { Namespace } from '../util/Namespace'
import SDialog from '../components/common/SDialog.vue'

const common = namespace(Namespace.COMMON)

@Component({
  scrollToTop: true,
  components: {
    SDialog
  }
})
export default class extends Vue {
  @common.State private dialogs!: Array<any>

  private onCloseDialog (value: IDialogResult) {
    const index = _.findIndex(this.dialogs, (dialog: IDialog) => {
      return dialog.id === value.id
    })
    commonStore.REMOVE_DIALOG(index)
  }

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
