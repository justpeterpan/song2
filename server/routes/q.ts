import albums from '../albums.json'

export default defineEventHandler(() => {
  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  function createQuizRound() {
    const shuffledAlbums = shuffleArray([...albums]).slice(0, 4)
    const rightIndex = Math.floor(Math.random() * shuffledAlbums.length)
    return shuffledAlbums.map((album, index) => ({
      index: String(index),
      title: album.title,
      artist: album.artist,
      cover: album.cover,
      right: index === rightIndex,
    }))
  }

  const numberOfRounds = 4
  return Array.from({ length: numberOfRounds }, createQuizRound)
})
