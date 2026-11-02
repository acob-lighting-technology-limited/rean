export const THEME_STORAGE_KEY = "rean-theme";

/** Browser bar colour per theme (the page ground). */
export const THEME_COLOR = { light: "#f4f4f5", dark: "#09090b" } as const;

/**
 * Runs in <head> before paint: light unless the visitor saved dark with the toggle, so a saved
 * choice never flashes the other theme. The device's dark setting is deliberately ignored.
 */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}")==="dark"?"dark":"light";document.documentElement.dataset.theme=t;if(t==="dark")document.addEventListener("DOMContentLoaded",function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","${THEME_COLOR.dark}")})}catch(e){document.documentElement.dataset.theme="light"}`;
