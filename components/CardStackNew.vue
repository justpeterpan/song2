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
        <div
          class="absolute w-80 h-80 border border-black rounded-2xl bg-violet-300 album transition-all duration-500 ease-in-out"
          :class="getCardStyle(index, cards.length)"
          v-for="(card, index) in cards"
          :key="card.id"
        />
      </TransitionGroup>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import confetti from 'canvas-confetti'

const cards = ref([
  { id: 1, title: 'Card 1' },
  { id: 2, title: 'Card 2' },
  { id: 3, title: 'Card 3' },
  { id: 4, title: 'Card 4' },
])

function randomInRange(min, max) {
  return Math.random() * (max - min) + min
}

function wow() {
  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
  })
}

const initialCount = cards.value.length
const adjustedIndex = (index: number) =>
  index + (initialCount - cards.value.length)

function getCardStyle(index, length) {
  const yOffset = adjustedIndex(index) * 25
  const scale = 1.0 + adjustedIndex(index) * 0.1

  return `translate-x-0 translate-y-[${yOffset}px] scale-[${scale}]`
}

function removeCard() {
  wow()
  cards.value = cards.value.slice(0, -1)
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
