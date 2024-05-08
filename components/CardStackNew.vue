<template>
  <div class="container">
    <ClientOnly>
      <TransitionGroup tag="div" class="relative w-fit" name="list">
        <div v-for="(card, index) in cards" :key="card">
          <img
            class="absolute min-w-80 min-h-80 rounded-2xl album transition-all duration-500 ease-in-out"
            :class="getCardStyle(index)"
            :key="card"
            :src="card"
            alt="Album cover"
          />
          <div
            class="absolute min-w-80 min-h-80 rounded-2xl album transition-all duration-500 ease-in-out"
            :class="getCardStyle(index) + ' ' + backDrop(index)"
            :key="card"
          />
        </div>
      </TransitionGroup>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const currentRound = useCurrentRound()
const rightAnswered = useRightAnswered()

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

const cards = toRef(props.covers?.reverse())

const initialCount = cards.value?.length
const adjustedIndex = (index: number) =>
  index + (initialCount! - cards.value?.length!)

function backDrop(index: number) {
  console.log(
    rightAnswered.value,
    cards.value?.length! - 1,
    index,
    rightAnswered.value === 'yes' && index === cards.value?.length! - 1
  )
  if (index !== cards.value?.length! - 1) return 'backdrop-blur-xl'
  const hasBackdrop =
    rightAnswered.value === 'yet' && index === cards.value?.length! - 1
      ? 'backdrop-blur-lg'
      : 'backdrop-blur-none'

  return hasBackdrop
}

function getCardStyle(index: number) {
  const yOffset = adjustedIndex(index) * 25
  const scale = 1.0 + adjustedIndex(index) * 0.1

  return `translate-x-0 translate-y-[${yOffset}px] scale-[${scale}]`
}

watch([currentRound, rightAnswered], (newValue, oldValue) => {
  const [newRound] = newValue
  const [oldRound] = oldValue
  if (newRound !== oldRound) {
    cards.value = cards.value?.slice(0, -1)
    console.log('cards after', cards.value)
  }
})
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
