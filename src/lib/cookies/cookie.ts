export const COOKIE_EVENT = "cookie-banner-open";
export const COOKIE_KEY = "cookie-consent";

export const openCookieBanner = () => {
  localStorage.removeItem(COOKIE_KEY);
  window.dispatchEvent(new Event(COOKIE_EVENT));
};