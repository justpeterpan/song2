import albums from '../albums.json'

export default defineEventHandler(() => {
  type Quiz = Array<{
    index: string
    title: string
    artist: string
    cover: string
    right: boolean
  }>

  // Function to shuffle an array
  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]] // Swap elements
    }
    return array
  }

  // Pick randomly 4 albums from the list
  const selectedAlbums = shuffleArray(albums).slice(0, 4)
  const rightIndex = Math.floor(Math.random() * selectedAlbums.length) // Determine the right album once

  // Set 'right' to true for one album randomly and false for others
  const quiz: Quiz = selectedAlbums.map((album, index) => ({
    index: String(index),
    title: album.title,
    artist: album.artist,
    cover: album.cover,
    right: index === rightIndex, // Randomly select one album to be right
  }))

  return quiz
})
