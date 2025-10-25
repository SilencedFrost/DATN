import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const userId = ref(-1)
  const email = ref('')
  const username = ref('')
  const firstName = ref('')
  const lastName = ref('')
  const birthday = ref()
  const phoneNumber = ref('')
  const roleId = ref(1)
  const creationDate = ref()

  function setUser(user) {
    isLoggedIn.value = true
    userId.value = user.userId
    email.value = user.email
    username.value = user.username
    firstName.value = user.firstName
    lastName.value = user.lastName
    birthday.value = user.birthday
    phoneNumber.value = user.phoneNumber
    roleId.value = user.roleId
    creationDate.value = user.creationDate
  }

  function clearUser() {
    isLoggedIn.value = false
    userId.value = -1
    email.value = undefined
    username.value = undefined
    firstName.value = undefined
    lastName.value = undefined
    birthday.value = undefined
    phoneNumber.value = undefined
    roleId.value = undefined
    creationDate.value = undefined
  }

  async function checkSession() {
    try {
      const res = await axios.get(import.meta.env.VITE_API_BASE + '/auth/login/session', {
        withCredentials: true,
      })
      if (res.data && res.data.userId) {
        setUser(res.data)
      } else {
        clearUser()
      }
    } catch (err) {
      clearUser()
    }
  }

  async function logOut() {
    try {
      await axios.post(
        import.meta.env.VITE_API_BASE + '/auth/logout',
        {},
        {
          withCredentials: true,
        },
      )
    } catch (err) {
    } finally {
      clearUser()
      router.push('/')
    }
  }

  return {
    isLoggedIn,
    userId,
    email,
    username,
    firstName,
    lastName,
    birthday,
    phoneNumber,
    roleId,
    creationDate,
    setUser,
    clearUser,
    checkSession,
    logOut,
  }
})
