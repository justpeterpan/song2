<template>
  <div>
    <div>
      <CardStackNew :covers="getRightAlbumCovers" class="ml-16 mt-10" />
      <div
        class="absolute mt-[350px] mx-auto top-0 left-0 bottom-0 right-0 w-[80%]"
      >
        <div v-if="quizAlbums?.length" class="mt-60">
          <div
            v-for="album of currentQuizAlbums"
            :key="album.index"
            class="min-w-full sm:min-w-[350px] max-w-[350px] mb-2"
          >
            <AnswerOptions
              :album="album"
              :right-album="getRightAlbum(currentQuizAlbums)"
              @click="pickAlbum(album.index)"
            />
          </div>
        </div>
        <UButton
          icon="i-heroicons-arrow-path"
          variant="solid"
          color="violet"
          class="mt-4 w-full mb-4 sm:mb-0 min-w-full sm:min-w-[350px] max-w-[350px]"
          size="xl"
          block
          @click="reload"
          >Refresh</UButton
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import confetti from 'canvas-confetti'
import type { Album } from '~/components/AnswerOptions.vue'

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
  // rightAnswered.value = 'yet'
  // currentRound.value = 0
  // quizAlbums.value = null
  // fetch('/q')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     quizAlbums.value = data
  //   })
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
