import { jwtDecode } from "jwt-decode";

interface Credential {
  username: string;
  password: string;
}

interface Profile {
  username?: string
}

export const useCurrentUserStore = defineStore("currentUser", () => {
  const accessToken = useCookie("accessToken")
  // const profile = ref({});

  const authenticate = async (credential: Credential) => {
    try {
      const response = await $fetch('/api/auth', {
        method: "POST",
        body: credential
      }) as any
      console.log(response)
      accessToken.value = response.accessToken
      localStorage.setItem("refreshToken", response.refreshToken)
    } catch (error) {
      throw error
    }
  }

  const profile: ComputedRef<Profile | undefined> = computed(() => {
    return accessToken.value ? jwtDecode(accessToken.value ?? "") : {}
  })

  const isLogged = computed(() => {
    return import.meta.client ? localStorage.getItem("refreshToken") !== null : accessToken.value !== null
  })

  const logout = async () => {
    await $fetch('/api/auth/revoke', { method: "POST" })
    if (import.meta.client) {
      localStorage.removeItem("refreshToken")
    }

  }

  return {
    profile,
    authenticate,
    isLogged,
    logout
  }
})
