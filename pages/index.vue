<template>
  <div class="md:grid md:grid-flow-col md:items-center md:grid-cols-2 md:pt-96">
    <ClientOnly>
      <div
        class="relative pt-4 md:pt-0 bottom-[50%]"
        :style="{
          marginLeft: 'calc(50% - 224px/2)',
        }"
      >
        <CoverStack :covers="getRightAlbumCovers" />
      </div>
    </ClientOnly>
    <div class="pt-[370px] md:pt-0 mx-8 md:w-96 md:mx-auto">
      <div class="text-white text-center text-xl font-semibold pb-4">{{ rightAnswers }} / {{ quizAlbums?.length }}</div>
      <div v-if="quizAlbums?.length">
        <div v-for="album of currentQuizAlbums" :key="album.index" class="pb-[2px]">
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
import confetti from 'canvas-confetti';
import type { Album } from '~/components/AnswerOption.vue';

const { data: quizAlbums } = await useFetch<Array<Album[]>>('/q');

const rightAnswered = useRightAnswered();
const pickedAlbum = usePickedAlbum();
const currentRound = useCurrentRound();

const currentQuizAlbums = computed(() => quizAlbums.value?.[currentRound.value]);
const getRightAlbumCovers = computed(() => quizAlbums.value?.map((albums) => getRightAlbum(albums).cover));
const rightAnswers = ref(0);

function setPickedAlbum(index: string) {
  pickedAlbum.value = index;
}

function setRightAnswered(answered: 'yes' | 'no' | 'yet') {
  rightAnswered.value = answered;
}

function isCorrect(selectedIndex: string, correctIndex: string) {
  return selectedIndex === correctIndex;
}

function nextRound() {
  setTimeout(() => {
    setRightAnswered('yet');
    currentRound.value += 1;
  }, 2000);
}

function getRightAlbum(albums: Album[] | undefined): Album {
  if (!albums)
    return {
      index: '',
      title: '',
      artist: '',
      link: '',
      cover: '',
      right: false,
    };
  return albums.find((album) => album.right) || albums[0];
}

function reload() {
  window.location.reload();
}

function pickAlbum(index: string) {
  setPickedAlbum(index);
  const rightAlbum = getRightAlbum(quizAlbums.value?.[currentRound.value]);

  if (isCorrect(index, rightAlbum.index)) {
    wow();
    setRightAnswered('yes');
    rightAnswers.value += 1;
    nextRound();
  } else {
    setRightAnswered('no');
    nextRound();
  }
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function wow() {
  confetti({
    origin: { y: 0.4, x: 0.2 },
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
  });
}
</script>
