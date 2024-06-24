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
    <div class="pt-[370px] md:pt-10 mx-8 md:w-96 md:mx-auto flex flex-col justify-between h-72">
      <div class="text-white text-center text-xl font-semibold pb-4">{{ rightAnswers }} / {{ quizAlbums?.length }}</div>
      <div v-if="quizAlbums?.length">
        <div v-for="album of currentQuizAlbums" :key="album.index" class="pb-[2px]">
          <AnswerOption
            :album="album"
            :right-album="getRightAlbum(currentQuizAlbums)"
            :disabled="rightAnswered !== 'yet'"
            @click="pickAlbum(album.index)"
          />
        </div>
      </div>
      <div class="h-2 my-10 bg-gradient-to-r rounded-md from-yellow-400 to-neutral-600" :class="progressClasses()">
        <div class="flex justify-between">
          <div
            v-for="(_, index) in 4"
            :key="index"
            class="h-8 w-8 text-center text-black -mt-3 pt-1 rounded-[50%]"
            :class="[currentRound >= index ? 'bg-yellow-400' : 'bg-neutral-600']"
          >
            {{ index + 1 }}
          </div>
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
      >
        restart
      </UButton>
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

function progressClasses() {
  switch (currentRound.value) {
    case 0:
      return 'from-0% to-0%';
    case 1:
      return 'from-[33%] to-[33%]';
    case 2:
      return 'from-[66%] to-[66%]';
    case 3:
      return 'from-[99%] to-[99%]';
    case 4:
      return 'from-100% to-100%';
    default:
      break;
  }
}
</script>
