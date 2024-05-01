<template>
  <div class="">
    <ClientOnly>
      <TransitionGroup tag="div" class="relative" name="list">
        <img
          v-for="(album, index) in albums"
          :key="album"
          :style="{
            top: `${0 + adjustIndex(index) * 16}px`,
            minWidth: `${300 + adjustIndex(index) * 16}px`,
            minHeight: `${300 + adjustIndex(index) * 16}px`,
            maxWidth: `${300 + adjustIndex(index) * 16}px`,
            maxHeight: `${300 + adjustIndex(index) * 16}px`,
            left: `0`,
            right: '0',
            bottom: '0',
            zIndex: `${index}`,
          }"
          class="absolute mx-auto rounded-xl shadow-2xl shadow-black/60 border-gray-600 border bg-gray-800 album-item"
          :src="album"
          alt="album cover"
        />
        <div
          v-for="(album, index) in albums"
          :key="album + 'blur'"
          :style="{
            top: `${0 + adjustIndex(index) * 16}px`,
            minWidth: `${300 + adjustIndex(index) * 16}px`,
            minHeight: `${300 + adjustIndex(index) * 16}px`,
            maxWidth: `${300 + adjustIndex(index) * 16}px`,
            maxHeight: `${300 + adjustIndex(index) * 16}px`,
            left: `0`,
            right: '0',
            bottom: '0',
            zIndex: `${index}`,
          }"
          class="absolute mx-auto rounded-xl shadow-2xl shadow-black/60 border-gray-600 border album-item"
          :class="[
            albums.length - index === 1 && !showBlur
              ? 'backdrop-blur-none'
              : 'backdrop-blur-2xl',
          ]"
        />
      </TransitionGroup>
    </ClientOnly>
    <div v-if="showButton" class="">
      <UButton @click="next">✦</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  a: string[]
  showButton: boolean
  blur: boolean
}>()

const albums = toRef(props, 'a')
const showBlur = toRef(props, 'blur')

const initialCount = albums.value.length
const adjustIndex = (index: number) => {
  return index + (initialCount - albums.value.length)
}

function next() {
  showBlur.value = false
  setTimeout(() => {
    showBlur.value = true
    albums.value.pop()
  }, 2000)
}
</script>

<style>
.album-item {
  transition: top 0.5s ease, left 0.5s ease, min-width 0.5s ease,
    min-height 0.5s ease, backdrop-filter 0.5s ease;
}

.album-enter-active,
.album-leave-active {
  transition: opacity 0.5s;
}
.album-enter,
.album-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 180deg);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  transform: translateY(10px) translateX(20px);
}
</style>

<!-- 75 1.3 -->
<!-- 50 1.2 -->
<!-- 25 1.1 -->
<!-- 0 1 -->
