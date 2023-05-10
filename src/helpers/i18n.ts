import type { I18nKeys } from '@/i18n'
import en from '@/i18n/translations/en.json'

const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g

export default (key: I18nKeys, args?: Record<string, unknown>) => {
  return en[key].replace(templateMatcher, (substring, value) => {
    if (args) {
      value = args[value]
    }

    return value
  })
}
