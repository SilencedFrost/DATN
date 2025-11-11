export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/auth')) {
    setPageLayout('auth');
  } else {
    setPageLayout('default');
  }
});
