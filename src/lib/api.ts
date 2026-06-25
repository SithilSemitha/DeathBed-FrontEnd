import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

const instance = axios.create({ baseURL: API_BASE })

function getToken(): string | null {
  return localStorage.getItem('deathbed.accessToken')
}

instance.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    if (!config.headers) (config.headers = {} as any)
    // axios headers can be plain object; set Authorization header
    // cast to any to avoid Axios header type issues in TS
    ;(config.headers as any)['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export async function login(email: string, password: string) {
  const res = await instance.post('/users/login', { email, password })
  if (res.data?.session?.access_token) {
    localStorage.setItem('deathbed.accessToken', res.data.session.access_token)
  }
  if (res.data?.user) {
    localStorage.setItem('deathbed.user', JSON.stringify(res.data.user))
  }
  return res.data
}

export async function signup(email: string, password: string) {
  const res = await instance.post('/users/signup', { email, password })
  if (res.data?.session?.access_token) {
    localStorage.setItem('deathbed.accessToken', res.data.session.access_token)
  }
  if (res.data?.user) {
    localStorage.setItem('deathbed.user', JSON.stringify(res.data.user))
  }
  return res.data
}

export async function googleLogin() {
  const res = await instance.get('/users/google-login')
  return res.data
}

export async function logout() {
  const res = await instance.post('/users/logout')
  localStorage.removeItem('deathbed.accessToken')
  localStorage.removeItem('deathbed.user')
  return res.data
}

export async function forgotPassword(email: string) {
  const res = await instance.post('/users/forgot-password', { email })
  return res.data
}

export async function resetPassword(accessToken: string, newPassword: string) {
  const res = await instance.post('/users/reset-password', {
    accessToken,
    newPassword,
  })
  return res.data
}

export async function getMe() {
  const res = await instance.get('/users/me')
  return res.data
}

export async function createProfile(payload: Record<string, any>) {
  const res = await instance.post('/users/profile', payload)
  return res.data
}

export async function getDecisions(params?: Record<string, any>) {
  const res = await instance.get('/decisions', { params })
  return res.data
}

export async function createDecision(data: Record<string, any>) {
  const res = await instance.post('/decisions', data)
  return res.data
}

export async function getJournals(params?: Record<string, any>) {
  const res = await instance.get('/journals', { params })
  return res.data
}

export async function createJournal(data: Record<string, any>) {
  const res = await instance.post('/journals', data)
  return res.data
}

export default instance
