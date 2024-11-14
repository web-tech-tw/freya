const {
  VITE_TURNSTILE_SITE_KEY: turnstileSiteKey,
} = import.meta.env;

const scriptSourceUrl = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=loadTurnstile";

const turnstileScript = document.createElement("script");
turnstileScript.setAttribute("src", scriptSourceUrl);

/**
 * Load the Turnstile script and render the Turnstile widget.
 * @module turnstile
 * @function
 * @param {string} selector - The CSS selector to render the Turnstile widget.
 * @param {Function} callback - The callback function to be executed when the Turnstile widget is solved.
 * @returns {void}
 */
export function loadTurnstile(selector, callback) {
  document.head.appendChild(turnstileScript);
  window.loadTurnstile = () => {
    window.turnstile.render(selector, {
      sitekey: turnstileSiteKey,
      callback,
    });
  };
}

/**
 * Unload the Turnstile script.
 * @module turnstile
 * @function
 * @returns {void}
 */
export function unloadTurnstile() {
  document.head.removeChild(turnstileScript);
}
