<template>
  <div class="grid justify-items-center">
    <TransitionGroup
      tag="div"
      class="relative min-w-[416px] mt-[25%]"
      :name="showBlur ? 'list' : 'none'"
    >
      <img
        v-for="(album, index) in albums"
        :key="album.url"
        :style="{
          top: `${32 + adjustIndex(index) * 16}px`,
          minWidth: `${416 + adjustIndex(index) * 16}px`,
          minHeight: `${416 + adjustIndex(index) * 16}px`,
          left: `${adjustIndex(index) * -8}px`,
        }"
        class="absolute rounded-xl shadow-2xl shadow-black/60 border-gray-600 border bg-gray-800 album-item"
        :src="album.url"
        alt="album cover"
      />
      <div
        v-if="showBlur"
        class="absolute backdrop-blur-2xl top-[80px] border border-gray-600 min-w-[464px] min-h-[466px] left-[-24px] rounded-xl"
      />
    </TransitionGroup>
    x
    <div class="mt-[550px]">
      <UButton @click="next">✦</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
let albums = ref([
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Suicide1977.jpg/220px-Suicide1977.jpg',
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Beyonce_-_Lemonade_%28Official_Album_Cover%29.png/220px-Beyonce_-_Lemonade_%28Official_Album_Cover%29.png',
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Beastie_Boys_-_Paul%27s_Boutique.png/220px-Beastie_Boys_-_Paul%27s_Boutique.png',
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Elvis_Presley_The_Sun_Sessions_LP_Cover.jpg/220px-Elvis_Presley_The_Sun_Sessions_LP_Cover.jpg',
  },
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
    min-height 0.5s ease;
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
  opacity: 50;
  transform: translateY(100px);
}
</style>
