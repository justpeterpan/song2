// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],

  colorMode: {
    preference: 'light',
  },

  future: {
    compatibilityVersion: 4,
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

  compatibilityDate: '2024-07-12',
});
