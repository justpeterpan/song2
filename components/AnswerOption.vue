<template>
  <UButton
    :color="buttonColor"
    variant="solid"
    class="w-full text-left"
    size="xl"
  >
    {{ props.album.artist }} - {{ props.album.title }}</UButton
  >
</template>

<script lang="ts" setup>
export type Album = {
  index: string
  title: string
  artist: string
  link: string
  cover: string
  right: boolean
}

const props = defineProps<{ album: Album; rightAlbum: Album }>()
const pickedAlbum = usePickedAlbum()
const rightAnswered = useRightAnswered()

const buttonColor = computed(() => {
  if (
    props.album.index === props.rightAlbum.index &&
    (rightAnswered.value === 'yes' || rightAnswered.value === 'no')
  )
    return 'green'

  if (props.album.index === pickedAlbum.value && rightAnswered.value === 'no')
    return 'red'
  return 'gray'
})
</script>
