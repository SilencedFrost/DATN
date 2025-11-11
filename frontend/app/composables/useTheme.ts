import { ref, watch } from 'vue';
import { useCookie, useHead } from '#app';

const THEME_COOKIE_KEY = 'user-theme-preference';

type Theme = 'light' | 'dark';

export function useTheme() {
  const themeCookie = useCookie<Theme>(THEME_COOKIE_KEY, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
  });

  const initialTheme: Theme = themeCookie.value === 'dark' ? 'dark' : 'light';

  const currentTheme = ref<Theme>(initialTheme);

  useHead({
    htmlAttrs: {
      'data-bs-theme': () => currentTheme.value,
    },
  });

  watch(currentTheme, (newTheme) => {
    themeCookie.value = newTheme;

    if (import.meta.client) {
      document.documentElement.setAttribute('data-bs-theme', newTheme);
    }
  });

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
  };

  return {
    currentTheme,
    toggleTheme,
  };
}
