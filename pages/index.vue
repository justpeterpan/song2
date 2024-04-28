<template>
  <div class="mx-4 pt-4 text-white">
    <div
      class="flex flex-col sm:flex-row justify-center w-full gap-8 sm:gap-24"
    >
      <div
        class="rounded-xl overflow-hidden shadow-2xl shadow-black/60 dark:border-gray-800 border-gray-600 border sm:min-w-[500px] sm:min-h-[500px] w-full lg:w-auto bg-gray-800"
      >
        <img
          :src="getRightAlbum(quizAlbums).cover"
          alt="album cover"
          class="rounded-md shrink-0 w-full"
          :class="{ 'blur-xl': !rightAnswered }"
        />
      </div>
      <div class="flex flex-col justify-center">
        <div v-for="album in quizAlbums" :key="album.index" class="w-full mb-2">
          <UButton
            :color="
              album.index === getRightAlbum(quizAlbums).index && rightAnswered
                ? 'green'
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
        <UButton
          icon="i-heroicons-arrow-path"
          variant="solid"
          color="violet"
          class="mt-4 w-full mb-8 sm:mb-0"
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

const rightAnswered = ref(false)

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
    rightAnswered.value = true
  } else {
    alert('Wrong!')
  }
}

function reload() {
  rightAnswered.value = false
  quizAlbums.value = null
  fetch('/q')
    .then((res) => res.json())
    .then((data) => {
      quizAlbums.value = data
    })
}
</script>
