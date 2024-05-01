export const usePickedAlbum = () => useState<string>('pickedAlbum', () => '')
export const useRightAnswered = () =>
  useState<'yes' | 'no' | 'yet'>('rightAnswered', () => 'yet')
export const useCurrentRound = () => useState<number>('currentRound', () => 0)
