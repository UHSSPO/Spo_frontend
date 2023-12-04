<template>
  <v-overlay v-model="isLoading" class="loading">
    <v-progress-circular indeterminate color="#fff" size="64" width="7" />
  </v-overlay>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'SLoadingBar'
})
export default class SLoadingBar extends Vue {
  private isLoading = false

  public start(): void {
    this.isLoading = true
  }

  public finish(): void {
    this.isLoading = false
  }
}
</script>
