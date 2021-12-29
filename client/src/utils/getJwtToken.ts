const getJwtToken = (): string => {
  const token = localStorage.getItem('jwt')
  return token ? `Bearer ${token}` : ''
}

export default getJwtToken
