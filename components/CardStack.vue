<template>
  <div class="grid justify-items-center">
    <TransitionGroup
      tag="div"
      class="relative min-w-[416px]"
      :name="test ? 'none' : 'list'"
    >
      <img
        v-for="(album, index) in albums"
        :key="album"
        :style="{
          top: `${0 + adjustIndex(index) * 16}px`,
          minWidth: `${416 + adjustIndex(index) * 16}px`,
          minHeight: `${416 + adjustIndex(index) * 16}px`,
          left: `${adjustIndex(index) * -8}px`,
          zIndex: `${index}`,
        }"
        class="absolute rounded-xl shadow-2xl shadow-black/60 border-gray-600 border bg-gray-800 album-item"
        :src="album"
        alt="album cover"
      />
      <div
        v-for="(album, index) in albums"
        :key="album + 'blur'"
        :style="{
          top: `${0 + adjustIndex(index) * 16}px`,
          minWidth: `${416 + adjustIndex(index) * 16}px`,
          minHeight: `${418 + adjustIndex(index) * 16}px`,
          left: `${adjustIndex(index) * -8}px`,
          zIndex: `${index}`,
        }"
        class="absolute rounded-xl shadow-2xl shadow-black/60 border-gray-600 border"
        :class="[
          albums.length - index === 1 && !showBlur
            ? 'backdrop-blur-none'
            : 'backdrop-blur-2xl',
          test ? 'null' : 'album-item',
        ]"
      ></div>
    </TransitionGroup>
    <div v-if="showButton" class="mt-[650px]">
      <UButton @click="next">✦</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  a: string[]
  showButton: boolean
  test: boolean
}>()

const albums = toRef(props, 'a')

const initialCount = albums.value.length
const adjustIndex = (index: number) => {
  return index + (initialCount - albums.value.length)
}
const showBlur = ref(true)

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
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0.8;
  transform: translateY(100px);
}
</style>
