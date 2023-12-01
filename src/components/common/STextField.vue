<template>
  <v-text-field
    v-model="value"
    :label="label"
    :type="type"
    :rules="rules"
    outlined
    :required="required"
  ></v-text-field>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'


@Component({
  name: 'STextField'
})
export default class STextField extends Vue {
  @Prop({ type: String, default: '' }) label!: string;
  @Prop({ type: String, default: 'text' }) type!: string;
  @Prop({ type: Array, default: () => [] }) rules!: Array<Function>;
  @Prop({ required: true }) value!: string;
  @Prop({ required: true }) required!: string;

}
</script>
