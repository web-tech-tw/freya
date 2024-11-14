import {onMounted, onBeforeUnmount} from "vue";

const {VITE_TURNSTILE_SITE_KEY: turnstileSiteKey} = import.meta.env;
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
  if (!turnstileSiteKey) {
    throw new Error("turnstileSiteKey is required for loadTurnstile");
  }
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

/**
 * Vue 3 composition function to use the Turnstile widget.
 * @module turnstile
 * @function
 * @param {string} selector - The CSS selector to render the Turnstile widget.
 * @returns {Promise<string>} The promise that resolves when the Turnstile widget is solved.
 */
export function useTurnstile(selector) {
  if (!selector) {
    throw new Error("selector is required for useTurnstile");
  }
  return new Promise((resolve) => {
    // Attach the Turnstile script when the component is mounted.
    onMounted(
      () => loadTurnstile(selector, resolve),
    );

    // Detach the Turnstile script when the component is unmounted.
    onBeforeUnmount(
      () => unloadTurnstile(),
    );
  });
}
