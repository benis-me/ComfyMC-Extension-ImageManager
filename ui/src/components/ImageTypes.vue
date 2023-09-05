<template>
  <div class="image-manager-types">
    <t-radio-group
      variant="default-filled"
      default-value="all"
      @change="onChange"
    >
      <t-radio-button value="all" key="all">全部</t-radio-button>
      <t-radio-button :value="item" v-for="(item, index) in types" :key="index">
        {{ item }}
      </t-radio-button>
    </t-radio-group>
  </div>
</template>

<script setup lang="ts">
import {
  RadioGroup as TRadioGroup,
  RadioButton as TRadioButton,
} from 'tdesign-vue-next'
defineProps<{
  types: string[]
}>()

const emits = defineEmits<{
  (event: 'change', value: string): void
}>()

function onChange(type: any) {
  emits('change', type)
}
</script>

<style lang="scss">
.image-manager-types {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  pointer-events: all;
}
</style>
