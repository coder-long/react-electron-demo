import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import resources from "./resources";

/*
* documentation https://react.i18next.com/guides/quick-start
*/

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  }
})

export default i18n;