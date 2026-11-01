export const THEME_STORAGE_KEY = "rean-theme";

/** Runs in <head> before paint so a saved choice never flashes the other theme. */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
