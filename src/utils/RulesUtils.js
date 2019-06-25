const required = () => {
  return value => !!value || 'Obligatoire'
}
const notEmpty = () => {
  return value => value.length > 0 || 'Obligatoire'
}
export { required, notEmpty }
