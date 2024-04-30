<template>
  <div class="mx-4 pt-4 text-white h-screen sm:grid place-content-center">
    <div
      class="flex flex-col sm:flex-row justify-center w-full gap-8 sm:gap-24"
    >
      <div class="grid justify-items-center">
        <div class="relative min-w-[416px]">
          <img
            class="absolute top-0 left-4 rounded-xl shadow-2xl shadow-black/60 border-gray-600 border min-w-96 min-h-96 bg-gray-800"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Suicide1977.jpg/220px-Suicide1977.jpg"
            alt="album cover"
          />
          <img
            class="absolute top-4 left-2 rounded-xl shadow-2xl shadow-black/60 border-gray-600 border min-w-[400px] min-h-[400px] bg-gray-800"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Beyonce_-_Lemonade_%28Official_Album_Cover%29.png/220px-Beyonce_-_Lemonade_%28Official_Album_Cover%29.png"
            alt="album cover"
          />
          <img
            class="absolute top-8 rounded-xl shadow-2xl shadow-black/60 border-gray-600 border min-w-[416px] min-h-[416px] bg-gray-800"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Beastie_Boys_-_Paul%27s_Boutique.png/220px-Beastie_Boys_-_Paul%27s_Boutique.png"
            alt="album cover"
          />
        </div>
      </div>
      <!-- <div
        class="rounded-xl overflow-hidden shadow-2xl shadow-black/60 dark:border-gray-800 border-gray-600 border sm:min-w-[500px] sm:min-h-[500px] w-full lg:w-auto bg-gray-800"
      >
        <img
          v-if="quizAlbums?.length"
          :src="getRightAlbum(quizAlbums).cover"
          alt="album cover"
          class="rounded-md transition duration-300 w-full"
          :class="[rightAnswered !== 'yet' ? 'blur-none' : 'blur-xl']"
        />
      </div> -->

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
