export default defineNuxtRouteMiddleware((to) => {
    // const hasLang = /^\/(uk|ru)/.test(to.path); // Перевірка чи є в URL мова
  
    // if (!hasLang) {
    //   const userLang = navigator.language.startsWith("ru") ? "ru" : "uk";
    //   return navigateTo(`/${userLang}${to.fullPath}`, { redirectCode: 301 });
    // }
    console.log('Working i18n-mdw');
    
  });
  