<template>
  <div class="container">
    <button
      @click="removeCard"
      class="mb-10 ml-[140px] p-2 bg-amber-200 text-black rounded-3xl"
    >
      ✦
    </button>
    <ClientOnly>
      <TransitionGroup tag="div" class="relative w-fit" name="list">
        <img
          v-for="(card, index) in cards"
          class="absolute min-w-80 min-h-80 border border-black rounded-2xl bg-violet-300 album transition-all duration-500 ease-in-out"
          :class="getCardStyle(index)"
          :key="card"
          :src="card"
          alt="Album cover"
        />
      </TransitionGroup>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import confetti from 'canvas-confetti'

const props = defineProps<{
  covers: string[] | undefined
}>()
const cardsOld = ref([
  {
    id: 1,
    title: 'Card 1',
    scale: 'scale-[1]',
    translate: 'translate-y-[0px]',
  },
  {
    id: 2,
    title: 'Card 2',
    scale: 'scale-[1.1]',
    translate: 'translate-y-[25px]',
  },
  {
    id: 3,
    title: 'Card 3',
    scale: 'scale-[1.2]',
    translate: 'translate-y-[50px]',
  },
  {
    id: 4,
    title: 'Card 4',
    scale: 'scale-[1.3]',
    translate: 'translate-y-[75px]',
  },
])

const cards = toRef(props.covers)

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function wow() {
  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
  })
}

const initialCount = cards.value?.length
const adjustedIndex = (index: number) =>
  index + (initialCount! - cards.value?.length!)

function getCardStyle(index: number) {
  console.log('index', index, adjustedIndex(index))
  const yOffset = adjustedIndex(index) * 25
  const scale = 1.0 + adjustedIndex(index) * 0.1

  return `translate-x-0 translate-y-[${yOffset}px] scale-[${scale}]`
}

function removeCard() {
  wow()
  cards.value = cards.value?.slice(0, -1)
}
</script>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-out !important;
}

.list-enter-from,
.list-leave-to {
  transform: translateX(-500px) rotate(20deg) !important;
}
</style>
