/**
 * Runs in <head>. Once every on-load entrance has finished (the last nav link lands at about 4s, see
 * .ao-nav-item in globals.css), the delay is dropped so pages reached by client navigation animate at
 * once. Dropping it earlier would make anything still mid-animation jump to its end.
 */
export const splashResetScript = `setTimeout(function(){document.documentElement.style.setProperty("--splash-delay","0s")},5300)`;
