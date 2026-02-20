class Auth {
  static setToken(token) {
    localStorage.setItem('token', token)
  }

  static setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  static removeToken() {
    localStorage.removeItem('token')
  }

  static removeUser() {
    localStorage.removeItem('user')
  }

  static getPayload() {
    const token = this.getToken()
    if (!token) return null
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      return JSON.parse(atob(base64))
    } catch (e) {
      return null
    }
  }

  static isAuthenticated() {
    const payload = this.getPayload()
    const now = Math.round(Date.now() / 1000)
    return payload && now < payload.exp
  }

  static getCurrentUserId() {
    const payload = this.getPayload()
    return payload && payload.sub
  }

  static isCurrentUser(user) {
    const payload = this.getPayload()
    return payload && user._id === payload.sub
  }
}

export default Auth
