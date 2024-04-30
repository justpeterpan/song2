<template>
  <CardStack :a="albums" show-button class="mt-[25%]" :test="false" />
</template>

<script setup lang="ts">
let albums = ref([
  'https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Suicide1977.jpg/220px-Suicide1977.jpg',
  'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Beyonce_-_Lemonade_%28Official_Album_Cover%29.png/220px-Beyonce_-_Lemonade_%28Official_Album_Cover%29.png',
  'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Beastie_Boys_-_Paul%27s_Boutique.png/220px-Beastie_Boys_-_Paul%27s_Boutique.png',
  'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Elvis_Presley_The_Sun_Sessions_LP_Cover.jpg/220px-Elvis_Presley_The_Sun_Sessions_LP_Cover.jpg',
])

const initialCount = 4
const adjustIndex = (index: number) => {
  return index + (initialCount - albums.value.length)
}
const showBlur = ref(true)

function next() {
  showBlur.value = false
  setTimeout(() => {
    showBlur.value = true
    albums.value.pop()
  }, 2000)
}
</script>

<style>
.album-item {
  transition: top 0.5s ease, left 0.5s ease, min-width 0.5s ease,
    min-height 0.5s ease, backdrop-filter 0.5s ease;
}

.album-enter-active,
.album-leave-active {
  transition: opacity 0.5s;
}
.album-enter,
.album-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0.8;
  transform: translateY(100px);
}
</style>
