import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env.VITE_WEATHER_API_KEY': JSON.stringify(process.env.VITE_WEATHER_API_KEY),
    'process.env.VITE_PICTURES_API_KEY': JSON.stringify(process.env.VITE_PICTURES_API_KEY),
  },
});
