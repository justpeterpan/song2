<template>
  <div>
    <div>
      <CardStack
        v-if="quizAlbums?.length"
        :a="[getRightAlbum(quizAlbums[currentRound]).cover]"
        :show-button="false"
        :blur="rightAnswered === 'yet'"
        class="mt-4"
      />
      <div
        class="absolute mt-[350px] mx-auto top-0 left-0 bottom-0 right-0 w-[80%]"
      >
        <div v-if="quizAlbums?.length">
          <AnswerOptions
            v-if="quizAlbums[currentRound]"
            :quiz-albums="quizAlbums[currentRound]"
            :right-album="getRightAlbum(quizAlbums[currentRound])"
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

const { data: quizAlbums } = await useFetch<Array<Album[]>>('/q')
const currentRound = useCurrentRound()
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
