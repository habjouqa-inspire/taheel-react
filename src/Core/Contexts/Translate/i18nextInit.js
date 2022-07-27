import Common_ar from 'src/Core/Contexts/Translate/Languages/ar/Common.json';
import Common_en from 'src/Core/Contexts/Translate/Languages/en/Common.json';
import i18next from "i18next"

const lang = localStorage.getItem("lang") || 'ar'
i18next.init({
    interpolation: { escapeValue: false },
    lng: lang,
    resources: {
        en: {
            common: Common_en
        },
        ar: {
            common: Common_ar
        },
    },
    react: {
      bindI18n: false,
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true,
    }
})

export { i18next }