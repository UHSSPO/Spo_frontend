<template>
  <v-container class="px-0" fluid>
    <v-radio-group v-model="radioGroup">
      <v-radio v-for="n in numberOfRadioButtons" :key="n" :label="`Radio ${n}`" :value="n" />
    </v-radio-group>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      radioGroup: null,
      numberOfRadioButtons: 5,
    }
  },
  methods: {
    handleRadioChange() {
      console.log('Selected Radio:', this.radioGroup)
    },
  },
}
</script>
