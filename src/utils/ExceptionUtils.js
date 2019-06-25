import { BusinessException, TechnicalException } from '@u-iris/iris-common'

const transformErrorToException = async data => {
  const json = await data.json()
  console.log(json.erreurs)
  switch (data.status) {
    case 400:
      throw new BusinessException(json.erreurs)
    default:
      throw new TechnicalException(json.erreurs)
  }
}

export { transformErrorToException }
