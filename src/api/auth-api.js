import axios from 'axios'
import { apiUrl } from '../constant'

const defaultHeaders = () => ({
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  mode: 'no-cors',
  'user_deviceid': localStorage.getItem('user_deviceid'),
  'user_ipaddress': localStorage.getItem('ip'),
  'user_geolocation': localStorage.getItem('user_geolocation'),
})

class AuthApi {
  // Register new user
  registerUser = async (payload) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/register`, payload, {
        headers: defaultHeaders(),
      })
      return { error: false, data: res.data }
    } catch (err) {
      console.error('Register error', err)
      return { error: true, data: err }
    }
  }

  // Send verification code to phone number
  sendVerificationCode = async (phone) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/send-code`, { phone }, {
        headers: defaultHeaders(),
      })
      return { error: false, data: res.data }
    } catch (err) {
      console.error('Send code error', err)
      return { error: true, data: err }
    }
  }

  // Login: validate user and send code (optional)
  loginUser = async (phone) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, { phone }, {
        headers: defaultHeaders(),
      })
      return { error: false, data: res.data }
    } catch (err) {
      console.error('Login error', err)
      return { error: true, data: err }
    }
  }

  // Verify OTP during login
  verifyLoginCode = async (phone, code) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/check-verification-code-login`, { phone, code }, {
        headers: defaultHeaders(),
      })
      return { error: false, data: res.data }
    } catch (err) {
      console.error('Login code verification error', err)
      return { error: true, data: err }
    }
  }

  // Verify code without login
  verifyCodeOnly = async (phone, code) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/check-verification-code`, { phone, code }, {
        headers: defaultHeaders(),
      })
      return { error: false, data: res.data }
    } catch (err) {
      console.error('Code verification error', err)
      return { error: true, data: err }
    }
  }

  // Regenerate token (with additional data)
  regenerateToken = async (payload) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/regenerate-token`, payload, {
        headers: defaultHeaders(),
      })
      return { error: false, data: res.data }
    } catch (err) {
      console.error('Regenerate token error', err)
      return { error: true, data: err }
    }
  }

  // Refresh access token
  refreshToken = async (refreshToken) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/refresh-token`, { refreshToken }, {
        headers: defaultHeaders(),
      })
      return { error: false, data: res.data }
    } catch (err) {
      console.error('Refresh token error', err)
      return { error: true, data: err }
    }
  }

  // Resend invite code to user
  resendInviteCode = async (phone) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/user/${phone}/resend-invite`, {}, {
        headers: defaultHeaders(),
      })
      return { error: false, data: res.data }
    } catch (err) {
      console.error('Resend invite error', err)
      return { error: true, data: err }
    }
  }

  // Get current logged-in user
  getCurrentUser = async (accessToken) => {
    try {
      const res = await axios.get(`${apiUrl}/auth/logged`, {
        headers: {
          ...defaultHeaders(),
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return { error: false, data: res.data }
    } catch (err) {
      console.error('Get user error', err)
      return { error: true, data: err }
    }
  }
}

export const authRequests = new AuthApi()
