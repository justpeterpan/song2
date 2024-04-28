<template>
  <div class="mx-4 pt-4 text-white h-screen grid place-content-center">
    <div
      class="flex flex-col md:flex-row justify-center w-full gap-8 sm:gap-24"
    >
      <div
        class="rounded-xl overflow-hidden shadow-2xl shadow-black/60 dark:border-gray-800 border-gray-800 border sm:min-w-[500px] sm:min-h-[500px] w-full lg:w-auto bg-gray-800"
      >
        <img
          v-if="quizAlbums?.length"
          :src="getRightAlbum(quizAlbums).cover"
          alt="album cover"
          class="rounded-md min-w-[320px] min-h-[320px] md:w-full md:h-full transition duration-300"
          :class="[rightAnswered !== 'yet' ? 'blur-none' : 'blur-xl']"
        />
        <div v-else class="w-[320px] h-[320px] rounded-md bg-neutral-800" />
      </div>
      <div
        class="flex flex-col justify-center min-w-[320px] max-w-[320px] md:min-w-[500px] md:max-w-[500px]"
      >
        <template v-if="quizAlbums?.length">
          <div
            v-for="album in quizAlbums"
            :key="album.index"
            class="w-full mb-2"
          >
            <UButton
              :color="
                album.index === getRightAlbum(quizAlbums).index &&
                (rightAnswered === 'yes' || rightAnswered === 'no')
                  ? 'green'
                  : album.index === pickedAlbumIndex && rightAnswered === 'no'
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
        <UButton
          icon="i-heroicons-arrow-path"
          variant="solid"
          color="violet"
          class="mt-4 w-full mb-4 sm:mb-0"
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
type Album = {
  index: string
  title: string
  artist: string
  link: string
  cover: string
  right: boolean
}

const rightAnswered = ref<'yes' | 'no' | 'yet'>('yet')
const pickedAlbumIndex = ref<string>('')

const { data: quizAlbums } = await useFetch<Album[]>('/q')

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

function pickAlbum(index: string) {
  if (index === getRightAlbum(quizAlbums.value).index) {
    rightAnswered.value = 'yes'
  } else {
    rightAnswered.value = 'no'
    pickedAlbumIndex.value = index
  }
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
