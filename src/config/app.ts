export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME,

  version: import.meta.env.VITE_APP_VERSION,

  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  },

  github: {
    url: import.meta.env.VITE_GITHUB_URL,
  },
} as const;