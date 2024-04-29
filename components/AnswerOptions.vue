<template>
  <div
    v-for="album in quizAlbums"
    :key="album.index"
    class="min-w-full sm:min-w-[350px] max-w-[350px] mb-2"
  >
    <UButton
      :color="
        album.index === rightAlbum.index &&
        (rightAnswered === 'yes' || rightAnswered === 'no')
          ? 'green'
          : album.index === pickedAlbum && rightAnswered === 'no'
          ? 'red'
          : 'gray'
      "
      variant="solid"
      class="w-full text-left"
      size="xl"
      @click="pickAlbum(album.index)"
    >
      {{ album.artist }} - {{ album.title }}</UButton
    >
  </div>
</template>

<script lang="ts" setup>
import type { Album } from '~/pages/index.vue'

const pickedAlbum = usePickedAlbum()
const rightAnswered = useRightAnswered()

const props = defineProps<{
  quizAlbums: Album[] | null
  rightAlbum: Album
}>()

function pickAlbum(index: string) {
  pickedAlbum.value = index
  if (pickedAlbum.value === props.rightAlbum.index) {
    rightAnswered.value = 'yes'
  } else {
    rightAnswered.value = 'no'
  }
}
</script>
