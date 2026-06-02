/**
 * Inline theme script — runs before first paint to prevent FOUC (Flash of Unstyled Content).
 * This is injected as an inline <script> in BaseLayout's <head>.
 */
(function () {
  const theme = (() => {
    // 1. Check localStorage for user preference
    const stored = localStorage.getItem('blog-theme');
    if (stored === 'dark' || stored === 'light') return stored;

    // 2. Fall back to system color scheme preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';

    // 3. Default to light
    return 'light';
  })();

  // Apply the theme class before any rendering happens
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Listen for system theme changes (only if user hasn't set a preference)
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (localStorage.getItem('blog-theme')) return; // User has explicit preference
      document.documentElement.classList.toggle('dark', e.matches);
    });
})();
