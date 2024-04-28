<template>
  <div class="mx-4 pt-10 text-white">
    <h1 class="text-3xl">Quiz</h1>
    <div class="flex flex-col sm:flex-row justify-center w-full mt-20 gap-24">
      <div
        class="rounded-xl overflow-hidden shadow-2xl shadow-black/60 dark:border-gray-800 border-gray-600 border sm:min-w-[500px] sm:min-h-[500px] w-full lg:w-auto bg-gray-800"
      >
        <img
          :src="getRightAlbum(quizAlbums).cover"
          alt="album cover"
          class="rounded-md shrink-0 w-full"
          :class="{ 'blur-2xl': !rightAnswered }"
        />
      </div>
      <div class="mt-8 sm:mt-0 flex flex-col justify-center">
        <div v-for="album in quizAlbums" :key="album.index" class="w-full mb-2">
          <UButton
            :color="
              album.index === getRightAlbum(quizAlbums).index && rightAnswered
                ? 'green'
                : 'gray'
            "
            variant="solid"
            class="w-full"
            size="xl"
            @click="pickAlbum(album.index)"
          >
            {{ album.artist }} - {{ album.title }}</UButton
          >
        </div>
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
</script>
