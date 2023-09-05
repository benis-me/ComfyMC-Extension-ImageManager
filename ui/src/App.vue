<template>
  <t-dialog
    class="image-manager-dialog"
    attach="body"
    mode="modeless"
    :draggable="true"
    :visible="visible"
    placement="center"
    :on-close="close"
    :footer="false"
    :close-btn="false"
  >
    <template #header>
      <div class="image-manager-dialog__header__title">图片管理器</div>
      <ImageTypes :types="imagesTypes" @change="current = $event" />
      <div class="image-manager-dialog__header__close">
        <t-button theme="default" @click="close">关闭</t-button>
      </div>
    </template>
    <ImageContainer :images="currentImages" />
  </t-dialog>
</template>

<script setup lang="ts">
import { getImages } from '@/api'
import { IImage } from '@/types/IApp'
import { useEventBus } from '@vueuse/core'
import { computed, ref, onMounted } from 'vue'
import ImageTypes from './components/ImageTypes.vue'
import ImageContainer from './components/ImageContainer.vue'
import { Dialog as TDialog, Button as TButton } from 'tdesign-vue-next'

const images = ref<{ [key: string]: IImage[] }>({})
const imagesTypes = computed(() => Object.keys(images.value))

const current = ref('all')
const currentImages = computed(() =>
  current.value === 'all'
    ? Object.values(images.value).flat()
    : images.value[current.value]
)

onMounted(async () => {
  const res = await getImages()
  const imagesMap = res.images.reduce((prev: any, cur: any) => {
    const [category] = cur.name.split('_')
    if (!prev[category]) {
      prev[category] = []
    }
    prev[category].push(cur)
    return prev
  }, {})
  images.value = imagesMap
})

/**
 * 关闭窗口
 */
const visible = ref(false)
function close() {
  visible.value = false
  setTimeout(() => {
    useEventBus('Extension::ImageManager::Close').emit()
  }, 300)
}

onMounted(() => {
  setTimeout(() => {
    visible.value = true
  }, 100)
})
</script>

<style lang="scss">
.image-manager-dialog {
  .t-dialog {
    padding: 20px;
    padding-top: 50px;
    width: 85vw;
    height: 85vh;
    box-shadow: 0px 10px 20px -5px rgba($color: #000000, $alpha: 0.08);
    &__header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      pointer-events: none;
      user-select: none;
      -webkit-user-select: none;
      &-content {
        padding: 20px;
        padding-top: 15px;
        align-items: center;
        justify-content: space-between;
      }
    }
    &__body {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 0;
      height: 100%;
    }
  }
  &__header__close {
    cursor: pointer;
    pointer-events: all;
  }
  .image-manager-main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 300px;
  }
}
</style>
