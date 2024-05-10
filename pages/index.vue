<template>
  <div>
    <ClientOnly>
      <div class="relative mt-4" :style="{ marginLeft: 'calc(50% - 224px/2)' }">
        <CardStackNew :covers="getRightAlbumCovers" />
      </div>
    </ClientOnly>
    <div class="pt-[370px] mx-8">
      <div class="text-white text-center text-xl font-semibold pb-4">
        {{ rightAnswers }} / {{ quizAlbums?.length }}
      </div>
      <div v-if="quizAlbums?.length">
        <div
          v-for="album of currentQuizAlbums"
          :key="album.index"
          class="pb-[2px]"
        >
          <AnswerOption
            :album="album"
            :right-album="getRightAlbum(currentQuizAlbums)"
            @click="pickAlbum(album.index)"
          />
        </div>
      </div>
      <UButton
        v-if="currentRound >= (quizAlbums?.length ?? 0)"
        icon="i-heroicons-arrow-path"
        variant="outline"
        color="rose"
        size="xl"
        block
        @click="reload"
        >restart</UButton
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
