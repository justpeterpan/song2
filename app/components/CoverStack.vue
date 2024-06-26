<template>
  <div>
    <ClientOnly>
      <TransitionGroup tag="div" class="relative" name="list">
        <div v-for="(card, index) in cards" :key="card">
          <img
            class="absolute min-w-56 min-h-56 rounded-2xl transition-all duration-500 ease-in-out"
            :class="getCardStyle(index)"
            :key="card"
            :src="card"
            alt="Album cover"
          />
          <div
            class="absolute min-w-[226px] border border-neutral-400/60 min-h-[226px] rounded-2xl transition-all duration-500 ease-in-out"
            :class="getCardStyle(index) + ' ' + backDropClass(index)"
            :key="card"
          />
        </div>
      </TransitionGroup>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const currentRound = useCurrentRound();
const rightAnswered = useRightAnswered();

const props = defineProps<{ covers: string[] | undefined }>();
const cards = toRef(props.covers?.reverse());
const initialCount = cards.value?.length;
const adjustedIndex = (index: number) => index + (initialCount ?? 0) - (cards.value?.length ?? 0);

function backDropClass(index: number) {
  if (index !== cards.value?.length! - 1) return 'backdrop-blur-xl';
  const hasBackdrop =
    rightAnswered.value === 'yet' && index === (cards.value?.length ?? 0) - 1
      ? 'backdrop-blur-lg'
      : 'backdrop-blur-none';
  return hasBackdrop;
}

function getCardStyle(index: number) {
  const yOffset = adjustedIndex(index) * 25;
  const scale = 1.0 + adjustedIndex(index) * 0.1;
  return `translate-x-0 translate-y-[${yOffset}px] scale-[${scale}]`;
}

watch(currentRound, (newRound, oldRound) => {
  if (newRound !== oldRound) {
    cards.value = cards.value?.slice(0, -1);
  }
});
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
