import {onBeforeUnmount} from "vue";

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
  if (!selector) {
    throw new Error("selector is required for loadTurnstile");
  }
  if (!document.head.contains(turnstileScript)) {
    document.head.appendChild(turnstileScript);
  }
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
  if (!document.head.contains(turnstileScript)) {
    return;
  }
  document.head.removeChild(turnstileScript);
}

/**
 * Vue 3 composition function to use the Turnstile widget.
 * @module turnstile
 * @function
 * @returns {object} The methods to use the Turnstile widget.
 */
export function useTurnstile() {
  // Detach the Turnstile script when the component is unmounted.
  onBeforeUnmount(
    () => unloadTurnstile(),
  );

  let resolvedValue = null;
  return {
    render: (selector) => {
      resolvedValue = new Promise((resolve) => {
        loadTurnstile(selector, resolve);
      });
    },
    token: () => {
      return resolvedValue;
    },
    clear: () => {
      resolvedValue = null;
    },
  };
}
