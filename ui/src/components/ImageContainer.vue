<template>
  <div class="image-manager-container">
    <ImageItem :image="item" v-for="(item, index) in images" :key="index" />
  </div>
</template>

<script setup lang="ts">
import { IImage } from '@/types/IApp'
import ImageItem from './ImageItem.vue'

defineProps<{
  images: IImage[]
}>()
</script>

<style lang="scss">
.image-manager-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow-y: auto;
  height: 100%;
  margin-top: 10px;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background: transparent;
  }
  &::-webkit-scrollbar-corner {
    width: 0;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 4px solid transparent;
    background-clip: content-box;
    background-color: #dbdbdb;
  }
}
</style>
