export const usePickedAlbum = () => useState<string>('pickedAlbum', () => '')
export const useRightAnswered = () =>
  useState<'yes' | 'no' | 'yet'>('rightAnswered', () => 'yet')
