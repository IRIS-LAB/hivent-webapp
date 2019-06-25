import ErrorCodes from '../resources/ErrorCodes.json'
import ErrorCodesHivent from '../resources/ErrorCodesHivent.json'
import TranslationsHivent from '../resources/TranslationsHivent.json'

const translations = { ...ErrorCodes, ...ErrorCodesHivent, ...TranslationsHivent }

const getTranslatedMessage = error => {
  // code error
  const tokens = error.codeErreur.split('(')
  const code = tokens[0]
  // param
  let param
  if (tokens.length > 1) param = tokens[1].split(')')[0]

  // label translation
  const field = error.champErreur ? error.champErreur.split('.')[0] : ''
  let label = translations[field + '.' + code] || translations[code] || error.libelleErreur

  // variables
  label = label.replace('{0}', translations[error.champErreur] || error.champErreur)
  label = label.replace('{1}', param)

  return label
}

export { getTranslatedMessage }
