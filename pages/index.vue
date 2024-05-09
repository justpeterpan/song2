<template>
  <div>
    <div class="relative w-[80.5%]">
      <CardStackNew :covers="getRightAlbumCovers" />
    </div>
    <div class="pt-[370px] m-2">
      <div v-if="quizAlbums?.length">
        <div v-for="album of currentQuizAlbums" :key="album.index">
          <AnswerOption
            :album="album"
            :right-album="getRightAlbum(currentQuizAlbums)"
            @click="pickAlbum(album.index)"
          />
        </div>
      </div>
      <UButton
        icon="i-heroicons-arrow-path"
        variant="outline"
        color="rose"
        class="mt-4 w-full mb-4 sm:mb-0 min-w-full sm:min-w-[350px] max-w-[350px]"
        size="xl"
        block
        @click="reload"
        >Refresh</UButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import confetti from 'canvas-confetti'
import type { Album } from '~/components/AnswerOption.vue'

const { data: quizAlbums } = await useFetch<Array<Album[]>>('/q')
const rightAnswered = useRightAnswered()
const pickedAlbum = usePickedAlbum()
const currentRound = useCurrentRound()
const currentQuizAlbums = computed(() => quizAlbums.value?.[currentRound.value])
const getRightAlbumCovers = computed(() =>
  quizAlbums.value?.map((albums) => getRightAlbum(albums).cover)
)
const rightAnswers = ref(0)

function getRightAlbum(albums: Album[] | undefined): Album {
  if (!albums)
    return {
      index: '',
      title: '',
      artist: '',
      link: '',
      cover: '',
      right: false,
    }
  return albums.find((album) => album.right) || albums[0]
}

function reload() {
  window.location.reload()
}

function pickAlbum(index: string) {
  pickedAlbum.value = index
  if (
    quizAlbums.value &&
    pickedAlbum.value ===
      getRightAlbum(quizAlbums.value?.[currentRound.value]).index
  ) {
    wow()
    rightAnswered.value = 'yes'
    rightAnswers.value += 1
    setTimeout(() => {
      rightAnswered.value = 'yet'
      currentRound.value += 1
    }, 2000)
  } else {
    rightAnswered.value = 'no'
    setTimeout(() => {
      rightAnswered.value = 'yet'
      currentRound.value += 1
    }, 2000)
  }
}
function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function wow() {
  confetti({
    origin: { y: 0.4, x: 0.2 },
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
  })
}
</script>
