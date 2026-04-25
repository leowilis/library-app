import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCredentials, logout } from '@/store/authSlice'
import { EndPoints, ROUTES } from '@/constants'
import { api } from '@/lib/api'
import { toast } from 'sonner'

/**
 * Handles user login.
 *
 * On success: stores credentials in Redux and redirects to
 * `/admin/users` for ADMIN role, or home for regular users.
 * On error: shows a toast with a generic failure message.
 *
 * const { mutate: login, isPending } = useLogin()
 * login({ email, password })
 */

export const useLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const data = await api.post(EndPoints.Login, credentials)
      return data
    },
    onSuccess: (data: any) => {
      const user = data?.data?.data?.user ?? data?.data?.user
      const token = data?.data?.data?.token ?? data?.data?.token
      

      dispatch(setCredentials({ token, user }))

      if (user?.role === 'ADMIN') {
        toast.success("Welcome, Admin!")
        navigate('/admin/users')
      } else {
        toast.success("Welcome back!")
        navigate(ROUTES.Home)
      }
    },
    onError: () => {
      toast.error("Login failed! Wrong email or password.")
    },
  })
}

/**
 * Handles user registration.
 *
 * Returns the raw mutation — caller is responsible for
 * handling success/error (toast, redirect, etc).
 *
 * const { mutate: register, isPending } = useRegister()
 * register({ name, email, password })
 */

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: {
      name: string
      email: string
      phone?: string
      password: string
    }) => {
      const data = await api.post(EndPoints.Register, payload)
      return data
    },
  })
}

export const useLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return () => {
    dispatch(logout())
    navigate(ROUTES.Login)
  }
}