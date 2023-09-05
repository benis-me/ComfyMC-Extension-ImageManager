<template>
  <div class="image-manager-image__item">
    <img :src="url" />
  </div>
</template>

<script setup lang="ts">
import { apiBase } from '@/api/base'
import { IImage } from '@/types/IApp'
import { computed } from 'vue'

const props = defineProps<{
  image: IImage
}>()
const url = computed(
  () =>
    `${apiBase}/view?filename=${props.image.name}&subfolder=${
      props.image.subfolder === '.' ? '' : props.image.subfolder
    }`
)
</script>

<style lang="scss">
.image-manager-image__item {
  width: calc((100% - 50px) / 6);
  img {
    width: 100%;
    aspect-ratio: 1;
    vertical-align: middle;
    user-select: none;
    -webkit-user-select: none;
  }
}
</style>
