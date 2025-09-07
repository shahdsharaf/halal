import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import { store } from "./app/store";
const state = store.getState();
const { lang, dir } = state.settings;

const initialLanguage = lang || navigator.language.split("-")[0];
// Initialize i18next
i18n
  .use(Backend) // Load translation files
  .use(initReactI18next)
  .init({
    lng: initialLanguage,
    fallbackLng: "en", // Fallback language in this case is English
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Load by namespace
    },
  });
// Set HTML direction based on language
document.documentElement.lang = initialLanguage;
document.documentElement.dir = dir;
export default i18n;
