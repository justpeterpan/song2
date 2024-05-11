// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  colorMode: {
    preference: 'light',
  },
  tailwindcss: {
    config: {
      safelist: [
        'scale-[1]',
        'translate-y-[0px]',
        'scale-[1.1]',
        'translate-y-[25px]',
        'scale-[1.2]',
        'translate-y-[50px]',
        'scale-[1.3]',
        'translate-y-[75px]',
      ],
    },
  },
})
