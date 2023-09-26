import { createEffect, createEvent, sample } from "effector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { appStarted } from "~/shared/init";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      Welcome: "Welcome to Money Keeper",
      "Выберите категорию": "Select category",
      "нет категорий": "no categories",
      категория_zero: "no categories",
      категория_one: "{{count}} category by sum {{sum}}",
      категория_other: "{{count}} categories by sum {{sum}}",
    },
  },
  ru: {
    translation: {
      Welcome: "Добро пожаловать в Money Keeper",
      Amount: "Сумма",
      "Select category": "Выберите категорию",
      Categories: "Категории",
      submit: "Отправить",
      "click to start": "Нажмите, чтобы начать",

      категория_zero: "нет категорий",
      категория_one: "{{count}} категория на сумму {{sum}}",
      категория_few: "{{count}} категории на сумму {{sum}}",
      категория_many: "{{count}} категорий на сумму {{sum}}",
      категория_other: "{{count}} категорий на сумму {{sum}}",
    },
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en",

    resources,
    lng: "ru", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

const checkLangFx = createEffect(async () => {
  try {
    const lang = localStorage.getItem("lang");
    if (lang) {
      i18n.changeLanguage(lang);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const langToggleFx = createEffect(async () => {
  const lang = i18n.language === "en" ? "ru" : "en";
  i18n.changeLanguage(lang);

  try {
    localStorage.setItem("lang", lang);
  } catch (error) {
    console.log(error);
    throw error;
  }
});
export const langToggle = createEvent();

sample({
  clock: appStarted,
  target: checkLangFx,
});

sample({
  clock: langToggle,
  target: langToggleFx,
});
