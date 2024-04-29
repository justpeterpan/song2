<template>
  <div class="mx-4 pt-4 text-white h-screen sm:grid place-content-center">
    <div
      class="flex flex-col sm:flex-row justify-center w-full gap-8 sm:gap-24"
    >
      <div
        class="rounded-xl overflow-hidden shadow-2xl shadow-black/60 dark:border-gray-800 border-gray-600 border sm:min-w-[500px] sm:min-h-[500px] w-full lg:w-auto bg-gray-800"
      >
        <img
          v-if="quizAlbums?.length"
          :src="getRightAlbum(quizAlbums).cover"
          alt="album cover"
          class="rounded-md transition duration-300 w-full"
          :class="[rightAnswered !== 'yet' ? 'blur-none' : 'blur-xl']"
        />
      </div>

      <div class="flex flex-col justify-between">
        <div>
          <AnswerOptions
            :quiz-albums="quizAlbums"
            :right-album="getRightAlbum(quizAlbums)"
          />
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
export type Album = {
  index: string
  title: string
  artist: string
  link: string
  cover: string
  right: boolean
}

const { data: quizAlbums } = await useFetch<Album[]>('/q')
const rightAnswered = useRightAnswered()
function getRightAlbum(albums: Album[] | null): Album {
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
  rightAnswered.value = 'yet'
  quizAlbums.value = null
  fetch('/q')
    .then((res) => res.json())
    .then((data) => {
      quizAlbums.value = data
    })
}
</script>
